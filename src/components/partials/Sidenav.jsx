// import React from 'react'

import { Link } from "react-router"

function Sidenav() {
  return (
    <>
      <div className="w-[20rem] border-r-2 border-zinc-200 p-4">
        
        <h1 className="text-white text-2xl ">
            <i className="ri-tv-fill mr-3"></i>
            TmDB
        </h1>
        <nav className=" flex flex-col text-zinc-100 gap-5">
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
