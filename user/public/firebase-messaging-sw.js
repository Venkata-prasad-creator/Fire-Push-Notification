importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyATAa3Mtv4jcpyJo_WHA9NjKsAbjipujSo",
    authDomain: "pushnotification-9df04.firebaseapp.com",
    projectId: "pushnotification-9df04",
    storageBucket: "pushnotification-9df04.appspot.com",
    messagingSenderId: "75710409038",
    appId: "1:75710409038:web:e7c07f2492829259cc961f",
    measurementId:"G-9QQTPFQVEC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
