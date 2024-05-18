import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ accessToken: '', refreshToken: '' });
    const history = useHistory();

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        if (storedAuth) {
            setAuth(storedAuth);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            setAuth(response.data);
            localStorage.setItem('auth', JSON.stringify(response.data));
            history.push('/profile');
        } catch (error) {
            console.error(error);
            alert('Invalid email or password');
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout', {}, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });
            setAuth({ accessToken: '', refreshToken: '' });
            localStorage.removeItem('auth');
            history.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
