import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login: loginContext } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password });
      const { token } = res.data;
      loginContext(token); // store token in context/localStorage

      // Redirect based on role
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/movies");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login to MovieHub</h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <Button type="submit">Login</Button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
