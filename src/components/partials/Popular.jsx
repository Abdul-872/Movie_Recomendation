import { useNavigate } from "react-router";
import TopNav from "./TopNav";
import DropDrown from "./DropDrown";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "../../utils/axios";

function Popular() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getPopular = async (pageNumber) => {
    try {
      const { data } = await axios.get(
        `/${category}/popular?page=${pageNumber}`
      );

      setPopular((prev) => {
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
    setPopular([]);
    getPopular(1);
  }, [category]);

  const fetchMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;

      setPage(nextPage);
      getPopular(nextPage);
    }
  };

  return popular.length > 0 ? (
    <div className="w-screen min-h-screen overflow-auto p-[3%]">

      <div className="w-full flex items-center h-[15vh] p-3">

        <i
          onClick={() => navigate(-1)}
          className="text-2xl text-purple-500 ri-arrow-left-long-line"
        ></i>

        <h1 className="text-2xl text-white font-bold ml-3 mr-[10%]">
          Popular
        </h1>

        <TopNav />

        <DropDrown
          tittle="Category"
          option={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />

        <div className="w-5"></div>

      </div>

      <Cards
        data={popular}
        title="Popular"
        fetchMore={fetchMore}
        hasMore={page < totalPages}
      />

    </div>
  ) : (
    <Loader />
  );
}

export default Popular;