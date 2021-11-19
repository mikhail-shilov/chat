const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

const initialState = {
  channels: {
    general: {
      info: 'Main channel for general discussion',
      messages: [
        { author: 'user1', message: 'lorem ipsum' },
        { author: 'user2', message: 'О чем сегодня поговорим?' },
        { author: 'user2', message: 'Может о пончиках?' },
        { author: 'user1', message: 'Оладушки лучше!' }
      ]
    },
    cats: {
      info: "Cat's speak",
      messages: [
        { author: 'user2', message: 'Cats are good' },
        { author: 'user1', message: 'Yes!' }
      ]
    },
    system: {
      info: 'Обсуждение работы сервера',
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
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.channel]: {
            ...state.channels[action.channel],
            messages: [
              ...state.channels[action.channel].messages,
              {
                author: action.author,
                message: action.message
              }
            ]
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
