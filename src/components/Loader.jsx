// import React from 'react'
import loader from "../../public/200.gif"

function Loader() {
  return (
    <div className="w-full   bg-black">
      <img className="w-[50%] mt-[5%] m-auto bg-black" src={loader} alt="" />
    </div>
  )
}

export default Loader
