import { useEffect, useState } from "react";
import {
  getMovies,
  deleteMovie,
    getAllComments,
  deleteCommentAdmin,
  getTopMovies,
} from "../api";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [TopMovies, setTopMovies] = useState([]);

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all comments (optional: for TopMovies)
  const fetchComments = async () => {
    try {
      const res = await getAllComments(); // backend should handle 0 to fetch all or implement /comments/all
      setComments(res.data);    
    
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch top movies TopMovies
  const fetchTopMovie = async () => {
    try {
      const res = await getTopMovies();
      setTopMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTopMovie();
    fetchComments();
  }, []);

  // Delete movie
  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete comment
  const handleDeleteComment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteCommentAdmin(id);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* TopMovies */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Top Movies</h2>
        <ul>
          {TopMovies.length === 0 && <p>No top movies yet</p>}
          {TopMovies.map((movie) => (
            <li key={movie.id} className="border p-2 mb-2 rounded-lg flex justify-between items-center">
              <span>{movie.title} - Votes: {movie.votes}</span>
            </li>
          ))}
        </ul>
      </section>
{/* Movies Management */}
<section className="mb-6">
  <h2 className="text-2xl font-semibold mb-2">All Movies</h2>
  {movies.length === 0 && <p>No movies available</p>}
  {movies.map((movie) => (
    <div key={movie.id} className="border p-4 mb-2 rounded-lg flex justify-between items-center">
      <div>
        <Link to={`/movies/${movie.id}`}>
        <h3 className="font-bold">{movie.title}</h3>
        </Link>
        <p>{movie.description}</p>
        <p className="text-sm text-gray-500">
          Votes: {movie.votes} | Comments: {movie.comment_count}
        </p>
      </div>
      <Button variant="danger" onClick={() => handleDeleteMovie(movie.id)}>
        Delete
      </Button>
    </div>
  ))}
</section>


      {/* Comments Management */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">All Comments</h2>
        {comments.length === 0 && <p>No comments available</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="border p-2 mb-2 rounded-lg flex justify-between items-center">
            <div>
              <p>{comment.content}</p>
              <small>By: {comment.username}</small>
            </div>
            <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}
