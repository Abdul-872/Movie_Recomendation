import { useNavigate } from "react-router";
import TopNav from "./TopNav";
import DropDrown from "./DropDrown";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "../../utils/axios";

function Trending() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("week");

  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getTrend = async (pageNumber) => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${pageNumber}`
      );

      setTrending((prev) => {
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

  // Initial request + category/duration change
  useEffect(() => {
    setPage(1)
    setTrending([]);

    getTrend(1);
  }, [category, duration]);
  // Infinite scroll
  const fetchMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      getTrend(nextPage);
    }
  };

  return trending.length > 0 ? (
    <div className="w-screen min-h-screen overflow-auto p-4 sm:p-[3%]">

      <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-0 h-auto md:h-[15vh] py-3">

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <i
            onClick={() => navigate(-1)}
            className="text-2xl text-purple-500 ri-arrow-left-long-line shrink-0"
          ></i>

          <h1 className="text-xl sm:text-2xl text-white font-bold md:mr-[10%]">
            Trending
          </h1>
        </div>

        <TopNav />

        <DropDrown
          tittle="Category"
          option={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        />

        <DropDrown
          tittle="Duration"
          option={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>
      <Cards
        data={trending}
        title={category}
        fetchMore={fetchMore}
        hasMore={page < totalPages}
      />
    </div>
  ) : (
    <Loader />
  );
}

export default Trending;
