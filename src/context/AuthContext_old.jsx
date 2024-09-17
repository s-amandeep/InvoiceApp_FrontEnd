import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [users, setUsers] = useState([]); // List of registered users
  const [currentUser, setCurrentUser] = useState(null); // Logged-in user
  const [role, setRole] = useState(null); // For setting admin or user role
//   const navigate = useNavigate();

  // Signup function
  const signup = ({ name, mobile, password, role }) => {
    // Validate mobile number (exactly 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return {
        success: false,
        message: "Mobile number must be exactly 10 digits.",
      };
    }

    // Check if mobile number is already registered
    const existingUser = users.find((user) => user.mobile === mobile);
    if (existingUser) {
      return {
        success: false,
        message: "Mobile number is already registered.",
      };
    }

    // Add new user to the users array
    const newUser = { name, mobile, password, role };
    setUsers([...users, newUser]);

    // Return success message
    return { success: true, message: "Signup successful. Please login." };
  };

  // Login function
  //   const login = ({ mobile, password }) => {
  const login = (userData, userRole) => {
    // Validate mobile number (exactly 10 digits)
    // const mobile = userData.mobile;
    // const password = userData.password;
    // const name = userData.name;
    // const mobileRegex = /^\d{10}$/;
    // if (!mobileRegex.test(mobile)) {
    //   return {
    //     success: false,
    //     message: "Mobile number must be exactly 10 digits.",
    //   };
    // }

    // Find user by mobile number
    const user = users.find((user) => user.mobile === mobile);

    if (!user) {
      return { success: false, message: "Mobile number not found." };
    }

    if (user.password !== password) {
      return { success: false, message: "Incorrect password." };
    }
    console.log(user);

    // Set authentication state
    // setIsAuthenticated(true);
    setCurrentUser(userData);
    setRole(userRole);
    // if (userRole === "ADMIN") {
    //   navigate("/admin-dashboard");
    // } else {
    //   navigate("/user-dashboard");
    // }

    // Return success message
    return { success: true, message: "Login successful." };
  };

  // Logout function
  const logout = () => {
    // setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
    //   value={{ isAuthenticated, signup, login, logout, currentUser }}
      value={{ signup, login, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
