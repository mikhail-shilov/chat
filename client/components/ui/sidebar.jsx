import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Submenu from './submenu'
import Indicator from './indicator'

const Sidebar = ({ login, roles, channels, connectionStatus, isShowListOfUsers, setShowListOfUsers }) => {
  const [displayMenu, setDisplayMenu] = useState(false)

  useEffect(() => {
    const test = document.querySelectorAll('.controls a')
    test.forEach((item) => {
      item.addEventListener('click', () => {
        setDisplayMenu(false)
      })
    })
  }, [])

  return (
    <div className="flex-shrink-0 flex flex-col w-full z-50 md:max-h-screen md:w-56 md:overflow-y-auto bg-purple-800 text-purple-300">
      <h1 className="flex flex-row justify-between text-white text-2xl mb-2 mt-3 px-4 font-sans">
        <span>@&nbsp;OneMoreChat</span>
        <span className="flex flex-row gap-4">
          <button
            className="userListBtn block md:hidden"
            type="button"
            onClick={() => {
              setShowListOfUsers(!isShowListOfUsers)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block mt-1 h-6 w-6 fill-current"
              viewBox="0 0 49.3 45.8"
            >
              <path d="M48.4 39.2c-.6-2-1.8-4-3.5-5-3.4-2.3-7.3-3.5-11-4.7-1-.4-1.9-.7-2.7-1.2-.8-.5-1-1.4-1.2-2.2l-.2-1.2C32.6 21 34.4 15 34.4 10c0-7.8-4.4-10-9.9-10-5.4 0-9.9 2.2-9.9 10 0 5.2 2 11.6 4.9 15.3l-.1.8c-.2.8-.5 1.7-1.2 2.2-.9.5-1.8.8-2.7 1-3.8 1.4-7.7 2.5-11 4.7a10 10 0 0 0-3.6 5.2c-.7 2-1 4.5-.9 6.6h49.3c0-2-.2-4.6-.9-6.6z" />
            </svg>
          </button>
          <button
            className="block md:hidden"
            type="button"
            onClick={() => {
              setDisplayMenu(!displayMenu)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block mt-1 h-6 w-6 fill-current"
              viewBox="0 0 20 20"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </span>
      </h1>
      <div className={`controls ${displayMenu ? 'flex' : 'hidden'} h-full md:flex flex-col`}>
        <div className="flex mb-12 px-4">
          <Indicator status={connectionStatus} />
          <span>{login}</span>
        </div>
        <div className="flex flex-grow">
          <Submenu header="Channels" prefix="#" subdomain="channel" items={channels} />
        </div>
        {!!roles && roles.includes('admin') && (
          <div className="px-4 mb-3 font-sans">
            <Link to="/administration">Administration</Link>
          </div>
        )}
        <div className="px-4 mb-3 font-sans">
          <Link to="/settings">Settings</Link>
        </div>
        <div className="px-4 mb-3 font-sans">
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {}
export default React.memo(Sidebar)
