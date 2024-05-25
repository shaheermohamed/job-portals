import React, { createContext, useState, useEffect, useContext } from "react";
import { profile } from "../services/apiCalls";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ loggedIn: false, user: {} });

  const fetch = async ({ token }) => {
    try {
      if (token) {
        const result = await profile({ token });
        setUser(result);
        return result;
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    fetch({ token: storedToken });
    setToken(storedToken);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
