import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'

const Logout = () => {
  const cookies = new Cookies()
  const dispatch = useDispatch()

  useEffect(() => {
    cookies.remove('token')
    window.location = '/'
  }, [])

  return (
    <div className="container w-full h-screen main-wrapper flex flex-col justify-center	">
      <div className="text-center ">
        <h1 className="display-1">404</h1>
        <p className="lead text-gray-800 mb-5">Logging out...</p>
        <p className="text-gray-500 mb-0">Good buy...</p>
        <br />
        <button
          className="btn btn-secondary btn-lg"
          type="button"
          tabIndex="0"
          onClick={() => {
            dispatch(push('/'))
          }}
        >
          {' '}
          Back to Mainpage
        </button>
      </div>
    </div>
  )
}

Logout.propTypes = {}

Logout.defaultProps = {}

export default Logout
