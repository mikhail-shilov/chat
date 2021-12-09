const SET_SHOW_MENU = 'SET_SHOW_MENU'
const SET_SHOW_USERS = 'SET_SHOW_USERS'

const initialState = {
  appName: 'OneMoreChat',
  isShowMenu: false,
  isShowUsers: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_MENU: {
      return { ...state, isShowMenu: action.isShowMenu }
    }
    case SET_SHOW_USERS: {
      return { ...state, isShowUsers: action.isShowUsers }
    }
    default:
      return state
  }
}

export const setShowMenu = (isShowMenu) => ({ type: SET_SHOW_MENU, isShowMenu })
export const setShowUsers = (isShowUsers) => ({ type: SET_SHOW_USERS, isShowUsers })
