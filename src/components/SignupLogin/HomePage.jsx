import React, { useState } from "react";
import NewProduct from "../Product/NewProduct";
import NewCustomer from "../Customer/NewCustomer";
import Invoice from "../Invoice/Invoice";
import InvoiceList from "../Invoice/InvoiceList";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.css";

function HomePage() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // Handle logout action
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) {
    return <div>Please log in to view this page.</div>;
  }

  const renderContent = () => {
    switch (selected) {
      case "invoices":
        return <Invoice />;
      case "invoiceList":
        return <InvoiceList />;
      case "products":
        return <NewProduct />;
      case "customers":
        return <NewCustomer />;
      default:
        return null;
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome, {currentUser ? currentUser.name : "User"}!</h1>
      <h2>Role: {currentUser.role}</h2>

      <div className="navbar">
        <button className="home-button" onClick={() => setSelected(null)}>
          Home
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      {selected === null ? (
        <div className="menu">
          <button onClick={() => setSelected("invoices")}>Invoice</button>
          <button onClick={() => setSelected("invoiceList")}>
            Invoice List
          </button>
          <button onClick={() => setSelected("products")}>Products</button>
          <button onClick={() => setSelected("customers")}>Customers</button>
        </div>
      ) : (
        <div className="content">{renderContent()}</div>
      )}
      {currentUser.role === "Admin" && (
        <div>
          <h3>Admin Controls</h3>
          <button>Add Content</button>
          <button>Edit Content</button>
          <button>Delete Content</button>
        </div>
      )}

      {currentUser.role === "User" && (
        <div>
          <h3>User Controls</h3>
          <button>Add Content</button>
          {/* Additional user-specific actions */}
        </div>
      )}
    </div>
  );
}

// }

export default HomePage;
