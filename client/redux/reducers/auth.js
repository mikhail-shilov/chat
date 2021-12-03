import Cookies from 'universal-cookie'
// import { wsSubscribe } from "../sockets";
// import { history } from '..'

const SIGN_IN = 'SIGN_IN'
const ERROR = 'ERROR'
const SOCKET_CONNECTED = 'SOCKET_CONNECTED'
const SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED'

const cookies = new Cookies()

const initialState = {
  token: cookies.get('token'),
  user: {},
  previousError: null,
  isSocketReady: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, token: action.token, user: action.user }
    case SOCKET_CONNECTED:
      return { ...state, isSocketReady: true }
    case SOCKET_DISCONNECTED:
      return { ...state, isSocketReady: false }
    case ERROR:
      return { ...state, previousError: action.errorMessage }
    default:
      return state
  }
}

export const signIn = (token, user) => ({ type: SIGN_IN, token, user })
export const setErrorMessage = (errorMessage) => ({ type: ERROR, errorMessage })

export function doSignIn(login, password) {
  return (dispatch) => {
    fetch('/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'error') {
          dispatch(setErrorMessage(data.message))
        }
        if (data.status === 'ok') {
          dispatch(signIn(data.token, data.user))
          dispatch(setErrorMessage(null))
          // dispatch(wsSubscribe())
          // history.push('/chat')
        }
      })
  }
}

export function checkSignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'ok') {
          dispatch(signIn(data.token, data.user))
          // history.push('/chat')
        }
      })
  }
}

export function logOut() {
  return () => {
    cookies.remove('token', { path: '/' })
    window.location = ''
  }
}
