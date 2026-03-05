import React from "react";

const IMG = "https://image.tmdb.org/t/p/original";

const MovieCart = ({ movie }) => {

  const year = movie.release_date?.split("-")[0];

  return (
    <div className="mt-5 w-full max-w-6xl mx-auto animate-fadeIn">

      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        <div className="grid lg:grid-cols-3">

          {/* poster */}
          <div className="relative group overflow-hidden">

            <img
              src={`${IMG}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover lg:h-[620px] transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          </div>

          {/* movie-info */}
          <div className="lg:col-span-2 p-5 lg:p-10 flex flex-col justify-between">


            <div>


              <h2 className="text-5xl font-bold mb-2">
                {movie.title}
              </h2>


              <p className="text-gray-400 text-lg mb-6">
                {year} • ⭐ {movie.vote_average.toFixed(1)} / 10 • {movie.vote_count} votes
              </p>


              {/* {movie.genres && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/20"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )} */}


              <div className="mb-8">
                <h3 className="text-purple-400 font-semibold mb-3 uppercase tracking-wide text-sm">
                  Plot
                </h3>

                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.overview}
                </p>
              </div>

              {/* cast */}
              {movie.cast && (
                <div className="mb-8">
                  <h3 className="text-purple-400 font-semibold mb-3 uppercase tracking-wide text-sm">
                    Cast
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {movie.cast.slice(0, 6).map((actor, index) => (
                      <span
                        key={index}
                        className="bg-white/10 px-4 py-1.5 rounded-full text-sm border border-white/10 hover:border-purple-400/40 transition"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ai insights */}
              <div>
                <h3 className="text-purple-400 font-semibold mb-4 uppercase tracking-wide text-sm">
                  AI Audience Insight
                </h3>

                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.aiInsights.summary}
                </p>
              </div>

            </div>


            <div className="w-[100%] mt-10 flex items-center justify-between gap-5">


              <div
                className={`inline-flex items-center gap-3 lg:px-6 px-1 py-3 text-center rounded-full text-sm font-semibold border ${movie.aiInsights.sentiment === "Positive"
                  ? "bg-green-500/10 text-green-400 border-green-400/30"
                  : movie.aiInsights.sentiment === "Mixed"
                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-400/30"
                    : "bg-red-500/10 text-red-400 border-red-400/30"
                  }`}
              >
                {movie.aiInsights.sentiment === "Positive"}
                {movie.aiInsights.sentiment === "Mixed"}
                {movie.aiInsights.sentiment === "Negative"}

                {movie.aiInsights.sentiment} Audience Sentiment
              </div>


              <div className="text-sm text-gray-400">
                Popularity: {movie.popularity?.toFixed(1)}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MovieCart;