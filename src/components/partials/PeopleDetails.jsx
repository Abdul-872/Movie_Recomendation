import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../utils/axios";
import Loader from "../Loader";

function PeopleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);

  const getPersonDetails = async () => {
    try {
      const personData = await axios.get(`/person/${id}`);

      const creditData = await axios.get(
        `/person/${id}/combined_credits`
      );

      console.log("PERSON:", personData.data);
      console.log("CREDITS:", creditData.data);

      setPerson(personData.data);
      setCredits(creditData.data.cast || []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPersonDetails();
  }, [id]);

  if (!person) {
    return <Loader />;
  }

  const movies = credits.filter(
    (item) => item.media_type === "movie"
  );

  const tvShows = credits.filter(
    (item) => item.media_type === "tv"
  );

  return (
    <div
      className="min-h-screen w-screen text-white px-[5%] md:px-[10%] py-5 overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.65),
          rgba(0,0,0,0.95)
        ), url(https://image.tmdb.org/t/p/original${
          person.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >

      {/* NAVBAR */}

      <nav className="flex items-center gap-6 mb-8">

        <button onClick={() => navigate(-1)}>
          <i className="text-purple-400 text-3xl ri-arrow-left-long-line"></i>
        </button>

        <h1 className="text-2xl font-bold text-purple-400">
          Person Details
        </h1>

      </nav>


      {/* PERSON DETAILS */}

      <div className="flex flex-col md:flex-row gap-8">

        {/* PROFILE IMAGE */}

        <div className="shrink-0">

          <img
            className="w-[220px] md:w-[280px] h-[320px] md:h-[400px] object-cover rounded-2xl shadow-2xl"
            src={`https://image.tmdb.org/t/p/w500${
              person.profile_path
            }`}
            alt={person.name}
          />

        </div>


        {/* INFORMATION */}

        <div className="flex-1">

          {/* NAME */}

          <h1 className="text-4xl font-bold text-purple-400">
            {person.name}
          </h1>


          {/* DEPARTMENT */}

          <p className="text-gray-300 mt-4">
            Known For:

            <span className="text-white ml-2">
              {person.known_for_department}
            </span>
          </p>


          {/* BIRTHDAY */}

          {person.birthday && (
            <p className="text-gray-300 mt-3">
              Birthday:

              <span className="text-white ml-2">
                {person.birthday}
              </span>
            </p>
          )}


          {/* PLACE OF BIRTH */}

          {person.place_of_birth && (
            <p className="text-gray-300 mt-3">
              Place of Birth:

              <span className="text-white ml-2">
                {person.place_of_birth}
              </span>
            </p>
          )}


          {/* POPULARITY */}

          <p className="text-gray-300 mt-3">
            Popularity:

            <span className="text-white ml-2">
              {person.popularity?.toFixed(1)}
            </span>
          </p>


          {/* COUNTS */}

          <div className="flex flex-wrap gap-5 mt-6">

            {/* MOVIES */}

            <div className="bg-purple-600 px-5 py-3 rounded-xl">
              <p className="text-sm">
                Movies
              </p>

              <p className="text-2xl font-bold">
                {movies.length}
              </p>
            </div>


            {/* TV */}

            <div className="bg-purple-600 px-5 py-3 rounded-xl">
              <p className="text-sm">
                TV Shows
              </p>

              <p className="text-2xl font-bold">
                {tvShows.length}
              </p>
            </div>


            {/* TOTAL */}

            <div className="bg-purple-600 px-5 py-3 rounded-xl">
              <p className="text-sm">
                Total
              </p>

              <p className="text-2xl font-bold">
                {credits.length}
              </p>
            </div>

          </div>


          {/* BIOGRAPHY */}

          <h2 className="text-2xl font-bold text-purple-400 mt-8">
            Biography
          </h2>

          <p className="text-gray-300 leading-7 mt-3 max-w-4xl">
            {person.biography
              ? person.biography
              : "Biography not available."}
          </p>

        </div>

      </div>


      {/* ================= MOVIES ================= */}

      {movies.length > 0 && (

        <section className="mt-12">

          <h2 className="text-3xl font-bold text-purple-400 mb-6">
            Movies ({movies.length})
          </h2>


          {/* WRAPPING GRID */}

          <div className="flex flex-wrap gap-5">

            {movies.map((movie) => (

              <div
                key={movie.id}
                className="w-[180px] shrink-0"
              >

                <img
                  className="w-full h-[260px] object-cover rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.poster_path
                  }`}
                  alt={movie.title}
                />


                <h3 className="font-bold mt-3">
                  {movie.title}
                </h3>


                <p className="text-sm text-gray-400">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* ================= TV SHOWS ================= */}

      {tvShows.length > 0 && (

        <section className="mt-12 pb-10">

          <h2 className="text-3xl font-bold text-purple-400 mb-6">
            TV Shows ({tvShows.length})
          </h2>


          {/* WRAPPING GRID */}

          <div className="flex flex-wrap gap-5">

            {tvShows.map((show) => (

              <div
                key={show.id}
                className="w-[180px] shrink-0"
              >

                <img
                  className="w-full h-[260px] object-cover rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500${
                    show.poster_path
                  }`}
                  alt={show.name}
                />


                <h3 className="font-bold mt-3">
                  {show.name}
                </h3>


                <p className="text-sm text-gray-400">
                  ⭐ {show.vote_average?.toFixed(1)}
                </p>

              </div>

            ))}

          </div>

        </section>

      )}

    </div>
  );
}

export default PeopleDetails;