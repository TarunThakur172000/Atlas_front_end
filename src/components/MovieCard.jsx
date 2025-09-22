import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, onVote }) {
  return (
    <div className="border p-4 rounded-lg flex flex-col justify-between">
      <div>
        {/* Title clickable → redirects to MovieDetail */}
        <Link to={`/movies/${movie.id}`}>
          <h2 className="font-bold text-xl hover:underline cursor-pointer">
            {movie.title}
          </h2>
        </Link>
        <p className="text-gray-700">{movie.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          Suggested by: {movie.suggested_by}
        </p>
        <p className="text-sm mt-1">
          Upvotes: {movie.upvotes} | Downvotes: {movie.downvotes} | Comments:{" "}
          {movie.comment_count}
        </p>
        <p className="text-sm mt-1">
          Current Score: {movie.upvotes - movie.downvotes}
        </p>
      </div>

      <div className="mt-2 flex gap-2">
        <Button onClick={() => onVote(movie.id, +1)}>Upvote</Button>
        <Button onClick={() => onVote(movie.id, -1)} variant="secondary">
          Downvote
        </Button>
      </div>
    </div>
  );
}
