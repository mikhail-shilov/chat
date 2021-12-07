const SET_SHOW_CONTROLS = 'SET_SHOW_CONTROLS'
const SET_SHOW_USERS = 'SET_SHOW_USERS'

const initialState = {
  isShowControls: false,
  isShowUsers: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_CONTROLS: {
      return { ...state, isShowControls: action.isShowControls }
    }
    case SET_SHOW_USERS: {
      return { ...state, isShowUsers: action.isShowUsers }
    }
    default:
      return state
  }
}
