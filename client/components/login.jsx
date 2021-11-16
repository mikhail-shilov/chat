import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Head from './head'
import { doSignIn } from '../redux/reducers/auth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const previousError = useSelector((state) => state.auth.previousError)
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    console.log(user)
    console.log(token)
  }, [user, token])

  return (
    <>
      <Head title="login" />
      <div className="w-screen h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className=" max-w-xs ">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="login"
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value)
                }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  console.log(`login: ${login}, pass: ${password}`)
                  dispatch(doSignIn(login, password))
                }}
              >
                Sign In
              </button>
              or{' '}
              <NavLink className="underline" to="/registration">
                Registration
              </NavLink>
            </div>
          </form>
        </div>
        {previousError !== null && <div>Error: {previousError}</div>}
      </div>
    </>
  )
}

export default LoginForm
