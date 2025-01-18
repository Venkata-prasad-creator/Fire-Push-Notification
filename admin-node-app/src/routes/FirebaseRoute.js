const express = require('express');
const router = express.Router();
const FirebaseController = require('../controllers/FirebaseController');

router.post('/send-notification', FirebaseController.sendNotification);

module.exports = router;

