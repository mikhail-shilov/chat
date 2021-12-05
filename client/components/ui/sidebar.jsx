import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Submenu from './submenu'
import Indicator from './indicator'

const Sidebar = ({ login, roles, channels, connectionStatus }) => {
  const [displayMenu, setDisplayMenu] = useState(false)
  useEffect(() => {
    console.log('roles', roles)
  }, [roles])

  useEffect(() => {
    const test = document.querySelectorAll('.controls a')
    test.forEach((item) => {
      item.addEventListener('click', () => {
        setDisplayMenu(false)
      })
    })
  }, [])

  return (
    <div className="flex-shrink-0 flex flex-col w-full md:max-h-screen md:w-64 md:overflow-y-auto bg-purple-800 text-purple-300">
      <h1 className="flex flex-row justify-between text-white text-2xl mb-2 mt-3 px-4 font-sans">
        <span>@&nbsp;OneMoreChat</span>
        <button
          className="block md:hidden"
          type="button"
          onClick={() => {
            setDisplayMenu(!displayMenu)
          }}
        >
          <svg
            className="block mt-1 h-6 w-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
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
