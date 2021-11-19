import React from "react"

const Message = ({author, message}) => (

  <div className="flex items-start">
    <div className="flex flex-col">
      <div className="flex items-end">
        <span className="font-bold text-md mr-2 font-sans">{author}:</span>
        <span className="font-light text-md text-grey-darkest pt-1">
        {message}
      </span>

      </div>
    </div>
  </div>
)

// To the future:
// <img alt={author} src="https://i.imgur.com/qACoKgY.jpg" className="w-10 h-10 rounded mr-3" />
// <span className="text-grey text-xs font-light">12:46</span>

Message.propTypes = {}

export default React.memo(Message)
