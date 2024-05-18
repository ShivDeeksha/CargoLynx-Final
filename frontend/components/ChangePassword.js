import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';
import './Auth.css';

const ChangePassword = () => {
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        old_password: '',
        new_password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/change-password', formData, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });
            alert('Password changed successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to change password! Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="old_password"
                    placeholder="Old Password"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
