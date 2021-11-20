import React from "react"
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
    </div>
  )
}
Tester.propTypes = {}

export default React.memo(Tester)
