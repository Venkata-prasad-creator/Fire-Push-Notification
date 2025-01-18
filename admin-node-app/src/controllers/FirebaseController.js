const NotificationService = require('../Util/service/NotificationService');

class FirebaseController {
    static async sendNotification(req, res) {
        try {
            const { deviceToken, title, body } = req.body;
            
            if (!deviceToken || !title || !body) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required parameters: deviceToken, title, or body'
                });
            }

            const response = await NotificationService.sendNotification(deviceToken, title, body);
            
            return res.status(200).json({
                success: true,
                message: 'Notification sent successfully',
                data: response
            });
        } catch (error) {
            console.error('Controller error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to send notification',
                error: error.message
            });
        }
    }
}

module.exports = FirebaseController;
