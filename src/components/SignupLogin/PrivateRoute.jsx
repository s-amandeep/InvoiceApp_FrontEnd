// src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("PRivate Route -> " + user.role);

  if (roles && roles.indexOf(user.role) === -1) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
