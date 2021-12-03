import React, { useEffect, useRef } from 'react'
import Message from './message'
import Header from './header'

const Channel = ({ connectionStatus, channel, info, messages }) => {
  const divMustScroll = useRef(null)
  const listOfMessages = messages.map(({ author, message }, index) => (
    <Message key={index} author={author} message={message} />
  ))
  useEffect(() => {
    divMustScroll.current.scrollIntoView()
  }, [messages])

  return (
    <div className="h-1 flex-shrink flex-grow px-6 py-4 relative overflow-y-scroll ">
      {!connectionStatus && (
        <div className="flex items-center justify-center absolute top-0 left-1 right-0 bottom-0 bg-gray-50 bg-opacity-70">
          Connecting...
        </div>
      )}
      <Header channelName={channel} channelInfo={info} />
      {listOfMessages}
      <div ref={divMustScroll} />
    </div>
  )
}
Channel.propTypes = {}

export default React.memo(Channel)
