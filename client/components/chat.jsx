import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Head from './head'
import Channel from './ui/channel'
import Editor from './ui/editor'
import Sidebar from './ui/sidebar'
import Header from './ui/header'
import { wsSendMessage } from '../redux/sockets'

const ChatPage = () => {
  const dispatch = useDispatch()
  const { channel = 'general' } = useParams() // mode = 'channel',
  const login = useSelector((state) => state.auth.user.login)
  const messages = useSelector((state) => state.channel.channels[channel].messages)
  const channels = Object.keys(useSelector((state) => state.channel.channels))

  const sendMessageHandler = (channelName, text) => {
    dispatch(wsSendMessage(channelName, text))
  }

  return (
    <>
      <Head title="chat" />
      <div className="w-full h-screen flex flex-col md:flex-row border shadow bg-white text-2xl">
        <Sidebar channels={channels} login={login} />
        <div className="w-full flex flex-col">
          <Header
            channelName={channel}
            channelInfo={'Chit-chattin&apos; about ugly HTML and mixing of concerns.'}
          />
          <Channel messages={messages} />
          <Editor channel={channel} handler={sendMessageHandler} />
        </div>
      </div>
    </>
  )
}

export default ChatPage
