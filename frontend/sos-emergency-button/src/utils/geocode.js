// utils/geocode.js

const axios = require('axios');

async function getAddress(latitude, longitude) {
    try {
        const apiKey = process.env.GEOCODING_API_KEY; // Store your API key in .env
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                latlng: `${latitude},${longitude}`,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const address = response.data.results[0].formatted_address;
            return address;
        } else {
            console.error('Geocoding API error:', response.data.status);
            return 'Location not available';
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        return 'Location not available';
    }
}

module.exports = getAddress;