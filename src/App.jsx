import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/SignupLogin/Login";
import Signup from "./components/SignupLogin/Signup";
import HomePage from "./components/SignupLogin/HomePage";
import AdminPage from "./components/SignupLogin/AdminPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Login />;
};

const App = () => {
  // const { currentUser, role } = useAuth();

  return (
    <Router>
      <AuthProvider>
      <Routes>
      <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                {/* <ProductsPage /> */}
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <PrivateRoute>
                {/* <InvoicesPage /> */}
              </PrivateRoute>
            }
          />
        {/* <Route path="/login" element={currentUser ? <Navigate to="/home" /> : <Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/home" element={currentUser ? <HomePage /> : <Navigate to="/login" />} /> */}
        {/* <Route path="/admin" element={currentUser && role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
