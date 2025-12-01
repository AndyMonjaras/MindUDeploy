// Servicio de respaldo para cuando scheduledNotifications no existe
export const createFallbackNotificationService = () => ({
  start() {
    console.log('⚠️ Usando servicio de notificaciones de respaldo');
    console.log('💡 Crea src/services/scheduledNotifications.js para funciones completas');
  },
  stop() {
    console.log('🛑 Servicio de notificaciones detenido (respaldo)');
  },
  async scheduleNotification() {
    throw new Error('Servicio de notificaciones no disponible');
  },
  async getUserScheduledNotifications() {
    return [];
  }
});

export default createFallbackNotificationService();