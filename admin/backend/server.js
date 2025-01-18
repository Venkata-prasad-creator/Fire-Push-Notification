const express = require('express');
const cors = require('cors');
const app = express();

// Simplest CORS setup
app.use(cors());

// Parse JSON bodies
app.use(express.json());

app.post('/api/firebase/send-notification', async (req, res) => {
  try {
    console.log('Received notification request:', req.body);
    
    // Your notification logic here
    // ...
    res.status(200).json({ 
      success: true,
      message: 'Notification sent successfully',
      data: req.body 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to send notification',
      details: error.message 
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 