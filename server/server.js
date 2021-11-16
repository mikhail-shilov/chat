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
  console.log('auth check:', req.cookies.token)
  res.json({ status: 'In progress' })
})

server.post('/api/v1/reg', async (req, res) => {
  console.log('reg:', req.body)
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

console.log('isSocketsEnabled', config.isSocketsEnabled)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
