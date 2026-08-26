// import React from 'react'

import { Link } from "react-router"

function Sidenav({ isOpen, onClose }) {
  return (
    <>
      {/* Dark overlay on mobile when drawer is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        ></div>
      )}

      <div
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto z-50
          w-[75%] sm:w-[20rem] md:w-[20rem]
          border-r-2 border-zinc-700 md:border-zinc-200 p-4
          bg-[#1F1E24] overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between md:block">
          <h1 className="text-white text-2xl">
              <i className="ri-tv-fill mr-3"></i>
              TmDB
          </h1>
          <button onClick={onClose} className="md:hidden text-white text-3xl leading-none">
            <i className="ri-close-line"></i>
          </button>
        </div>

        <nav onClick={onClose} className="flex flex-col text-zinc-100 gap-5">
            <h1 className="text-white text-center font-bold mt-10 mb-5">
                New Feeds
            </h1>
            <Link to="/Trending" className="hover:bg-violet-300 hover:text-white duration-300 rounded p-3 gap-3 ">
            <i className="ri-fire-fill m-1"></i>Trending</Link>
            <Link to="/Popular" className="hover:bg-violet-300 hover:text-white duration-300 rounded p-3 gap-3 ">
            <i className="ri-sparkling-2-fill m-1"></i>
            popular</Link>
            <Link to="/Movies" className="hover:bg-violet-300 hover:text-white duration-300 rounded p-3 gap-1">
            <i className="ri-video-upload-fill m-1"></i>Movies</Link>
            <Link to="/Tv" className="hover:bg-violet-300 hover:text-white duration-300 rounded p-3 gap-1">
            <i className="ri-tv-fill m-1"></i>Tv Show</Link>
            <Link to="/People" className="hover:bg-violet-300 hover:text-white duration-300 rounded p-3 gap-1">
            <i className="ri-user-6-fill m-1"></i>People</Link>
        </nav>
        <hr className="border-transparent bg-white mt-2 mb-0"/>
        <nav className=" flex flex-col text-zinc-100 gap-2">
            <h1 className="text-white text-center font-bold mt-10 mb-5">
                New Feeds
            </h1>
            <Link className="hover:bg-violet-300 hover:text-white duration-300 rounded p-3 gap-1 ">
            <i className="ri-information-line m-1"></i>About</Link>
            <Link className="hover:bg-violet-300 hover:text-white duration-300 rounded p-3 gap-1 ">
            <i className="ri-phone-fill m-1"></i>
            Contact</Link>
        </nav>
      </div>
    </>
  )
}

export default Sidenav
