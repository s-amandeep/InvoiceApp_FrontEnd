import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./WelcomePage.css";

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <h1>Welcome to Zionique</h1>
            <div className="welcome-buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/signup')}>Signup</button>
            </div>
        </div>
    );
};

export default WelcomePage;
