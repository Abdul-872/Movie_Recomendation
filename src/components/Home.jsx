import { useEffect, useState } from "react"
import Header from "./partials/Header"
import Sidenav from "./partials/Sidenav"
import axios from '../utils/axios'
import TopNav from "./partials/TopNav"
import HorizontalCards from "./partials/HorizontalCards"
import DropDrown from "./partials/DropDrown"
import Loader from "./Loader"

function Home() {
    // document.title = "movies"
    const [walpaper,setwalpaper] =useState(null);
    const [trnding, settrending] = useState(null);
    const [categeory, setcategeory] = useState("all")
    const [sidenavOpen, setSidenavOpen] = useState(false)

    const getHeaderWallpaper =async ()=>{
      try {
        const {data} = await axios.get(`trending/all/day`)
        const randamdata = data.results[(Math.random() * data.results.length).toFixed()]
        // console.log(randamdata);
        setwalpaper(randamdata)
      } catch (error) {
        console.log("error",error)
      }
    }
    const getTrending =async ()=>{
      try {
        const {data} = await axios.get(`/trending/${categeory}/day`)
        // console.log(randamdata);
        settrending(data.results)
      } catch (error) {
        console.log("error",error)
      }
    }

    useEffect(()=>{
      getTrending()
      !walpaper && getHeaderWallpaper()
    },[categeory])
        return walpaper && trnding ? (
   <>
   {/* Mobile hamburger button */}
   <button
     onClick={() => setSidenavOpen(true)}
     className="md:hidden fixed top-4 left-4 z-30 bg-purple-600 text-white p-2 rounded-lg shadow-lg"
   >
     <i className="ri-menu-line text-2xl"></i>
   </button>

   <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />

   <div className="w-full md:w-[75%] overflow-hidden overflow-x-auto min-w-0 pt-14 md:pt-0">
    <TopNav/>
    <Header data={walpaper}/>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-0 mt-4 sm:mt-0">
        <h1 className="font-bold text-2xl sm:text-3xl text-white mb-2">Trending</h1>
        <DropDrown tittle='filter' option={['movie','tv','all']} func={(e)=>
      setcategeory(e.target.value)} />
      </div>
    <HorizontalCards  data={trnding} />

   </div>
   </>
  ):(<Loader />)
}

export default Home
