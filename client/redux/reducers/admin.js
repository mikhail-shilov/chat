const SET_USERS = 'GET_USERS'
const SET_REQUEST = 'SET_REQUEST'

const initialState = {
  loggedUsers: ['sdfsdf'],
  request: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, loggedUsers: [...action.users] }
    case SET_REQUEST:
      return { ...state, request: action.request }
    default:
      return state
  }
}

export const setUsers = (users) => ({ type: SET_USERS, users })
export const setRequest = (request) => ({ type: SET_REQUEST, request })

export function getUsers() {
  return (dispatch) => {
    fetch('/api/v1/adm/users')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'error') {
          dispatch(setRequest(data.message))
        }
        if (data.status === 'ok') {
          dispatch(setUsers(data.users))
        }
      })
  }
}

export function kickUser(login) {
  return (dispatch) => {
    fetch(`/api/v1/adm/logout/${login}`, { method: 'delete' })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'error') {
          dispatch(setRequest(data.message))
        }
        if (data.status === 'ok') {
          dispatch(getUsers())
        }
      })
  }
}
