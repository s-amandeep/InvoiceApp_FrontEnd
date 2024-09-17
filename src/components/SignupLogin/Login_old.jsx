import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext_old';

const Login = () => {
    const { login } = useAuth();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // API call for login
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                mobile,
                password
            });
            login(response.data.user, response.data.role);
          } catch (error) {
            setError('Login failed. Please try again.');
          }

        // try {
        //     const response = await axios.post('http://localhost:8080/api/auth/login', {
        //         mobile,
        //         password
        //     });
        //     if (response.data.success) {
        //         login(response.data.user, response.data.role);
        //         // const userRole = response.data.role;            
        //         // if (userRole === 'ADMIN') {
        //         //     navigate('/admin-dashboard');
        //         // } else {
        //         //     navigate('/user-dashboard');
        //         // }
        //     } else {
        //         setError(response.data.message);
        //     }
        // } catch (err) {
        //     console.error(err);
        //     setError('Invalid login credentials.');
        // }
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
};

export default Login;
