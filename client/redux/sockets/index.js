import { getSocket } from '../index'

export default {
  connected: (data) => ({
    type: 'SOCKET_CONNECTED',
    data
  }),
  message: (data) => {
    return JSON.parse(data)
  },
  disconnected: (data) => ({
    type: 'SOCKET_DISCONNECTED',
    data
  })
}


export const wsSubscribe = () => {
  return (dispatch, getState) => {
    const socket = getSocket()
    console.log('Do subscribe through ws.')
    socket.send(JSON.stringify({ type: 'subscribe', token: getState().auth.token }))
  }
}

export const wsSendMessage = (channel, message) => {
  return (dispatch, getState) => {
    console.log('Do subscribe through ws.')
    const socket = getSocket()

    socket.send(
      JSON.stringify({
        wsActivity: 'broadcast',
        channel,
        message,
        token: getState().auth.token
      })
    )
  }
}
