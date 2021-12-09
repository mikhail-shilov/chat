import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import reg from './reg'
import channel from './channels'
import admin from './admin'
import ui from './ui'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    ui,
    reg,
    channel,
    admin
  })

export default createRootReducer
