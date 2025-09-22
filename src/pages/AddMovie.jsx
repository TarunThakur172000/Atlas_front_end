import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../api";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

export default function AddMovie() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim()) {
      return setError("Both title and description are required");
    }

    try {
      await addMovie({ title, description });
      setSuccess("Movie suggested successfully!");
      setTitle("");
      setDescription("");

      // Optional: redirect to /movies
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add movie");
    }
  };

  if (!user) return <p className="p-6">Please login to suggest a movie.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Suggest a New Movie</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Movie Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          rows={4}
          required
        />
        <Button type="submit">Suggest Movie</Button>
      </form>
    </div>
  );
}
