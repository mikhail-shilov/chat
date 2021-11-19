import React, { useState } from 'react'

const Editor = ({ channel, handler }) => {
  const [textOfMessage, setTextOfMessage] = useState()
  return (
    <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
      <input
        type="text"
        className="w-full px-4"
        placeholder={`Message to #${channel}`}
        value={textOfMessage}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handler(channel, textOfMessage)
            setTextOfMessage('')
          }
        }}
        onChange={(e) => {
          setTextOfMessage(e.target.value)
        }}
      />
    </div>
  )
}

Editor.propTypes = {}
export default React.memo(Editor)
