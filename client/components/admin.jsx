import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, kickUser } from '../redux/reducers/admin'
import Tester from './ui/tester'

const Admin = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.admin.loggedUsers)

  const elListOfUser = users.map((user, index) => (
    <div key={index}>
      <div>{user}</div>
      <div>
        <button
          type="button"
          onClick={() => {
            dispatch(kickUser(user))
          }}
        >
          Kick him
        </button>{' '}
      </div>
    </div>
  ))

  return (
    <div className="w-full h-full flex flex-col">
      <button
        type="button"
        onClick={() => {
          dispatch(getUsers())
        }}
      >
        Get users
      </button>
      {elListOfUser}
      <Tester />
    </div>
  )
}

export default Admin
