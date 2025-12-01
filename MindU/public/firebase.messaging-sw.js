// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBti3-fgWE0hupZ4Jqy0_ZMOQWgF--df2M",
  authDomain: "mindu-91138.firebaseapp.com",
  projectId: "mindu-91138",
  storageBucket: "mindu-91138.firebasestorage.app",
  messagingSenderId: "154559506405",
  appId: "1:154559506405:web:31ee16fc3ef71f22c0310c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[Service Worker] Notificación recibida:', payload);
  
  const notificationTitle = payload.notification?.title || "MindU";
  const notificationOptions = {
    body: payload.notification?.body || "Tienes una nueva notificación",
    icon: "/logo.png",
    badge: "/logo.png"
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});