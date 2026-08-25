// import { Link } from "react-router";

import { Link } from "react-router";

// import DropDrown from "./DropDrown";

function HorizontalCards({ data }) {
  return (
    <div className="w-full h-[50vh] p-2">
      <div className="w-full h-[36vh] flex overflow-x-auto gap-4">
        {data.map((d, i) => {
          return (
            <Link to={
    d.media_type === "movie"
      ? `/Movies/MovieDetails/${d.id}`
      : d.media_type === "tv"
      ? `/Tv/TvDetails/${d.id}`
      : `/People/PeopleDetails/${d.id}`
  }
              key={i}
              className="min-w-[250px] h-full overflow-hidden rounded"
            >
              <img
                className="w-full h-[15vh] object-cover"
                src={`https://image.tmdb.org/t/p/original${
                  d.backdrop_path || d.profile_path
                }`}
                alt=""
              />

              <h1 className="font-bold text-xl text-white ml-2 mt-2">
                {d.name || d.title || d.original_title}
              </h1>

              <p className="text-white text-sm ml-2">
                {d.overview?.slice(0, 100)}...
                <span className="text-blue-200 ml-1">more</span>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HorizontalCards;