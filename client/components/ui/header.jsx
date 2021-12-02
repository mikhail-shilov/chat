import React from 'react'

const Header = ({ channelName, channelInfo }) => (
  <div className="header border-b flex px-6 py-2">
    <div className="flex flex-col">
      <h3 className="text-grey-darkest text-md mb-1 font-extrabold">#{channelName}</h3>
      <div className="text-grey font-thin text-sm">
        On this channel are: {channelInfo}
      </div>
    </div>
  </div>
)
Header.propTypes = {}
export default React.memo(Header)
