import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/SignupLogin/Login";
import Signup from "./components/SignupLogin/Signup";
import HomePage from "./components/SignupLogin/HomePage";
import AdminPage from "./components/SignupLogin/AdminPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/SignupLogin/PrivateRoute";
import "./index.css";

const App = () => {
  const { currentUser, role } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />   
          <Route path="/admin" element={<AdminPage />} />          
          {/* <Route
            path="/admin"
            element={
              <PrivateRoute role={["ADMIN"]}>
                <AdminPage />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/home"
            element={
              <PrivateRoute role={["USER"]}>
                <HomePage />
              </PrivateRoute>
            }
          />
          {/* <Route path="/" element={<Login />} /> */}
          
          {/* <Route path="/login" element={currentUser ? <Navigate to="/home" /> : <Login />} />          
          <Route path="/home" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route
            path="/admin"
            element={
              currentUser && role === "ADMIN" ? (
                <AdminPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}          
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
