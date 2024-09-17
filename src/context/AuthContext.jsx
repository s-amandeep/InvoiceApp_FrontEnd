// src/context/AuthContext.js
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    // Safely parse user only if it exists and is not 'undefined'
    if (storedUser && storedUser !== 'undefined') {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
          setCurrentUser(null);
        }
      }
  
      if (storedRole && storedRole !== 'undefined') {
        setRole(storedRole);
      }
    }, []);

  const login = async (mobile, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { mobile, password });
      const { user, role } = response.data;
      console.log(response.data)
      setCurrentUser(user);
      setRole(role);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  };

  const signup = async (name, mobile, password, role) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', { name, mobile, password, role });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Signup failed');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const value = {
    currentUser,
    role,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
