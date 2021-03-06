import React from 'react'

const SubmenuV2 = ({ header, items }) => {
  const elements = items.map((item) => (
    <>
      {item}
      <br />
    </>
  ))


  return (
    <div className="flex flex-col w-full">
      <div className="px-4 mb-2 font-sans">{header}</div>
      <div className="bg-teal-500 mb-6 py-1 px-4 text-white font-semi-bold ">{elements}</div>
    </div>
  )
}

SubmenuV2.propTypes = {}
export default React.memo(SubmenuV2)
