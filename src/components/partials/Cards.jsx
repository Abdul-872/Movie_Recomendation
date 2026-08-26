import { Link } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";


function Cards({ data, title, fetchMore, hasMore }) {
  if (!data) return null;

  console.log(title)
  
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={
        <h4 className="text-white text-center p-5">
          Loading...
        </h4>
      }
      endMessage={
        <p className="text-white text-center p-5">
          No more movies/shows
        </p>
      }
    >
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 sm:p-8 rounded-2xl bg-black">
        {data.map((s, i) => (

          <Link  to={
    s.media_type === "movie"
      ? `/Movies/MovieDetails/${s.id}`
      : s.media_type === "tv"
      ? `/Tv/TvDetails/${s.id}`
      : s.media_type === "person"
      ? `/People/PeopleDetails/${s.id}`
      : title === "Tv"
      ? `/Tv/TvDetails/${s.id}`
      : title === "People"
      ? `/People/PeopleDetails/${s.id}`
      : title === "movie"
      ? `/Movies/MovieDetails/${s.id}`
      : title === "Popular"
      ? s.name
        ? `/Tv/TvDetails/${s.id}`
        : `/Movies/MovieDetails/${s.id}`
      : `/Movies/MovieDetails/${s.id}`
  }
            key={s.id || i}
            className="w-full"
          >
            <img
              className="w-full rounded-2xl h-[160px] sm:h-[200px] md:h-[240px] object-cover"
              src={`https://image.tmdb.org/t/p/original${
                s.backdrop_path || s.poster_path || s.profile_path
              }`}
              alt=""
            />
            <p className="text-white text-sm sm:text-base font-bold mt-2 sm:mt-4 line-clamp-1">
              {s.name || s.title || s.original_title}
            </p>

            <p className="text-xs sm:text-sm text-zinc-400">{title}</p>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default Cards;
