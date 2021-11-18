import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import passportJWT from './services/passport'
import mongooseService from './services/mongoose'
import config from './config'
import Html from '../client/html'
import User from './model/User.model'
import SocketByLogin from './tools/socketByLogin'

require('colors')

let Root
mongooseService.connect()

try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  // eslint-disable-next-line no-console
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []
const socketByLogin = new SocketByLogin()

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]
passport.use('jwt', passportJWT)

middleware.forEach((it) => server.use(it))

server.post('/api/v1/auth', async (req, res) => {
  console.log('auth:', req.body.login)
  try {
    const userRecord = await User.findAndValidateUser(req.body)
    const payload = { uid: userRecord.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 23 })
    const user = {
      id: userRecord.id,
      login: userRecord.login,
      origin: userRecord.origin
    }
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log('error', err)
    res.json({ status: 'error', message: err.message })
  }
})

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtPayload = jwt.verify(req.cookies.token, config.secret)
    console.log('jwtPayload', jwtPayload)
    const userRecord = await User.findById(jwtPayload.uid)
    const user = {
      id: userRecord.id,
      login: userRecord.login,
      origin: userRecord.origin
    }
    const newPayload = { uid: userRecord.id }

    const token = jwt.sign(newPayload, config.secret, { expiresIn: '48h' })

    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log('error', err)
    res.json({ status: 'error', message: err.message })
  }
})

server.post('/api/v1/reg', async (req, res) => {
  try {
    const newUser = new User({
      login: req.body.login,
      password: req.body.password
    })
    await newUser.save()
    res.json({ status: 'ok' })
  } catch (err) {
    if (err.code === 11000) {
      const errorMessage = 'duplicate login'
      console.log(errorMessage)
      res.json({ status: 'error', error: errorMessage })
    } else {
      console.log(err)
      res.json({ status: 'error', err })
    }
  }
})

server.get('/api/v1/conn', async (req, res) => {
  res.json(socketByLogin.list())
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Simple chat'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async (data) => {
      try {
        const request = JSON.parse(data)
        switch (request.type) {
          case 'subscribe': {
            const { uid: userId } = jwt.verify(request.token, config.secret)
            const { login } = await User.findById(userId)
            socketByLogin.add(login, conn.id)
            console.log(`${login}'s conn list is:`, socketByLogin.list(login))
            break
          }
          case 'broadcast': {
            console.log('request', request)
            const { uid: userId } = jwt.verify(request.token, config.secret)
            const { login } = await User.findById(userId)
            const message = {
              activity: 'broadcast',
              author: login,
              channel: 'general',
              text: request.message
            }
            connections.forEach((connection) => {
              connection.write(JSON.stringify(message))
            })
            break
          }
          default: {
            console.log('Unknown request type')
            break
          }
        }
      } catch (err) {
        console.log('Request error:', err.message)
      }
    })

    conn.on('close', () => {

      connections.forEach((connection) => {
        console.log('Conn=?')

        if (connection.readyState === 3) {
          console.log('Conn=3 - remove')
          socketByLogin.remove(connection.id)
        }
      })
      connections = connections.filter((connection) => connection.readyState !== 3)

    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
