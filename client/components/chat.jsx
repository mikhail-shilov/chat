import React from "react"
import Head from "./head"

const Chat = () => (
  <>
    <Head title="chat" />
    <div className="w-full border shadow bg-white">
      <div className="flex">
        <div className="bg-purple-500 text-purple-300 w-1/5 pb-6 hidden md:block">
          <h1 className="text-white text-xl mb-2 mt-3 px-4 font-sans flex justify-between">
            <span>Tailwind CSS</span>
            <svg className="h-6 w-6 text-purple-lightest fill-current" viewBox="0 0 32 32">
              <g id="surface1">
                <path d="M 16 3 C 14.894531 3 14 3.894531 14 5 C 14 5.085938 14.019531 5.167969 14.03125 5.25 C 10.574219 6.132813 8 9.273438 8 13 L 8 22 C 8 22.566406 7.566406 23 7 23 L 6 23 L 6 25 L 13.1875 25 C 13.074219 25.316406 13 25.648438 13 26 C 13 27.644531 14.355469 29 16 29 C 17.644531 29 19 27.644531 19 26 C 19 25.648438 18.925781 25.316406 18.8125 25 L 26 25 L 26 23 L 25 23 C 24.433594 23 24 22.566406 24 22 L 24 13.28125 C 24 9.523438 21.488281 6.171875 17.96875 5.25 C 17.980469 5.167969 18 5.085938 18 5 C 18 3.894531 17.105469 3 16 3 Z M 15.5625 7 C 15.707031 6.988281 15.851563 7 16 7 C 16.0625 7 16.125 7 16.1875 7 C 19.453125 7.097656 22 9.960938 22 13.28125 L 22 22 C 22 22.351563 22.074219 22.683594 22.1875 23 L 9.8125 23 C 9.925781 22.683594 10 22.351563 10 22 L 10 13 C 10 9.824219 12.445313 7.226563 15.5625 7 Z M 16 25 C 16.5625 25 17 25.4375 17 26 C 17 26.5625 16.5625 27 16 27 C 15.4375 27 15 26.5625 15 26 C 15 25.4375 15.4375 25 16 25 Z " />
              </g>
            </svg>
          </h1>
          <div className="flex items-center mb-6 px-4">
            <span className="bg-green rounded-full block w-2 h-2 mr-2"/>
            <span className="text-purple-lightest">Olivia</span>
          </div>

          <div className="px-4 mb-2 font-sans">Channels</div>
          <div className="bg-teal-dark mb-6 py-1 px-4 text-white font-semi-bold "><span className="pr-1 text-grey-light">#</span> general</div>

          <div className="px-4 mb-3 font-sans">Direct Messages</div>

          <div className="flex items-center mb-3 px-4">
            <span className="bg-green rounded-full block w-2 h-2 mr-2" />
            <span className="text-purple-100">Olivia Dunham <i className="text-grey-300 text-sm">(me)</i></span>
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

        </div>

        <div className="w-full flex flex-col">
          <div className="border-b flex px-6 py-2 items-center">
            <div className="flex flex-col">
              <h3 className="text-grey-darkest text-md mb-1 font-extrabold">#general</h3>
              <div className="text-grey font-thin text-sm">
                Chit-chattin&apos; about ugly HTML and mixing of concerns.
              </div>
            </div>
            <div className="ml-auto hidden md:block">
              <input type="search" placeholder="Search" className="border border-grey rounded-lg p-2" />
            </div>
          </div>

          <div className="px-6 py-4 flex-1 overflow-scroll-x">
            <div className="flex items-start mb-4">
              <img alt='ava' src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4" className="w-10 h-10 rounded mr-3" />
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="font-bold text-md mr-2 font-sans">killgt</span>
                  <span className="text-grey text-xs font-light">11:46</span>
                </div>
                <p className="font-light text-md text-grey-darkest pt-1">The slack from the other side.</p>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <img alt='pic' src="https://i.imgur.com/8Km9tLL.jpg" className="w-10 h-10 rounded mr-3" />
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="font-bold text-md mr-2 font-sans">Olivia Dunham</span>
                  <span className="text-grey text-xs font-light">12:45</span>
                </div>
                <p className="font-100 text-md text-grey-400 pt-1">How are we supposed to control the marquee space without an utility for it? I propose this:</p>
                <div className="bg-grey-100 border border-grey-200 font-mono rounded p-3 mt-2 whitespace-pre">sdaf sdafasd fasd fsdaf</ div>
              </div>
            </div>

            <div className="flex items-start">
              <img alt='ava' src="https://i.imgur.com/qACoKgY.jpg" className="w-10 h-10 rounded mr-3" />
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="font-bold text-md mr-2 font-sans">Adam Bishop</span>
                  <span className="text-grey text-xs font-light">12:46</span>
                </div>
                <p className="font-light text-md text-grey-darkest pt-1"><a href="#" className="text-blue">@Olivia Dunham</a> the size of the generated CSS is creating a singularity in space/time, we must stop adding more utilities before
                  it&apos;s too late!</p>
              </div>
            </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

          </div>

          <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
            <span className="text-3xl text-grey px-3 border-r-2 border-grey">+</span>
            <input type="text" className="w-full px-4" placeholder="Message to #general" />
          </div>
        </div>
      </div>
    </div>
  </>
)

Chat.propTypes = {}

export default React.memo(Chat)
