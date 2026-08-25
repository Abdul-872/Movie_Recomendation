import { useNavigate } from "react-router";
import TopNav from "./TopNav";
import DropDrown from "./DropDrown";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "../../utils/axios";

function Movies() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = async (pageNumber) => {
    try {
      const { data } = await axios.get(
        `/movie/${category}?page=${pageNumber}`
      );
    //   console.log(data)

      setMovies((prev) => {
        if (pageNumber === 1) {
          return data.results;
        }

        return [...prev, ...data.results];
      });

      setTotalPages(data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setMovies([]);
    getMovies(1);
  }, [category]);

  const fetchMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;

      setPage(nextPage);
      getMovies(nextPage);
    }
  };

  return movies.length > 0 ? (
    <div className="w-screen min-h-screen overflow-auto p-[3%]">

      <div className="w-full flex items-center h-[15vh] p-3">

        <i
          onClick={() => navigate(-1)}
          className="text-2xl text-purple-500 ri-arrow-left-long-line"
        ></i>

        <h1 className="text-2xl text-white font-bold ml-3 mr-[10%]">
          Movies
        </h1>

        <TopNav />

        <DropDrown
        tittle="Category"
        option={["now_playing", "popular", "top_rated", "upcoming"]}
        func={(e) => setCategory(e.target.value)}
        />

        <div className="w-5"></div>

      </div>

      <Cards
        data={movies}
        title="movie"
        fetchMore={fetchMore}
        hasMore={page < totalPages}
      />

    </div>
  ) : (
    <Loader />
  );
}

export default Movies;