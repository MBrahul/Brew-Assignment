"use client";

import { useState, useRef, useEffect } from "react";
import MovieSkeleton from "../../components/MovieSkeleton";
import MovieCart from "../../components/MovieCart";
import { validateImdbId } from "@/lib/validateImdbId";


export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const resultsRef = useRef(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setMovies(null);

    if (!imdbId) {
      setError("Please enter an IMDb ID.");
      return;
    }

    if (!validateImdbId(imdbId)) {
      setError("Invalid IMDb ID format. Example: tt0133093");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imdbId }),
      });


      const data = await res.json();

      // console.log(data);

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setMovies(data.movies);

    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (movies?.length && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [movies]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">


      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/30 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col items-center justify-center px-6 py-24">


        <div className="text-center max-w-3xl mb-14">

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            AI Movie Insight Builder
          </h1>

          <p className="text-gray-400 text-lg">
            Enter an IMDb ID and uncover audience sentiment,
            review insights, and AI-powered movie analysis —
            instantly.
          </p>

        </div>


        <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:border-purple-500/40">

          <label className="block text-sm text-gray-400 mb-2">
            IMDb Movie ID
          </label>

          <input
            type="text"
            placeholder="e.g. tt0133093"
            value={imdbId}
            onChange={(e) => {
              setImdbId(e.target.value.trim());
              setError("");
            }}
            className="w-full p-4 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 mb-6 text-white"
          />

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-fadeIn">
              ⚠ {error}
            </div>
          )}


          <button
            onClick={handleSubmit}
            disabled={loading}
            className="relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all duration-300 p-4 rounded-xl font-semibold text-lg disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Analyzing...
              </span>
            ) : (
              "Get Movie Insights"
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Example: The Matrix → <span className="text-purple-400">tt0133093</span>
          </p>

        </div>
        {loading && <MovieSkeleton />}
        {movies?.length > 0 && (
          <div className="mt-24 max-w-7xl mx-auto px-6" ref={resultsRef}>

            <h2 className="text-3xl font-bold mb-10 text-center text-gray-400">
              Search Results
            </h2>

            <div className="flex flex-col gap-2">
              {movies.map((movie, key) => (
                <MovieCart key={key} movie={movie} />
                // ""
              ))}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}