import React from 'react'
import { Link } from 'react-router-dom'
import Submenu from './submenu'

const Sidebar = ({ login, channels }) => (
  <div className="flex flex-col w-full md:w-64 bg-purple-800 text-purple-300 pb-6">
    <h1 className="text-white text-2xl mb-2 mt-3 px-4 font-sans flex justify-between">
      <span>@&nbsp;OneMoreChat</span>
    </h1>
    <div className="flex items-center mb-12 px-4">
      <span className="bg-green-100 rounded-full block w-2 h-2 mr-2" />
      <span>{login}</span>
    </div>
    <div className="flex flex-grow">
      <Submenu header="Channels" prefix="#" subdomain="channel" items={channels} />
    </div>
    <div className="px-4 mb-3 font-sans">
      <Link to="/logout">Settings</Link>
    </div>
    <div className="px-4 mb-3 font-sans">
      <Link to="/logout">Logout</Link>
    </div>
  </div>
)

Sidebar.propTypes = {}
export default React.memo(Sidebar)
