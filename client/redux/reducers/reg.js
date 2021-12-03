import { doSignIn } from "./auth";

const ERROR = 'ERROR'

const initialState = {
    lastError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR: {
      return { ...state, lastError: action.errorMessage }
    }
    default:
      return state
  }
}

export const setErrorMessage = (errorMessage) => ({type: ERROR, errorMessage})
export function requestRegistration({ login, password }) {
  return (dispatch) => {
    fetch('/api/v1/reg', {
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
        if (data.status === 'error') dispatch(setErrorMessage(data.error))
        if (data.status === 'ok') {
          dispatch(setErrorMessage(null))
          dispatch(doSignIn(login, password))
          console.log('Complete reg - logging in...')
        }
      })
  }
}
