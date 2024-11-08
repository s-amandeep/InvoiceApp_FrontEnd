import React, { useState, useEffect } from "react";
import NewProduct from "../Product/NewProduct";
import NewCustomer from "../Customer/NewCustomer";
import Invoice from "../Invoice/Invoice";
import InvoiceList from "../Invoice/InvoiceList";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import "./Styles.css";
import { jwtDecode } from "jwt-decode";

function HomePage() {
  const { logout, user} = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Welcome Guest");
  const [productTitle, setProductTitle] = useState("View Products");
  const [userRole, setUserRole] = useState("ROLE_USER"); // Initialize state for user role
  // const [selected, setSelected] = useState(null);

  // Handle logout action
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  useEffect(() => {
    // Retrieve user role from localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    const role = jwtDecode(jwtToken).roles[0];
    setUserRole(role);

    // Set the title based on the user role
  if (role === 'ROLE_ADMIN') {
    setTitle('Admin Dashboard');
    setProductTitle("Add or View Products");
  } else if (role === 'ROLE_USER') {
    setTitle('User Dashboard');
  }
    // } else {
    //   setTitle('Welcome Guest'); // Default case
    // }
  }, []);

  return (
    <div className="home-page" style={styles.container}>
      <header style={styles.header}>
        <h1>{title}</h1>
        <p>Welcome, {user ? user.name : "User"}!</p>
        {/* <button className="home-button" onClick={() => setSelected(null)}>
          Home
        </button> */}
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button> 
      </header>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2>Manage Products</h2>
          <button style={styles.button} onClick={() => navigate('/user/products')}>
            {productTitle}
          </button>
          {/* {userRole === 'ROLE_ADMIN' && <button style={styles.button} onClick={() => navigate('/add-product')}>
            Add Product
          </button>} */}
        </div>

        <div style={styles.card}>
          <h2>Manage Invoices</h2>
          <button style={styles.button} onClick={() => navigate('/user/invoices')}>
            View Invoices
          </button>
          <button style={styles.button} onClick={() => navigate('/user/add-invoice')}>
            Add Invoice
          </button>
        </div>

        <div style={styles.card}>
          <h2>Manage Customers</h2>
          <button style={styles.button} onClick={() => navigate('/user/customers')}>
            Add or View Customers
          </button>
        </div>
      </div>

      {user.role === "Admin" && (
        <div>
          <h3>Admin Controls</h3>
          <button>Add Content</button>
          <button>Edit Content</button>
          <button>Delete Content</button>
        </div>
      )}

      {user.role === "User" && (
        <div>
          <h3>User Controls</h3>
          <button>Add Content</button>
          {/* Additional user-specific actions */}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  card: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default HomePage;
