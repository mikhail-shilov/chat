import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../model/User.model'

import SocketByLogin from './socketByLogin'

export default class SocketHandler {
  constructor() {
    this.connections = []
    this.credentialsHandler = new SocketByLogin()
    this.tokenToLogin = async (token) => {
      const { uid: userId } = jwt.verify(token, config.secret)
      let login = null
      try {
        const user = await User.findById(userId)
        login = user.login
      } catch (err) {
        console.log('validateError:', err.message)
      }
      return login
    }
  }

  async listen(connection, dataInSocket) {
    let socketEvent = null
    try {
      socketEvent = JSON.parse(dataInSocket)
    } catch (err) {
      socketEvent = { type: 'badJSON' }
    }
    switch (socketEvent.type) {
      case 'subscribe': {
        const login = await this.tokenToLogin(socketEvent.token)
        console.log('SocketByLogin - subscribe(). Login:', login)
        if (login) {
          this.credentialsHandler.add(login, connection.id)
          console.log('Subscribe - ok')
          connection.write(JSON.stringify({ status: 'ok', message: 'Subscribe allowed' }))
          this.credentialsHandler.add(login, connection.id)

        } else {
          console.log('Subscribe - error')
          connection.write(JSON.stringify({ status: 'error', message: 'Subscribe not allowed' }))
        }

        break
      }
      /*
      case 'broadcast': {
        // console.log('request', request)
        {}
        const message = {
          wsActivity: 'broadcast',
          author: login,
          channel: request.channel,
          message: request.message
        }
        connections.forEach((connection) => {
          connection.write(JSON.stringify(message))
        })
        break
      }

       */
      default: {
        console.log('Unknown request type')
        break
      }
    }

    console.log('Handled event:', socketEvent.type)
  }

  broadcast() {
    console.log('Event send to all')
  }

  singlecast(user) {
    console.log(`Event send to ${user}`)
  }

  newConnection(connection) {
    this.connections.push(connection)
  }

  clearDeadConnections() {
    this.connections.forEach((connection) => {
      if (connection.readyState === 3) {
        this.credentialsHandler.remove(connection.id)
      }
    })
    this.connections = this.connections.filter((connection) => connection.readyState !== 3)
  }

  showConnections() {
    return [...this.connections]
  }

  showConnectionsIds() {
    return [...this.connections.map((conn) => conn.id)]
  }

  showConnectionsByLogins(login = 'all') {
    let output = null
    if (login === 'all') {
      output = Object.values(this.credentialsHandler.list()).flat()
    } else {
      output = [...this.credentialsHandler.list(login)]
    }
    return output
  }
}
