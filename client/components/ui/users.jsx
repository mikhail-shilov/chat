import React from 'react'

const Users = () => (
  <>
    <div className="px-4 mb-3 font-sans">Connected users</div>

    <div className="flex items-center mb-3 px-4">
      <span className="bg-green-100 rounded-full block w-2 h-2 mr-2" />
      <span className="text-purple-100">
        Olivia Dunham <i className="text-grey-300 text-sm">(me)</i>
      </span>
    </div>

    <div className="flex items-center mb-3 px-4">
      <span className="bg-green rounded-full block w-2 h-2 mr-2" />
      <span className="text-purple-lightest">Adam Bishop</span>
    </div>

    <div className="flex items-center px-4 mb-6">
      <span className="border rounded-full block w-2 h-2 mr-2" />
      <span className="text-purple-lightest">killgt</span>
    </div>
    <div className="px-4 mb-3 font-sans">Applications</div>
  </>
)

Users.propTypes = {}
export default React.memo(Users)
