import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Switch, Route } from 'react-router-dom'

import Head from './head'
import Sidebar from './ui/sidebar'
import { setActiveChannel } from '../redux/reducers/channels'
import Admin from './admin'
import DummyView from './dummy-view'
import Chat from './chat'
import ConnectedUsers from './ui/connectedUsers'

const Main = () => {
  const dispatch = useDispatch()
  const { channel = 'general' } = useParams() // mode = 'channel',
  const { login, roles } = useSelector((state) => state.auth.user)
  const users = useSelector((state) => state.auth.users)
  const connectionStatus = useSelector((state) => state.auth.isSocketReady)
  const channels = useSelector((state) => state.channel.channels)
  const elChannels = Object.keys(channels)
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

  const [isShowListOfUsers, setShowListOfUsers] = useState(false)

  return (
    <>
      <Head title="chat" />
      <div id="main" className="main w-full h-full flex flex-col md:flex-row text-2xl fixed">
        <Sidebar
          channels={elChannels}
          login={login}
          roles={roles}
          connectionStatus={connectionStatus}
          isShowListOfUsers={isShowListOfUsers}
          setShowListOfUsers={setShowListOfUsers}
        />
        <div className="content flex flex-grow">
          <Switch>
            <Route exact path="/settings" component={DummyView} />
            <Route exact path="/administration" component={Admin} />
            <Route>
              <Chat channel={channel} connectionStatus={connectionStatus} />
            </Route>
          </Switch>
        </div>
        <div className={`${isShowListOfUsers ? 'flex' : 'hidden'} md:flex absolute md:relative w-full p-5 md:w-min pt-16 md:pt-5 flex-col userList text-purple-100  border bg-purple-500 `}>
          <ConnectedUsers users={users} connectionStatus={connectionStatus}/>
        </div>
      </div>
    </>
  )
}

export default Main
