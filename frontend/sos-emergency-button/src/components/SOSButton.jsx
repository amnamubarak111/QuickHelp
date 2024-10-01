import React, { useState } from 'react';
import axios from 'axios';
import './SOSButton.css';

function SOSButton() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSOSClick = () => {
        if (!navigator.geolocation) {
            setMessage('Geolocation is not supported by your browser.');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(success, error);
    };

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        axios.post('http://localhost:5000/api/sos', {
            latitude,
            longitude
        })
        .then(response => {
            console.log(response)
            setMessage('Emergency alert sent successfully!');
            setLoading(false);
        })
        .catch(error => {
            setMessage('Failed to send emergency alert.');
            setLoading(false);
        });
    };

    const error = () => {
        setMessage('Unable to retrieve your location.');
        setLoading(false);
    };

    return (
        <div className="sos-container">
            <button className="sos-button" onClick={handleSOSClick} disabled={loading}>
                {loading ? 'Sending...' : 'SOS'}
            </button>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default SOSButton;