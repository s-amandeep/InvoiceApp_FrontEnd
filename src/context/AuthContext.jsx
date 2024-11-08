// src/context/AuthContext.js
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({
        name: decodedToken.name,
        mobile: decodedToken.sub,
        role: decodedToken.roles[0], // Assuming roles is an array
      });
    }
  }, [token]);

  const login = (jwtToken) => {    
    localStorage.setItem('jwtToken', jwtToken);
    console.log(localStorage.getItem('jwtToken'));
    setToken(jwtToken);
};

const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    setToken(null);
};

  const signup = async (name, mobile, password, role) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        { name, mobile, password, role }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Signup failed");
    }
  };

  const value = {
    user,
    token,
    // role,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}