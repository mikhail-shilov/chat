import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../model/User.model'

import SocketByLogin from './socketByLogin'

export default class SocketHandler {
  constructor() {
    this.connections = []
    this.credentialsHandler = new SocketByLogin()
    this.tokenToLogin = async (token) => {
      let login = null
      let userId = null
      try {
        userId = jwt.verify(token, config.secret).uid
      } catch (err) {
        console.log('JWT verify error:', err.message)
      }

      try {
        const user = await User.findById(userId)
        login = user.login
      } catch (err) {
        console.log('validateError:', err.message)
      }
      return login
    }
  }

  async listen(currentConnection, dataInSocket) {
    let socketEvent = null
    try {
      socketEvent = JSON.parse(dataInSocket)
    } catch (err) {
      socketEvent = { type: 'badJSON' }
    }
    const { type = 'NoType' } = socketEvent
    switch (type) {
      case 'subscribe': {
        const login = await this.tokenToLogin(socketEvent.token)
        console.log('SocketByLogin - subscribe(). Login:', login)
        if (login) {
          this.credentialsHandler.add(login, currentConnection.id)
          const countOfUsers = this.showLoggedUsers().length
          if (countOfUsers > 0) {
            this.broadcast({ wsActivity: 'update_users', users: this.showLoggedUsers() })
          }
          currentConnection.write(JSON.stringify({ wsActivity: 'response', type, status: 'ok' }))
          this.credentialsHandler.add(login, currentConnection.id)
        } else {
          console.log('Subscribe - error')
          currentConnection.write(JSON.stringify({ wsActivity: 'response', type, status: 'error' }))
        }
        break
      }
      case 'broadcast': {
        const message = {
          wsActivity: socketEvent.type,
          author: await this.tokenToLogin(socketEvent.token),
          recipient: socketEvent.channel,
          channel: socketEvent.channel,
          message: socketEvent.message
        }
        console.log(message)
        this.connections.forEach((connection) => {
          if (this.showConnectionsByLogins('all').includes(connection.id)) {
            connection.write(JSON.stringify(message))
          }
        })
        break
      }
      case 'private': {
        const message = {
          wsActivity: socketEvent.type,
          author: await this.tokenToLogin(socketEvent.token),
          recipient: socketEvent.recipient,
          message: socketEvent.message
        }
        this.connections.forEach((connection) => {
          if (this.showConnectionsByLogins(socketEvent.recipient).includes(connection.id)) {
            connection.write(JSON.stringify(message))
          }
        })
        break
      }
      default: {
        console.log('Unknown request type', socketEvent)
        break
      }
    }
    console.log('Handled event:', type)
  }

  broadcast(message) {
    this.connections.forEach((connection) => {
      if (this.showConnectionsByLogins('all').includes(connection.id)) {
        connection.write(JSON.stringify(message))
      }
    })
  }

  singlecast(message, recipient) {
    if (this.credentialsHandler.list(recipient)) {
      this.connections.forEach((connection) => {
        if (this.showConnectionsByLogins(recipient).includes(connection.id)) {
          connection.write(JSON.stringify(message))
        }
      })
    }
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



  showLoggedUsers() {
    return Object.keys(this.credentialsHandler.list())
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
