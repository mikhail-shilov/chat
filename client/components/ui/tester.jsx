import React from "react"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getSocket } from "../../redux";

const Tester = () => {

  const token = useSelector((state) => state.auth.token)

  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      <div className="px-4 mb-3 font-sans">Tester</div>

      <button
        className="border w-full"
        type="button"
        onClick={() => {
          const testSocket = getSocket()
          testSocket.send(JSON.stringify({ type: 'subscribe', token }))
        }}
      >
        Subscribe
      </button>
      <br />
      <button
        className="border w-full"
        type="button"
        onClick={() => {
          fetch('/api/v1/conn')
            .then((r) => r.json())
            .then((data) => console.log(data))
        }}
      >
        list of conns
      </button>
      <br />
      <button
        className="border w-full"
        type="button"
        onClick={() => {
          fetch('/api/v1/adm/users')
            .then((r) => r.json())
            .then((data) => console.log(data))
        }}
      >
        /api/v1/adm
      </button>
      <br />
      <button
        className='border w-full'
        type="button"
        onClick={() => {
          const socket = getSocket()
          socket.send(
            JSON.stringify({
              wsActivity: 'broadcast',
              channel: 'someNewChan',
              message: `Написал сообщение и рад. На дворе ${new Date()}`,
              token
            })
          )
        }}
      >
        post msg
      </button>
      <Link to="/channel/cats">cat</Link>
      <Link to="/channel/general">gen</Link>
      <Link to="/channel/system">system</Link>
    </div>
  )
}
Tester.propTypes = {}

export default React.memo(Tester)
