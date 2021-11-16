import Cookies from "universal-cookie";

const SIGN_IN = 'SIGN_IN'
const ERROR = 'ERROR'

const cookies = new Cookies()

const initialState = {
  token: cookies.get('token'),
  user: {
    name: 'LocalUser123',
    id: '321321ff',
    origin: 'This is profile message'
  },
  previousError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, token: action.token, user: action.user }
    case  ERROR:
      return { ...state, previousError: action.errorMessage}
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
        console.log(data)
        if (data.status === 'error') {
          dispatch(setErrorMessage(data.message))
        }
        if (data.status === 'ok') {
          dispatch(signIn(data.token, data.user))
          dispatch(setErrorMessage(null))
        }
      })
  }
}

export function checkSignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        if (data.status === 'error') dispatch(setErrorMessage(data.error))
        if (data.status === 'ok') dispatch(setErrorMessage(null))
      })
  }
}
