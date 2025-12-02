// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/main.css";

import { auth, messaging, VAPID_KEY } from "./firebaseConfig";
import { onMessage, isSupported, getToken } from "firebase/messaging";

let app = null;

// Servicio de notificaciones mejorado
const notificationService = {
  // Manejar notificaciones en primer plano
  handleForegroundMessage(payload) {
    console.log("🔥 Notificación recibida en foreground:", payload);

    const title = payload?.notification?.title || "MindU";
    const body = payload?.notification?.body || "Tienes una nueva notificación";

    // Disparar evento global para que los componentes Vue lo capturen
    const event = new CustomEvent('mindu-notification', {
      detail: { title, body }
    });
    window.dispatchEvent(event);

    // También mostrar notificación nativa si está permitido
    if (Notification.permission === "granted") {
      try {
        new Notification(title, {
          body,
          icon: "/logo.png",
        });
      } catch (err) {
        console.error("Error mostrando notificación nativa:", err);
      }
    }
  },

  // Solicitar permiso de notificaciones y obtener token
  async requestPermission() {
    if (!("Notification" in window)) {
      console.warn("Este navegador no soporta notificaciones");
      return null;
    }

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        console.log("✅ Permiso de notificaciones concedido");
        
        // Obtener el token FCM
        const token = await getToken(messaging, { 
          vapidKey: VAPID_KEY 
        });
        
        console.log("🔑 Token FCM obtenido:", token);
        
        // Guardar el token en tu backend o localStorage
        await this.saveTokenToStorage(token);
        
        return token;
      } else {
        console.log("❌ Permiso de notificaciones denegado");
        return null;
      }
    } catch (error) {
      console.error("Error solicitando permiso:", error);
      return null;
    }
  },

  // Guardar token en localStorage (puedes enviarlo a tu backend después)
  async saveTokenToStorage(token) {
    try {
      localStorage.setItem('fcm_token', token);
      console.log("💾 Token guardado en localStorage");
      
    } catch (error) {
      console.error("Error guardando token:", error);
    }
  },

  // Verificar estado actual de permisos
  getPermissionStatus() {
    if (!("Notification" in window)) {
      return "unsupported";
    }
    return Notification.permission;
  },

  // Obtener token actual si existe
  async getCurrentToken() {
    try {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      return token;
    } catch (error) {
      console.error("Error obteniendo token:", error);
      return null;
    }
  }
};

// Registra el Service Worker
async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker no soportado en este navegador.");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("✅ Service Worker registrado:", registration.scope);
    return registration;
  } catch (err) {
    console.error("❌ Error al registrar Service Worker:", err);
    return null;
  }
}

// Manejo de notificaciones en primer plano
async function configurarNotificacionesForeground() {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("⚠️ FCM no soportado en este navegador.");
      return;
    }

    // Listener para mensajes cuando la web está en primer plano
    onMessage(messaging, (payload) => {
      notificationService.handleForegroundMessage(payload);
    });

    console.log("✅ Notificaciones foreground configuradas");

  } catch (error) {
    console.error("Error configurando notificaciones foreground:", error);
  }
}

// Inicializar la aplicación
async function initializeApp() {
  // Registrar SW primero
  await registerServiceWorker();

  // Crear app y montar
  app = createApp(App);
  app.use(router);
  app.mount("#app");

  // Configurar la escucha de notificaciones en primer plano
  await configurarNotificacionesForeground();

  console.log("🚀 App montada y FCM configurado");
}

// Hacer el servicio de notificaciones disponible globalmente
window.minduNotifications = notificationService;

// Esperamos a Firebase Auth antes de montar la app
auth.onAuthStateChanged(async (user) => {
  if (!app) {
    await initializeApp();
  }

  

  // Manejar sistema de notificaciones programadas
  // En tu main.js, reemplaza esta parte:
try {
  // Importación dinámica para evitar errores si el archivo no existe
  const scheduledNotificationsModule = await import('./services/scheduledNotifications.js');
  const scheduledNotifications = scheduledNotificationsModule.default;
  
  if (user) {
    // Usuario autenticado - iniciar sistema de notificaciones
    console.log('👤 Usuario autenticado, iniciando notificaciones programadas...');
    setTimeout(() => {
      scheduledNotifications.start();
    }, 3000);
  } else {
    // Usuario no autenticado - detener sistema
    console.log('👤 Usuario no autenticado, deteniendo notificaciones...');
    scheduledNotifications.stop();
  }
} catch (error) {
  console.warn('⚠️ No se pudo cargar el sistema de notificaciones programadas:', error.message);
  console.log('💡 Crea el archivo src/services/scheduledNotifications.js para activar esta función');
  
  // Usar servicio de respaldo
  const { createFallbackNotificationService } = await import('./services/fallbackNotifications.js');
  const fallbackService = createFallbackNotificationService();
  
  if (user) {
    setTimeout(() => {
      fallbackService.start();
    }, 3000);
  }
}
});