import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Auth.css';

const Logout = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="auth-container">
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
