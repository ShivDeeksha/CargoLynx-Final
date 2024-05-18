import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const NotFound = () => {
    return (
        <div className="auth-container">
            <h2>Page Not Found</h2>
            <p>We couldn't find what you were looking for.</p>
            <Link to="/login">Go back to login</Link>
        </div>
    );
};

export default NotFound;
