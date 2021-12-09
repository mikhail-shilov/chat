import React from 'react'
import { Link } from 'react-router-dom'
import Submenu from './submenu'
import Indicator from './indicator'

const SideMenu = ({ login, roles, channels = [], connectionStatus }) => {
  return (
    <>
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
    </>
  )
}

SideMenu.propTypes = {}
export default React.memo(SideMenu)
