// import { Link } from "react-router";

import { Link } from "react-router";

// import DropDrown from "./DropDrown";

function HorizontalCards({ data }) {
  return (
    <div className="w-full h-auto sm:h-[50vh] p-2">
      <div className="w-full h-auto sm:h-[36vh] flex overflow-x-auto gap-4 pb-2">
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
              className="min-w-[160px] sm:min-w-[200px] md:min-w-[250px] h-full overflow-hidden rounded shrink-0"
            >
              <img
                className="w-full h-[100px] sm:h-[13vh] md:h-[15vh] object-cover"
                src={`https://image.tmdb.org/t/p/original${
                  d.backdrop_path || d.profile_path
                }`}
                alt=""
              />

              <h1 className="font-bold text-base sm:text-lg md:text-xl text-white ml-2 mt-2 line-clamp-1">
                {d.name || d.title || d.original_title}
              </h1>

              <p className="text-white text-xs sm:text-sm ml-2 line-clamp-2 sm:line-clamp-none">
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
