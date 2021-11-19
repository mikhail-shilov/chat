import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { wsSendMessage } from '../../redux/sockets'

const Editor = () => {
  const dispatch = useDispatch()
  const [textOfMessage, setTextOfMessage] = useState()

  return (
    <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
      <input
        type="text"
        className="w-full px-4"
        placeholder="Message to #general"
        value={textOfMessage}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            dispatch(wsSendMessage('general', textOfMessage))
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
