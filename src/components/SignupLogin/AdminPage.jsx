// src/pages/AdminPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Welcome, {currentUser?.name || 'Admin'}!</p>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2>Manage Products</h2>
          <button style={styles.button} onClick={() => navigate('/products')}>
            View Products
          </button>
          <button style={styles.button} onClick={() => navigate('/add-product')}>
            Add Product
          </button>
        </div>

        <div style={styles.card}>
          <h2>Manage Invoices</h2>
          <button style={styles.button} onClick={() => navigate('/invoices')}>
            View Invoices
          </button>
        </div>

        <div style={styles.card}>
          <h2>Manage Users</h2>
          <button style={styles.button} onClick={() => navigate('/users')}>
            View Users
          </button>
        </div>
      </div>
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

export default AdminPage;
