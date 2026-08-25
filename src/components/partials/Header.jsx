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
      className="w-full h-[45vh] flex flex-col items-start justify-end"
    >

      <h1 className="font-bold text-5xl text-white ml-7 mb-4">
        {data.name || data.title || data.original_title}
      </h1>

      <p className="font-bold text-white text-sm ml-7 mb-1">

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
          className="inline-block mt-6 px-5 py-3 bg-purple-300 rounded-lg font-bold hover:bg-red-700"
        >
          ▶ Watch Trailer
        </a>
      )}

    </div>
  );
}

export default Header;