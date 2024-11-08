import React, { useContext } from "react";
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
import Unauthorized from "./components/SignupLogin/Unauthorized";
import NewProduct from "./components/Product/NewProduct";
import NewCustomer from "./components/Customer/NewCustomer";
import Invoice from "./components/Invoice/Invoice";
import InvoiceList from "./components/Invoice/InvoiceList";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/SignupLogin/PrivateRoute";
// import setupAxiosInterceptors from "./utils/auth-interceptor";
import Navbar from "./components/Navbar";
import "./index.css";

const App = () => {
  // const { token } = useAuth();

  // setupAxiosInterceptors(token);

  return (
    <AuthProvider>
      <Router>
      <Navbar />        
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/user/products" element={<NewProduct />} />
          <Route path="/user/customers" element={<NewCustomer />} />
          <Route path="/user/invoices" element={<InvoiceList />} />
          <Route path="/user/add-invoice" element={<Invoice />} />
          <Route path="/admin/add-product" element={<NewProduct />} />
          
          {/* <Route
            path="/admin"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <AdminPage />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/home"
            element={
              <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
