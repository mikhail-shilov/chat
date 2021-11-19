import React from 'react'
import Tester from './tester'

const Sidebar = ({ login, channels }) => (
  <div className="bg-purple-800 text-purple-300 w-2/12 pb-6 hidden md:block">
    <h1 className="text-white  text-3xl mb-2 mt-3 px-4 font-sans flex justify-between">
      <span>@ OneMoreChat</span>
    </h1>
    <div className="flex items-center mb-6 px-4">
      <span className="bg-green-100 rounded-full block w-2 h-2 mr-2" />
      <span>{login}</span>
    </div>
    <div className="px-4 mb-2 font-sans">Channels</div>
    <div className="bg-teal-500 mb-6 py-1 px-4 text-white font-semi-bold ">{channels}</div>
    <Tester />

    <div className="px-4 mb-3 font-sans">Settings</div>
  </div>
)

Sidebar.propTypes = {}
export default React.memo(Sidebar)
