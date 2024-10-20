import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
      };

    return (
        <nav>
            {user && (
                <>
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
