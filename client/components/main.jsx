import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Switch, Route } from 'react-router-dom'

import Head from './head'
import Sidebar from './ui/sidebar'
import { setActiveChannel } from '../redux/reducers/channels'
import Admin from './admin'
import DummyView from './dummy-view'
import Chat from './chat'

const Main = () => {
  const dispatch = useDispatch()
  const { channel = 'general' } = useParams() // mode = 'channel',
  const login = useSelector((state) => state.auth.user.login)
  const channels = useSelector((state) => state.channel.channels)
  const linksChannels = Object.keys(useSelector((state) => state.channel.channels))
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
        <span className={`pr-1 text-grey-light ${item.unread ? 'font-bold' : ''}`}>
          {item.prefix}&nbsp;&nbsp;{item.name}
        </span>
      </Link>
    ))

  useEffect(() => {
    dispatch(setActiveChannel(channel))
  }, [channel])

  return (
    <>
      <Head title="chat" />
      <div
        id='main'
        className="main w-full h-full flex flex-col md:flex-row text-2xl fixed"
      >
        <Sidebar channels={linksChannels} login={login} />
        <div className="content flex flex-grow">
          <Switch>
            <Route exact path="/settings" component={DummyView} />
            <Route exact path="/administration" component={Admin} />
            <Route>
              <Chat channel={channel} />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Main
