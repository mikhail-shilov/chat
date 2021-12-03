import React from 'react'

const Indicator = ({ status }) => {
  const modes = {
    red: 'bg-red-400',
    yellow: 'bg-yellow-400',
    green: 'bg-green-400'
  }

  return (
    <span className={`${status ? modes.green : modes.yellow} rounded-full block w-3 h-3 mt-3 mr-2`} />
  )
}

Indicator.propTypes = {}
export default React.memo(Indicator)
