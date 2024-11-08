import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../utils/auth-interceptor";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
// import AuthContext from '../../context/AuthContext';

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, logout } = useAuth();
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post(
        // "http://localhost:8080/api/auth/login",
        "/auth/login",
        {
          mobile,
          password,
        }
      );
      console.log(response);
      const jwtToken = response.data.token;

      login(jwtToken);

      const userRole = jwtDecode(jwtToken).roles[0]; // Assuming roles is an array ------- CHECK HERE, IT MIGHT NOT BE ARRAY
      console.log(userRole);
      if (userRole === "ROLE_ADMIN" || userRole === "ROLE_USER") {
        navigate("/home");      
      // } else if (userRole === "ROLE_USER") {
      //   navigate("/home");
      } else {
        setError("Invalid role");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            maxLength="10"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
