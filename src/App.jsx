import { Route, Routes } from "react-router"
import Home from './components/Home'
import Trending from "./components/partials/Trending"
import MoviesDetails from "./components/partials/MoviesDetails"
import TvDetails from "./components/partials/TvDetails"
import PeopleDetails from "./components/partials/PeopleDetails"
import Popular from "./components/partials/Popular"
import Movies from "./components/partials/Movies"
import Tv from "./components/partials/Tv"
import People from "./components/partials/People"
// import Loader from "./components/Loader"

// import React from 'react'
function App() {
  return (
    <div className="bg-[#1F1E24] h-screen w-screen flex">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Trending" element={<Trending />}/>
        <Route path="/Popular" element={<Popular />}/>
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/MovieDetails/:id" element={<MoviesDetails />} />
        <Route path="/Tv" element={<Tv />} />
        <Route  path="/Tv/TvDetails/:id" element={<TvDetails />}/>
        <Route path="/People" element={<People />} />
        <Route  path="/People/PeopleDetails/:id" element={<PeopleDetails />}/>
      </Routes>
    </div>
  )
}

export default App
