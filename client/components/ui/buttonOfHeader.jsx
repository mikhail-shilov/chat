import React from 'react'

const ButtonOfHeader = ({ caption = 'Button', handler, appearance = '' }) => {
  return (
    <button
      className={appearance}
      type="button"
      onClick={handler}
    >
      {caption}
    </button>
  )
}

export default ButtonOfHeader
