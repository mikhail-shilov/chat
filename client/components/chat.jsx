import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import Head from './head'
import Channel from './ui/channel'
import Editor from './ui/editor'
import Sidebar from './ui/sidebar'
import Header from './ui/header'
import { wsSendMessage } from '../redux/sockets'
import { setActiveChannel } from '../redux/reducers/channels'

const ChatPage = () => {
  const dispatch = useDispatch()
  const { channel = 'general' } = useParams() // mode = 'channel',
  const login = useSelector((state) => state.auth.user.login)
  const messages = useSelector((state) => state.channel.channels[channel].messages)
  const channels = useSelector((state) => state.channel.channels)
  const channelsAndStatus = Object.keys(channels)
    .reduce(
      (acc, keyName) => [
        ...acc,
        {
          id: channels[keyName].id,
          name: keyName,
          prefix: channels[keyName].prefix,
          info: channels[keyName].info,
          unread: channels[keyName].unread
        }
      ],
      []
    )
    .map((item) => (
      <Link key={item.id} to={`/channel/${item.name}`}>
        <span className={`pr-1 text-grey-light ${item.unread? 'font-bold' : ''}`}>
          {item.prefix}&nbsp;&nbsp;{item.name}
        </span>
      </Link>
    ))
  const active = useSelector((state) => state.channel.active)
  const all = useSelector((state) => state.channel)
  // const namesOfChannels = Object.keys(useSelector((state) => state.channel.channels))

  useEffect(() => {
    dispatch(setActiveChannel(channel))
  }, [channel])

  useEffect(() => {
    console.log(all)
  }, [all])

  const sendMessageHandler = (channelName, text) => {
    dispatch(wsSendMessage(channelName, text))
  }

  return (
    <>
      <Head title="chat" />
      <div className="w-full h-screen flex flex-col md:flex-row border shadow bg-white text-2xl">
        <Sidebar channels={channelsAndStatus} login={login} />
        <div className="w-full flex flex-col">
          <Header
            channelName={channel}
            channelInfo={'Chit-chattin&apos; about ugly HTML and mixing of concerns.'}
          />
          <Channel messages={messages} />
          <Editor channel={channel} handler={sendMessageHandler} />
          {active}
        </div>
      </div>
    </>
  )
}

export default ChatPage
