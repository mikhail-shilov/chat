import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Switch, Route } from 'react-router-dom'

import Head from './head'
import { setActiveChannel } from '../redux/reducers/channels'
import Admin from './admin'
import DummyView from './dummy-view'
import Chat from './chat'
import ConnectedUsers from './ui/connectedUsers'
import SideMenu from './ui/sidemenu'
import AppHeader from './ui/appHeader'

const Main = () => {
  const dispatch = useDispatch()
  const { channel = 'general' } = useParams() // mode = 'channel',
  useEffect(() => {
    dispatch(setActiveChannel(channel))
  }, [channel])

  const connectionStatus = useSelector((state) => state.auth.isSocketReady)
  const { appName, isShowMenu, isShowUsers } = useSelector((state) => state.ui)
  const { login, roles } = useSelector((state) => state.auth.user)
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

  return (
    <>
      <Head title="chat" />
      <div id="main" className="main fixed w-full h-full flex flex-col md:flex-row text-2xl">
        <div className="1col flex flex-col flex-shrink-0 w-full z-50 md:max-h-screen md:w-56 md:overflow-y-auto bg-purple-800 text-purple-300">
          <div className="appHeader flex ">
            <AppHeader appName={appName} isShowUsers={isShowUsers} isShowMenu={isShowMenu} />
          </div>
          <div
            className={`sideMenu ${isShowMenu ? 'flex' : 'hidden'}
            flex-grow md:flex flex-col`}
          >
            <SideMenu
              login={login}
              channels={elChannels}
              connectionStatus={connectionStatus}
              roles={roles}
            />
          </div>
        </div>
        <div className="2col flex flex-grow">
          <Switch>
            <Route exact path="/settings" component={DummyView} />
            <Route exact path="/administration" component={Admin} />
            <Route>
              <Chat channel={channel} connectionStatus={connectionStatus} />
            </Route>
          </Switch>
        </div>
        <div
          className={`3col
         ${isShowUsers ? 'flex' : 'hidden'}
          md:flex absolute md:relative w-full md:w-min
          p-5 pt-16 md:pt-5 flex-col  
          text-purple-100  border bg-purple-500 `}
        >
          <ConnectedUsers connectionStatus={connectionStatus} />
        </div>
      </div>
    </>
  )
}

export default Main
