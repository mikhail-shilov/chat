import React from 'react'
import { Link } from 'react-router-dom'

const Submenu = ({ header, prefix = '#', subdomain, items }) => {
  const elements = items.map((item) => (
    <>
      <span className="pr-1 text-grey-light">{prefix}</span>
      <Link to={`/${subdomain}/${item}`}> {item} </Link>
      <br />
    </>
  ))

  return (
    <div className="flex flex-col">
      <div className="px-4 mb-2 font-sans">{header}</div>
      <div className="bg-teal-500 mb-6 py-1 px-4 text-white font-semi-bold ">{elements}</div>
    </div>
  )
}

Submenu.propTypes = {}
export default React.memo(Submenu)
