import { useEffect } from "react";
import { aysncloadmovie, removemovie } from "../../../store/actions/Movieaction";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

function MoviesDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    console.log("API CALL START");
    dispatch(aysncloadmovie(id));

    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  if (!info) {
    return <Loader />;
  }

  const movie = info.details;

  return (
    <div
      className="min-h-screen w-screen text-white overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.95)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* NAVBAR */}
      <nav className="flex items-center gap-6 px-[10%] py-5">
        <button onClick={() => navigate(-1)}>
          <i className="text-purple-400 text-3xl ri-arrow-left-long-line"></i>
        </button>

        {info.externalid?.imdb_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            className="text-xl text-yellow-400 font-bold"
          >
            IMDb
          </a>
        )}
      </nav>

      {/* MAIN MOVIE SECTION */}
      <div className="px-[10%] py-5">
        <div className="flex gap-8">

          {/* POSTER */}
          <img
            className="w-[30%] max-w-[350px] h-[500px] rounded-2xl object-cover shadow-2xl"
            src={`https://image.tmdb.org/t/p/original${
              movie.poster_path || movie.backdrop_path
            }`}
            alt={movie.title}
          />

          {/* MOVIE INFORMATION */}
          <div className="flex-1 pt-5">

            {/* TITLE */}
            <h1 className="text-4xl font-bold text-purple-400">
              {movie.title || movie.original_title}

              <small className="text-white text-xl ml-3">
                ({movie.release_date?.split("-")[0]})
              </small>
            </h1>

            {/* ORIGINAL TITLE */}
            {movie.original_title &&
              movie.original_title !== movie.title && (
                <p className="text-gray-300 mt-2">
                  Original Title: {movie.original_title}
                </p>
              )}

            {/* GENRES */}
            <div className="flex gap-2 mt-5 flex-wrap">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-purple-600"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* BASIC INFO */}
            <div className="flex gap-6 mt-5 text-gray-300">

              <p>
                ⭐ Rating:{" "}
                <span className="text-white font-bold">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </p>

              <p>
                🔥 Popularity:{" "}
                <span className="text-white font-bold">
                  {movie.popularity?.toFixed(1)}
                </span>
              </p>

              <p>
                🎬 Votes:{" "}
                <span className="text-white font-bold">
                  {movie.vote_count}
                </span>
              </p>

            </div>

            {/* RUNTIME */}
            {movie.runtime && (
              <p className="mt-4 text-gray-300">
                ⏱ Runtime:{" "}
                <span className="text-white">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </p>
            )}

            {/* OVERVIEW */}
            <h2 className="text-2xl text-purple-400 font-bold mt-7">
              Overview
            </h2>

            <p className="text-gray-300 leading-7 mt-2 max-w-4xl">
              {movie.overview}
            </p>

            {/* TRAILER */}
            {info.videos?.key && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.youtube.com/watch?v=${info.videos.key}`}
                className="inline-block mt-6 px-5 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-700"
              >
                ▶ Watch Trailer
              </a>
            )}
          </div>
        </div>

        {/* SIMILAR MOVIES */}
        {info.similar?.length > 0 && (
          <section className="mt-12">

            <h2 className="text-3xl font-bold text-purple-400 mb-6">
              Similar Movies
            </h2>

            <div className="flex gap-5 overflow-x-auto pb-5">

              {info.similar.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/Movies/MovieDetails/${movie.id}`}
                  className="min-w-[180px] w-[180px] group"
                >
                  <img
                    className="w-full h-[260px] object-cover rounded-xl group-hover:scale-105 transition duration-300"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <h3 className="font-bold mt-3">
                    {movie.title || movie.original_title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </Link>
              ))}

            </div>
          </section>
        )}

        {/* RECOMMENDATIONS */}
        {info.recomendation?.length > 0 && (
          <section className="mt-12 pb-10">

            <h2 className="text-3xl font-bold text-purple-400 mb-6">
              Recommendations
            </h2>

            <div className="flex gap-5 overflow-x-auto pb-5">

              {info.recomendation.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/Movies/MovieDetails/${movie.id}`}
                  className="min-w-[180px] w-[180px] group"
                >
                  <img
                    className="w-full h-[260px] object-cover rounded-xl group-hover:scale-105 transition duration-300"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />

                  <h3 className="font-bold mt-3">
                    {movie.title || movie.original_title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </Link>
              ))}

            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default MoviesDetails;