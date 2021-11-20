import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'

import Head from './head'
import Channel from './ui/channel'
import Editor from './ui/editor'
import Sidebar from './ui/sidebar'
import Header from './ui/header'
import { wsSendMessage } from "../redux/sockets";

const Chat = () => {
  const dispatch = useDispatch()
  const { mode = 'channel', channel = 'general' } = useParams()
  const { login, id: userId } = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const messages = useSelector((state) => state.channel.channels[channel].messages)
  const channels = Object.keys(useSelector((state) => state.channel.channels)).map(
    (nameOfChannel) => (
      <>
        <span className="pr-1 text-grey-light">#</span>
        <Link to={`/chat/channel/${nameOfChannel}`}> {nameOfChannel} </Link>
        <br />
      </>
    )
  )
  useEffect(() => {
    console.log('params:', mode, channel, userId, token.slice(2, 10))
  }, [mode, channel, token, userId])
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

Chat.propTypes = {}

export default React.memo(Chat)
