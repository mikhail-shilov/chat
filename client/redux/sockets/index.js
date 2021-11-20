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
    // eslint-disable-next-line no-console
    console.log('Do subscribe on messages by ws.')
    socket.send(JSON.stringify({ type: 'subscribe', token: getState().auth.token }))
  }
}

export const wsSendMessage = (channel, message) => {
  return (dispatch, getState) => {
    const socket = getSocket()
    socket.send(
      JSON.stringify({
        type: 'broadcast',
        channel,
        message,
        token: getState().auth.token
      })
    )
  }
}
