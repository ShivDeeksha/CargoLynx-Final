import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';
import './Profile.css';

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/users', {
                    headers: { Authorization: `Bearer ${auth.accessToken}` }
                });
                setUserData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, [auth.accessToken]);

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <img src="/static-image.jpg" alt="Profile" />
            {userData.map((user) => (
                <div key={user.id} className="profile-info">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phone_number}</p>
                    <p><strong>Nationality:</strong> {user.nationality}</p>
                    <p><strong>Company Name:</strong> {user.company_name}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                </div>
            ))}
        </div>
    );
};

export default Profile;
