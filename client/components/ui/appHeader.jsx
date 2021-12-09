import React from 'react'
import { useDispatch } from 'react-redux'
import ButtonOfHeader from './buttonOfHeader'
import { setShowMenu, setShowUsers } from '../../redux/reducers/ui'

const AppHeader = ({ appName, isShowMenu, isShowUsers }) => {
  const dispatch = useDispatch()

  const iconUsers = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="block mt-1 h-6 w-6 fill-current"
      viewBox="0 0 49.3 45.8"
    >
      <path d="M48.4 39.2c-.6-2-1.8-4-3.5-5-3.4-2.3-7.3-3.5-11-4.7-1-.4-1.9-.7-2.7-1.2-.8-.5-1-1.4-1.2-2.2l-.2-1.2C32.6 21 34.4 15 34.4 10c0-7.8-4.4-10-9.9-10-5.4 0-9.9 2.2-9.9 10 0 5.2 2 11.6 4.9 15.3l-.1.8c-.2.8-.5 1.7-1.2 2.2-.9.5-1.8.8-2.7 1-3.8 1.4-7.7 2.5-11 4.7a10 10 0 0 0-3.6 5.2c-.7 2-1 4.5-.9 6.6h49.3c0-2-.2-4.6-.9-6.6z" />
    </svg>
  )

  const iconMenu = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="block mt-1 h-6 w-6 fill-current"
      viewBox="0 0 20 20"
    >
      <title>Mobile menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  )

  return (
    <div className="appHeader w-full flex ">
      <h1 className="flex flex-row w-full justify-between text-white text-2xl mb-2 mt-3 px-4 font-sans">
        <span>@&nbsp;{appName}</span>
        <span className="flex md:hidden flex-row gap-4">
          <ButtonOfHeader
            caption={iconUsers()}
            handler={() => {
              dispatch(setShowUsers(!isShowUsers))
            }}
          />
          <ButtonOfHeader
            caption={iconMenu()}
            handler={() => {
              dispatch(setShowMenu(!isShowMenu))
            }}
          />
        </span>
      </h1>
    </div>
  )
}

export default AppHeader
