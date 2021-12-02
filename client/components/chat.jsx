import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Channel from './ui/channel'
import Editor from './ui/editor'
import Header from './ui/header'
import { wsSendMessage } from '../redux/sockets'

const Chat = ({ channel }) => {
  const dispatch = useDispatch()
  const { info, messages } = useSelector((state) => state.channel.channels[channel])
  const sendMessageHandler = (channelName, text) => {
    dispatch(wsSendMessage(channelName, text))
  }

  return (
    <div className="flex-grow flex flex-col">
      <Header channelName={channel} channelInfo={info} />
      <Channel messages={messages} />
      <Editor channel={channel} handler={sendMessageHandler} />
    </div>
  )
}

export default Chat
