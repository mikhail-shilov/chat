import React from "react"
import Message from "./message";

const Channel = ({messages}) => {
  const listOfMessages = messages.map(
    ({ nickname, message }, index) => <Message key={index} nickname={nickname} message={message} />
  )

  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      {listOfMessages}
    </div>
  )

}
Channel.propTypes = {}

export default React.memo(Channel)
