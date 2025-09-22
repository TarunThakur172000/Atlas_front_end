import axios from "axios";

// Base API config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
});

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ---------------------- AUTH ----------------------
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// ---------------------- MOVIES ----------------------
export const getMovies = () => API.get("/movies");
export const addMovie = (data) => API.post("/movies", data);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

// ---------------------- VOTES ----------------------
export const voteMovie = (movieId, voteType) =>
  API.post(`/votes/${movieId}`, { vote_type: voteType });

// ---------------------- COMMENTS ----------------------
export const getComments = (movieId) => API.get(`/comments/${movieId}`);
export const addComment = (movieId, data) =>
  API.post(`/comments/${movieId}`, data);
export const updateComment = (id, data) =>
  API.put(`/comments/${id}`, data);
export const deleteCommentAdmin = (id) =>
  API.delete(`/comments/${id}`); // admin delete
export const deleteCommentUser = (id) =>
  API.delete(`/comments/user/${id}`); // user delete
export const getAllComments = () => API.get(`/comments/all`);

// ---------------------- ADMIN ----------------------
export const getLeaderboard = () => API.get("/admin/leaderboard");
export const getTopMovies = () => API.get("/movies/movies/top");
