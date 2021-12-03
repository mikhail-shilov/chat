import React, { useState } from 'react'

const Editor = ({ connectionStatus, channel, handler }) => {
  const [textOfMessage, setTextOfMessage] = useState()
  return (
    <div className="editor flex m-6 overflow-hidden">
      <input
        disabled={!connectionStatus}
        type="text"
        className="w-full border border-grey rounded-lg p-2"
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
