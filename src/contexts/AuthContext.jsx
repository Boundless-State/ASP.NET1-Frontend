import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
    userId: null,
    isAuthenticated: false,
    loading: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          token,
          role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
          userId: decoded.sub,
          isAuthenticated: true,
          loading: false
        });
      } catch (error) {
        console.error("Token decoding failed", error);
        setAuth({ token: null, role: null, userId: null, isAuthenticated: false, loading: false });
      }
    } else {
      setAuth({ token: null, role: null, userId: null, isAuthenticated: false, loading: false });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, role: null, userId: null, isAuthenticated: false, loading: false });
    navigate("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
