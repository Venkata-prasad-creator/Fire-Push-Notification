const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const bodyParser = require('body-parser');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const firebaseRoute = require('./src/routes/FirebaseRoute');
app.use('/api/firebase', firebaseRoute);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Test the notification endpoint at: http://localhost:${PORT}/api/firebase/send-notification`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});

