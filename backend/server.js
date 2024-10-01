// backend/server.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a transporter object using SMTP transport with App Password
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.pass
  },
});

// Verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Error configuring Nodemailer transporter:', error);
    } else {
        console.log('Nodemailer transporter is ready to send emails');
    }
});

// API Endpoint
app.post('/api/sos', async (req, res) => {
    const { latitude, longitude } = req.body;

    const mailOptions = {
      from: 'aliamna1695@gmail.com',
      to: 'amna@ridewithshare.com',
      subject: 'Emergency Alert 🚨',
      text: `Emergency! I need help.
  
  My current location:
  Latitude: ${latitude}
  Longitude: ${longitude}
  
  Please assist me immediately.`,
      html: `
          
          <p>Emergency! I need help.</p>
          <p><strong>My current location:</strong></p>
          <ul>
              <li>Latitude: ${latitude}</li>
              <li>Longitude: ${longitude}</li>
          </ul>
          <p>
              <a href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" target="_blank">
                  View Location on Google Maps
              </a>
          </p>
          <p>Please assist me immediately.</p>
      `,
  };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Emergency alert sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.', error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});