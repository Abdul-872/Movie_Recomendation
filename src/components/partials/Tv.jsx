import { useNavigate } from "react-router";
import TopNav from "./TopNav";
import DropDrown from "./DropDrown";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "../../utils/axios";

function Tv() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const gettv = async (pageNumber) => {
    try {
      const { data } = await axios.get(
        `/tv/${category}?page=${pageNumber}`
      );
    //   console.log(data)

      settv((prev) => {
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
    settv([]);
    gettv(1);
  }, [category]);

  const fetchMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;

      setPage(nextPage);
      gettv(nextPage);
    }
  };

  return tv.length > 0 ? (
    <div className="w-screen min-h-screen overflow-auto p-[3%]">

      <div className="w-full flex items-center h-[15vh] p-3">

        <i
          onClick={() => navigate(-1)}
          className="text-2xl text-purple-500 ri-arrow-left-long-line"
        ></i>

        <h1 className="text-2xl text-white font-bold ml-3 mr-[10%]">
          tv
        </h1>

        <TopNav />

        <DropDrown
        tittle="Category"
        option={["airing_today",
            "on_the_air",
            "popular",
            "top_rated",]}
        func={(e) => setCategory(e.target.value)}
        />

        <div className="w-5"></div>

      </div>

      <Cards
        data={tv}
        title="Tv"
        fetchMore={fetchMore}
        hasMore={page < totalPages}
      />

    </div>
  ) : (
    <Loader />
  );
}

export default Tv;