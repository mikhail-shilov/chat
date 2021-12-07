import React from 'react'

const ConnectedUsers = ({ users = [], connectionStatus }) => {
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
