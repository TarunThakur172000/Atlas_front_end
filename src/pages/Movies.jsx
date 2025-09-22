import { useEffect, useState, useContext } from "react";
import { getMovies, voteMovie } from "../api";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies");
    }
  };

  

  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle vote
  const handleVote = async (movieId, type) => {
    if (!user) return setError("Please login to vote.");
    try {
      await voteMovie(movieId, type);
      fetchMovies();
    } catch (err) {
      console.error(err);
      setError("Failed to vote");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Movies</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onVote={handleVote} // optional: if MovieCard handles vote buttons
            />
          ))}
        </div>
      )}
    </div>
  );
}
