import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from '../../utils/axios'
import noimage from '/no image.webp'

function TopNav() {
    const [query,setquery]= useState("");
    const [searches,setsearch]= useState([]);

    const getSearch =async ()=>{
      try {
        const {data} = await axios.get(`search/multi?query=${query}`)
        console.log(data);
        setsearch(data.results)
      } catch (error) {
        console.log("error",error)
      }
    }

    useEffect(()=>{
      getSearch()
    },[query])

    // console.log(query)
  return (
    <div className=" w-[50%] h-[10vh] mx-auto relative flex text-center items-center">
      <i className=" text-2xl text-zinc-200 ri-search-line"></i>
      <input className="w-[50%] text-zinc-200 mx-10 outline-none border-none bg-transparent" type="text" value={query} onChange={(e)=>{
       setquery(e.target.value) 
      }} placeholder="Search" />
      {
        query.length > 0 && <i onClick={()=>{setquery("")}} className="text-2xl text-zinc-200  ri-close-fill"></i>

      }

        <div className="absolute w-[60%] max-h-[50vh]  text-start overflow-auto left-[5%]  top-[90%]">

          {searches.map((s,i)=>{
              return (
                <Link to={
    s.media_type === "movie"
      ? `/Movies/MovieDetails/${s.id}`
      : s.media_type === "tv"
      ? `/Tv/TvDetails/${s.id}`
      : `/People/PeopleDetails/${s.id}`
  }
                 key={i} className="inline-block w-[100%] hover:text-black roundedhover:bg-blue-200 bg-zinc-300 flex justify-center  items-center p-5 border-2 border-zinc-300">
            <img className="w-[10vh] h-[10vh] inline mr-3 object-cover rounded-2xl" src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path||s.profile_path}`: noimage} alt="" />
            <span>
              {s.name ||s.title||s.original_title}
            </span>
            </Link>
              )
          })}

        </div>

    </div>
  )
}

export default TopNav
