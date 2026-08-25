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
   <Sidenav />
   <div className="w-[75%]  overflow-hidden overflow-x-auto">
    <TopNav/>
    <Header data={walpaper}/>
    <div className="flex justify-between">
        <h1 className="font-bold text-3xl text-white mb-2">Trending</h1>
        <DropDrown tittle='filter' option={['movie','tv','all']} func={(e)=>
      setcategeory(e.target.value)} />
      </div>
    <HorizontalCards  data={trnding} />

   </div>
   </>
  ):(<Loader />)
}

export default Home
