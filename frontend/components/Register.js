import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        role: 'user',
        name: '',
        username: '',
        email: '',
        password: '',
        phone_number: '',
        nationality: '',
        company_name: '',
        address: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', formData);
            alert('Registration successful! Please login.');
            history.push('/login');
        } catch (error) {
            console.error(error);
            alert('Registration failed! Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
                <input type="text" name="nationality" placeholder="Nationality" onChange={handleChange} required />
                <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
