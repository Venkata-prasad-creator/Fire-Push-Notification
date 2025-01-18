const admin = require('../firebase');

class NotificationService {
    static async sendNotification(deviceToken, title, body) {
        const message = {
            notification: {
                title,
                body
            },
            token: deviceToken
        };
        try {
            const response = await admin.messaging().send(message);
            return response;
        } catch (error) {
            console.error('Notification error:', error);
            throw error;
        }
    }
};    

module.exports = NotificationService;
