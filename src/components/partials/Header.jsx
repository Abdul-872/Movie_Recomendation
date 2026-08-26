import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "../../utils/axios";

function Header({ data }) {

  const [video, setVideo] = useState(null);

  useEffect(() => {

    if (!data?.id || !data?.media_type) return;

    const getVideo = async () => {

      try {

        const { data: videoData } = await axios.get(
          `/${data.media_type}/${data.id}/videos`
        );

        const trailer =
          videoData.results.find(
            (v) =>
              v.site === "YouTube" &&
              v.type === "Trailer"
          ) ||
          videoData.results.find(
            (v) => v.site === "YouTube"
          );

        setVideo(trailer);

      } catch (error) {
        console.log(error);
      }

    };

    getVideo();

  }, [data]);

  if (!data) return null;

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-[35vh] sm:h-[40vh] md:h-[45vh] flex flex-col items-start justify-end px-4 sm:px-6 md:ml-1"
    >

      <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl text-white mb-2 sm:mb-4 line-clamp-2">
        {data.name || data.title || data.original_title}
      </h1>

      <p className="font-bold text-white text-xs sm:text-sm mb-3 sm:mb-1 max-w-[95%] sm:max-w-[80%] md:max-w-[600px]">

        {data.overview?.slice(0, 200)}...

        <Link
          to={
            data.media_type === "movie"
              ? `/Movies/MovieDetails/${data.id}`
              : data.media_type === "tv"
              ? `/Tv/TvDetails/${data.id}`
              : `/Movies/MovieDetails/${data.id}`
          }
          className="text-blue-200"
        >
          more
        </Link>

      </p>

      {video?.key && (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.youtube.com/watch?v=${video.key}`}
          className="inline-block mb-4 sm:mb-6 px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base bg-purple-300 rounded-lg font-bold hover:bg-red-700"
        >
          ▶ Watch Trailer
        </a>
      )}

    </div>
  );
}

export default Header;
