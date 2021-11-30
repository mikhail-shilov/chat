const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
const SET_ACTIVE_CHANNEL = 'SET_ACTIVE_CHANNEL'

const initialState = {
  active: 'general',
  channels: {
    general: {
      id: 1,
      info: 'Main channel for general discussion',
      prefix: '#',
      unread: false,
      messages: [
        { author: 'user1', message: 'lorem ipsum' },
        { author: 'user2', message: 'О чем сегодня поговорим?' },
        { author: 'user2', message: 'Может о пончиках?' },
        { author: 'user1', message: 'Оладушки лучше!' }
      ]
    },
    cats: {
      id: 2,
      info: "Cat's speak",
      prefix: '#',
      unread: false,
      messages: [
        { author: 'user2', message: 'Cats are good' },
        { author: 'user1', message: 'Yes!' }
      ]
    },
    system: {
      id: 3,
      info: 'Обсуждение работы сервера',
      prefix: '&',
      unread: false,
      messages: [
        { author: 'user2', message: 'Is it work?' },
        { author: 'user1', message: 'No!' }
      ]
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE: {
      console.log('RECEIVE_MESSAGE', state.active, action.channel, state.active !== action.channel)
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.channel]:
            typeof state.channels[action.channel] !== 'undefined'
              ? {
                  ...state.channels[action.channel],
                  unread: state.active !== action.channel,
                  messages: [
                    ...state.channels[action.channel].messages,
                    {
                      author: action.author,
                      message: action.message
                    }
                  ]
                }
              : {
                  info: 'new channel',
                  unread: state.channels.active !== action.channel,
                  messages: [
                    {
                      author: action.author,
                      message: action.message
                    }
                  ]
                }
        }
      }
    }
    case SET_ACTIVE_CHANNEL: {
      return {
        ...state,
        active: action.channel,
        channels: {
          ...state.channels,
          [action.channel]: {
            ...state.channels[action.channel],
            unread: false
          }
        }
      }
    }
    default:
      return state
  }
}

export const receiveMessage = (channel, author, message) => ({
  type: RECEIVE_MESSAGE,
  channel,
  author,
  message
})

export const setActiveChannel = (channel) => ({
  type: SET_ACTIVE_CHANNEL,
  channel
})
