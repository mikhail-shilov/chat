const initialState = {
  channels: {
    general: {
      info: 'Main channel for general discussion',
      messages: [
        { nickname: 'user1', message: 'sdkjfh lorem ipsum' },
        { nickname: 'user2', message: 'О чем сегодня поговорим?' },
        { nickname: 'user2', message: 'Может о пончиках?' },
        { nickname: 'user1', message: 'Оладушки лучше!' }
      ]
    },
    cats: {
      info: "Cat's speak",
      messages: [
        { nickname: 'user2', message: 'Cats are good' },
        { nickname: 'user1', message: 'Yes!' }
      ]
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
