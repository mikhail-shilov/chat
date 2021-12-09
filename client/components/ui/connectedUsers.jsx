import React from 'react'
import { useSelector } from 'react-redux'

const ConnectedUsers = ({ connectionStatus }) => {
  const users = useSelector((state) => state.auth.users)

  const placeHolder = () => <p>Connecting...</p>
  const listOfUsers = users.map((userName, index) => <p key={index}>{userName}</p>)

  return (
    <>
      <h2>Online:</h2>
      {connectionStatus ? listOfUsers : placeHolder()}
    </>
  )
}

export default ConnectedUsers
