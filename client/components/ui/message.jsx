import React from "react"

const Message = ({nickname, message}) => (

  <div className="flex items-start">
    <img alt={nickname} src="https://i.imgur.com/qACoKgY.jpg" className="w-10 h-10 rounded mr-3" />
    <div className="flex flex-col">
      <div className="flex items-end">
        <span className="font-bold text-md mr-2 font-sans">{nickname}</span>
        <span className="text-grey text-xs font-light">12:46</span>
      </div>
      <p className="font-light text-md text-grey-darkest pt-1">
        {message}
      </p>
    </div>
  </div>
)

Message.propTypes = {}

export default React.memo(Message)
