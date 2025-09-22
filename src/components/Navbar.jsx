import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo / Home Link */}
      <Link to="/movies" className="font-bold text-xl hover:text-gray-200">
        MovieHub
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            {/* Admin Link */}
            {user.role === "admin" && (
              <Link to="/admin" className="hover:underline">
                Admin
              </Link>
            )}

            {/* Greeting */}
            <span className="text-sm">Hi, {user.username}</span>
            
            <Link to="/add-movie" className="hover:underline">
    Suggest Movie
  </Link>
            
            {/* Logout Button */}
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
            
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
