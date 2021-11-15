import React, { useState } from "react";

import Head from './head'

const RegistrationForm = () => {
  const [newUserName, setNewUserName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const isLoginValid = (newUserName.length > 2)
  const isPasswordValid = (newPassword === repeatPassword) && (newPassword.length > 0)
  const displayValidStatus = (isValid) => isValid ? "border-green-500":"border-red-500"
  return (
    <>
      <Head title="registration" />
      <div className="w-screen h-screen bg-gray-100 flex  justify-center items-center">
        <div className="flex flex-col max-w-xs ">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_username">
                New username
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${displayValidStatus(isLoginValid)}`}
                id="new_username"
                type="text"
                placeholder="Enter new name"
                autoComplete="one-time-code"
                value={newUserName}
                onChange={(e) => {
                  setNewUserName(e.target.value)
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_password">
                New password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${ displayValidStatus(isPasswordValid) }`}
                id="new_password"
                type="password"
                placeholder="Enter new password"
                autoComplete="one-time-code"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)}
                }
              />


              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${displayValidStatus(isPasswordValid)}`}
                id="repeat_password"
                type="password"
                aria-label='repeat password'
                placeholder="Repeat new password"
                autoComplete="one-time-code"
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value)}
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="disabled:bg-gray-300 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="button"
                disabled={!(isLoginValid&&isPasswordValid)}
                onClick={()=>{console.log(`Login: ${newUserName}, password: ${newPassword}`)}}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegistrationForm
