import React, { useEffect, useRef } from 'react'
import Message from './message'

const Channel = ({ messages }) => {
  const divMustScroll = useRef(null)
  const listOfMessages = messages.map(({ author, message }, index) => (
    <Message key={index} author={author} message={message} />
  ))
  useEffect(() => {
    divMustScroll.current.scrollIntoView()
  }, [messages])

  return (
      <div className="h-1 flex-shrink flex-grow px-6 py-4  overflow-y-scroll ">
        {listOfMessages}
        <div ref={divMustScroll} />
      </div>
  )
}
Channel.propTypes = {}

export default React.memo(Channel)
