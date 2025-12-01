import notificationService from './notificationService.js';

class GlobalNotifications {
  constructor() {
    this.setupGlobalHandlers();
  }

  setupGlobalHandlers() {
    // Configurar manejo de notificaciones en toda la app
    notificationService.setupForegroundMessages((payload) => {
      this.handleGlobalNotification(payload);
    });
  }

  handleGlobalNotification(payload) {
    // Mostrar notificación en cualquier vista
    const title = payload.notification?.title || 'MindU';
    const body = payload.notification?.body || 'Tienes una nueva notificación';
    
    // Puedes usar un bus de eventos o store para mostrar notificaciones UI
    this.dispatchNotificationEvent(title, body);
  }

  dispatchNotificationEvent(title, body) {
    // Disparar evento personalizado para que cualquier componente lo escuche
    const event = new CustomEvent('mindu-notification', {
      detail: { title, body }
    });
    window.dispatchEvent(event);
  }

  // Métodos para enviar notificaciones específicas
  async sendReminder(userId, message) {
    // Implementar envío de recordatorios desde el backend
  }

  async sendCrisisAlert(userId, resources) {
    // Implementar alertas de crisis
  }
}

export default new GlobalNotifications();