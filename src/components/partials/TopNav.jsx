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
        // console.log(data);
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
    <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto relative flex text-center items-center px-4 sm:px-0 py-3 sm:py-0 sm:h-[10vh]">
      <i className=" text-xl sm:text-2xl text-zinc-200 ri-search-line shrink-0"></i>
      <input className="w-full text-zinc-200 mx-4 sm:mx-10 outline-none border-none bg-transparent min-w-0" type="text" value={query} onChange={(e)=>{
       setquery(e.target.value) 
      }} placeholder="Search" />
      {
        query.length > 0 && <i onClick={()=>{setquery("")}} className="text-xl sm:text-2xl text-zinc-200 ri-close-fill shrink-0"></i>

      }

        <div className="absolute w-[90%] sm:w-[60%] max-h-[50vh] text-start overflow-auto left-[5%] sm:left-[5%] top-[95%] sm:top-[90%] z-30">

          {searches.map((s,i)=>{
              return (
                <Link to={
    s.media_type === "movie"
      ? `/Movies/MovieDetails/${s.id}`
      : s.media_type === "tv"
      ? `/Tv/TvDetails/${s.id}`
      : `/People/PeopleDetails/${s.id}`
  }
                 key={i} className="w-full hover:text-black rounded hover:bg-blue-200 bg-zinc-300 flex justify-start items-center p-3 sm:p-5 border-2 border-zinc-300">
            <img className="w-[8vh] h-[8vh] sm:w-[10vh] sm:h-[10vh] inline mr-3 object-cover rounded-2xl shrink-0" src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path||s.profile_path}`: noimage} alt="" />
            <span className="text-sm sm:text-base truncate">
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
