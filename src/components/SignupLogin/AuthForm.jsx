// src/components/AuthForm.js
import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = ({ type, onSubmit }) => {
    const [credentials, setCredentials] = useState({
        name: '',
        mobile: '',
        password: '',
        role: 'ROLE_USER', // Default role set to 'user'
    });

    // Handle input changes
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(credentials);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>{type === 'login' ? 'Login' : 'Signup'}</h2>
            {type === 'signup' && (
                <>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={credentials.name}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        value={credentials.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </>
            )}
            <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={credentials.mobile}
                onChange={handleChange}
                required
                maxLength={10}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            <button type="submit">{type === 'login' ? 'Login' : 'Signup'}</button>
        </form>
    );
};

export default AuthForm;