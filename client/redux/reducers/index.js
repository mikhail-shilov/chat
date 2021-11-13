import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import channel from "./channel"
import direct from "./direct";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    channel,
    direct
  })

export default createRootReducer
