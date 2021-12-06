import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import SockJS from 'sockjs-client'

import rootReducer from './reducers'
import createHistory from './history'
import socketActions from './sockets'
import { receiveMessage } from './reducers/channels'
import { logOut, setUsers } from "./reducers/auth";

export const history = createHistory()

const isBrowser = typeof window !== 'undefined'

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)
let socket

if (typeof ENABLE_SOCKETS !== 'undefined' && ENABLE_SOCKETS) {
  const initSocket = () => {
    socket = new SockJS(`${isBrowser ? window.location.origin : 'http://localhost'}/ws`)
    socket.onopen = () => {
      store.dispatch(socketActions.connected())
      // store.dispatch(wsSubscribe())
    }

    socket.onmessage = (message) => {
      // eslint-disable-next-line no-console
      console.log('ws input', JSON.parse(message.data))
      const { wsActivity, author, message: text, channel, users } = JSON.parse(message.data)
      switch (wsActivity) {
        case 'broadcast': {
          store.dispatch(receiveMessage(channel, author, text))
          break
        }
        case 'system_broadcast': {
          store.dispatch(receiveMessage('system', 'system', text))
          break
        }
        case 'update_users': {
          store.dispatch(setUsers(users))
          break
        }
        case 'kick': {
          console.log('kick')
          store.dispatch(logOut())
          break
        }
        case 'response': {
          // console.log('response')
          break
        }
        default:
          console.log('Unknown ws event')
      }
      // socket.close();
    }

    socket.onclose = () => {
      store.dispatch(socketActions.disconnected())

      setTimeout(() => {
        console.log('Try reconnect!')
        initSocket()
      }, 2000)
    }
  }

  initSocket()
}
export function getSocket() {
  return socket
}
export default store
