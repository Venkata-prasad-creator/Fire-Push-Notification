const admin = require("firebase-admin");
const path = require('path');

// Use path.join for cross-platform compatibility
const serviceAccount = require(path.join(__dirname, 'firebaseAdminSDK.json'));

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://pushnotification-9df04-default-rtdb.firebaseio.com"
    });
} catch (error) {
    console.error('Firebase initialization error:', error);
}

module.exports = admin;