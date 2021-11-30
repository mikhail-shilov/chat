import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import reg from './reg'
import channel from './channels'
import direct from './direct'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    reg,
    channel,
    direct
  })

export default createRootReducer
