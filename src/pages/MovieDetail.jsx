import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getMovies,
  voteMovie,
  getComments,
  addComment,
  updateComment,
  deleteCommentUser,
} from "../api";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

export default function MovieDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  // Fetch movie details
  const fetchMovie = async () => {
    try {
      const res = await getMovies();
      const selected = res.data.find((m) => m.id === parseInt(id));
      setMovie(selected);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await getComments(id);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchComments();
  }, [id]);

  // Handle voting
  const handleVote = async (type) => {
    if (!user) return setError("Please login to vote.");
    try {
      await voteMovie(id, type);
      fetchMovie();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Vote failed");
    }
  };

  // Add comment
  const handleAddComment = async () => {
    if (!user) return setError("Please login to comment.");
    if (!newComment.trim()) return setError("Comment cannot be empty.");

    try {
      await addComment(id, { content: newComment });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add comment");
    }
  };

  // Delete own comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentUser(commentId);
      fetchComments();
    } catch (err) {
      console.error(err);
      setError("Failed to delete comment");
    }
  };

  // Update comment (simple prompt)
  const handleUpdateComment = async (comment) => {
    const updated = prompt("Edit your comment:", comment.content);
    if (!updated) return;
    try {
      await updateComment(comment.id, { content: updated });
      fetchComments();
    } catch (err) {
      console.error(err);
      setError("Failed to update comment");
    }
  };

  if (!movie) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-700 mb-4">{movie.description}</p>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* Voting */}
      <div className="flex gap-4 mb-6">
        <Button onClick={() => handleVote(1)}>👍 Upvote</Button>
        <Button onClick={() => handleVote(-1)}>👎 Downvote</Button>
      </div>

      {/* Comments */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>

        {user && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border p-2 rounded flex-1"
            />
            <Button onClick={handleAddComment}>Post</Button>
          </div>
        )}

        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c) => (
          <div key={c.id} className="border p-2 mb-2 rounded-lg flex justify-between items-center">
            <div>
              <p>{c.content}</p>
              <small>By: {c.username}</small>
            </div>
            {user?.id === c.user_id && (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => handleUpdateComment(c)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteComment(c.id)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
