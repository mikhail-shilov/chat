import React from 'react'

const Header = ({ channelName, channelInfo }) => (
  <div className="border-b flex px-6 py-2 items-center">
    <div className="flex flex-col">
      <h3 className="text-grey-darkest text-md mb-1 font-extrabold">#{channelName}</h3>
      <div className="text-grey font-thin text-sm">
        On this channel are: {channelInfo}
      </div>
    </div>
    <div className="ml-auto hidden md:block">
      <input type="search" placeholder="Search" className="border border-grey rounded-lg p-2" />
    </div>
  </div>
)
Header.propTypes = {}
export default React.memo(Header)
