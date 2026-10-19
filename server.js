// server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.')); // Serves your static website files

// 1. Initialize SQLite Database (creates appointments.db file automatically)
const db = new sqlite3.Database('./appointments.db', (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to the SQLite database.');
});

// Create appointments table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// 2. Configure Email (Nodemailer - Example using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mabroukmohamedali09@gmail.com',         // Put your actual Gmail here
    pass: 'ixloczhjzxxytxzh'               // Put your 16-character App Password here (no spaces)
  }
});

// 3. Handle Booking Submission Route
app.post('/api/book', async (req, res) => {
  const { name, phone, service, message } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Save into SQLite Database
  const query = `INSERT INTO appointments (name, phone, service, message) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, phone, service, message || 'None'], async function(err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ success: false, error: 'Database save failed' });
    }

    const bookingId = this.lastID;
    console.log(`Appointment saved with ID: ${bookingId}`);

    // Send Email Notification
    const mailOptions = {
      from: 'mabroukmohamedali09@gmail.com',
      to: 'mabroukmohamedali09@gmail.com',  // Where you want to receive alerts
      subject: `New Booking: ${service} by ${name}`,
      text: `You have a new appointment!\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message || 'None'}`
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
    }

    // Send WhatsApp Notification (Using a service like CallMeBot or UltraMsg/Twilio)
    // Example using CallMeBot free API for personal WhatsApp:
    try {
      const whatsappPhone = 'YOUR_PHONE_NUMBER'; // e.g., 15551234567 (with country code)
      const apiKey = 'YOUR_CALLMEBOT_API_KEY';   // Get free from callmebot.com
      const text = encodeURIComponent(`✂️ New Booking!\nName: ${name}\nPhone: ${phone}\nService: ${service}\nNote: ${message || 'None'}`);
      
      await axios.get(`https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${text}&apikey=${apiKey}`);
    } catch (waErr) {
      console.error('WhatsApp notification failed:', waErr);
    }

    res.json({ success: true, message: 'Appointment booked successfully!' });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});