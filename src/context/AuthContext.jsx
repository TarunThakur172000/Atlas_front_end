import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Decode JWT to get user info
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id, role: payload.role, username: payload.username });
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = (jwt) => setToken(jwt);
  const logout = () => setToken("");

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
