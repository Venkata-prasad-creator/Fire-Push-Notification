import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyATAa3Mtv4jcpyJo_WHA9NjKsAbjipujSo",
    authDomain: "pushnotification-9df04.firebaseapp.com",
    projectId: "pushnotification-9df04",
    storageBucket: "pushnotification-9df04.appspot.com",
    messagingSenderId: "75710409038",
    appId: "1:75710409038:web:e7c07f2492829259cc961f",
    measurementId:"G-9QQTPFQVEC"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const VAPID_KEY = "BB00PRlqp-usr7Z1eGlCwxBxQvGnApjCGxlbmGGJ1Y11uA96tGddPo5Yw8eL7x6L1xeh31IyepKtwETt8RFfUr0";

export const requestFCMToken = async () => {
  try {
    if (!('Notification' in window)) {
      const error = new Error('This browser does not support desktop notifications');
      error.type = 'NOTIFICATIONS_UNSUPPORTED';
      throw error;
    }

    let permission = Notification.permission;
    
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission !== 'granted') {
      const error = new Error('Notifications are blocked');
      error.type = 'NOTIFICATIONS_BLOCKED';
      error.instructions = getBrowserInstructions();
      throw error;
    }

    try {
      const currentToken = await getToken(messaging, {
        vapidKey: VAPID_KEY
      });
      
      if (!currentToken) {
        const error = new Error('No registration token available');
        error.type = 'TOKEN_MISSING';
        throw error;
      }

      return currentToken;
    } catch (tokenError) {
      console.error('Token Error:', tokenError);
      const error = new Error(tokenError.message || 'Failed to get notification token');
      error.type = 'TOKEN_ERROR';
      error.originalError = tokenError;
      throw error;
    }
  } catch (err) {
    // Create a structured error object for logging
    const errorInfo = {
      type: err.type || 'UNKNOWN_ERROR',
      message: err.message || 'Unknown error occurred',
      stack: err.stack,
      instructions: err.instructions
    };

    // Log the structured error
    console.error('Notification setup error:', errorInfo);

    // Rethrow the original error
    throw err;
  }
};

function getBrowserInstructions() {
  if (navigator.userAgent.includes('Chrome')) {
    return [
      'Click the lock icon (🔒) in the address bar',
      'Select "Site Settings"',
      'Find "Notifications"',
      'Change setting to "Allow"',
      'Refresh the page'
    ];
  } else if (navigator.userAgent.includes('Firefox')) {
    return [
      'Click the lock icon (🔒) in the address bar',
      'Clear the notification setting',
      'Refresh the page',
      'Accept the notification prompt'
    ];
  } else if (navigator.userAgent.includes('Safari')) {
    return [
      'Open Safari Preferences',
      'Go to "Websites" tab',
      'Select "Notifications"',
      'Find this website and select "Allow"',
      'Refresh the page'
    ];
  } else {
    return [
      'Open your browser settings',
      'Find notification settings',
      'Allow notifications for this site',
      'Refresh the page'
    ];
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });