import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import userGroupService from './userGroupService';

class ScheduledNotificationsService {
  constructor() {
    this._db = null;
    this._auth = null;
    this.checkInterval = null;
  }

  // Getters lazy para inicialización bajo demanda
  get db() {
    if (!this._db) {
      this._db = getFirestore();
    }
    return this._db;
  }

  get auth() {
    if (!this._auth) {
      this._auth = getAuth();
    }
    return this._auth;
  }

  // Iniciar sistema solo si el usuario tiene notificaciones habilitadas
  async start() {
    console.log('🕐 Iniciando sistema de notificaciones programadas...');
    
    try {
      const hasNotifications = await userGroupService.hasNotificationsEnabled();
      
      if (hasNotifications) {
        console.log('🔔 Notificaciones habilitadas para este usuario');
        this.startNotificationSystem();
      } else {
        console.log('🔕 Notificaciones deshabilitadas para este grupo');
      }
    } catch (error) {
      console.error('❌ Error verificando permisos de notificaciones:', error);
    }
  }

  startNotificationSystem() {
    // Verificar cada 30 segundos
    this.checkInterval = setInterval(() => {
      this.checkSimulatedNotifications();
    }, 30000);

    // Verificar inmediatamente
    this.checkSimulatedNotifications();
    
    console.log('✅ Sistema de notificaciones iniciado');
  }

  async checkSimulatedNotifications() {
    const user = this.auth.currentUser;
    if (!user) {
      console.log('👤 No hay usuario autenticado');
      return;
    }

    try {
      // Verificar nuevamente si tiene notificaciones habilitadas
      const hasNotifications = await userGroupService.hasNotificationsEnabled();
      if (!hasNotifications) {
        console.log('🔕 Usuario sin permisos de notificaciones');
        this.stop();
        return;
      }

      const now = new Date();
      console.log(`🔍 [SIMULACIÓN] Buscando notificaciones para: ${now.toLocaleTimeString()}`);

      const q = query(
        collection(this.db, 'scheduled_notifications'),
        where('userId', '==', user.uid),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(q);
      
      console.log(`📨 [SIMULACIÓN] Encontradas ${snapshot.size} notificaciones pendientes`);

      // Filtrar manualmente por fecha (para evitar índices complejos)
      const pendingNotifications = snapshot.docs.filter(docSnap => {
        const notification = docSnap.data();
        const scheduledTime = notification.scheduledTime?.toDate?.() || new Date(notification.scheduledTime);
        return scheduledTime <= now;
      });

      console.log(`⏰ [SIMULACIÓN] ${pendingNotifications.length} notificaciones listas para enviar`);

      for (const docSnap of pendingNotifications) {
        const notification = docSnap.data();
        await this.triggerSimulatedNotification(docSnap.id, notification);
      }

    } catch (error) {
      console.error('❌ Error en simulación:', error);
    }
  }

  async triggerSimulatedNotification(docId, notification) {
    try {
      console.log(`🎯 [SIMULACIÓN] Disparando notificación: ${notification.title}`);

      // Mostrar notificación toast
      this.showToastNotification(notification);

      // Actualizar estado a "sent"
      await updateDoc(doc(this.db, 'scheduled_notifications', docId), {
        status: 'sent',
        sentAt: new Date()
      });

      // Registrar en user_sessions
      await addDoc(collection(this.db, 'user_sessions'), {
        userId: notification.userId,
        notificationId: docId,
        sessionTime: notification.scheduledTime,
        status: 'completed',
        createdAt: new Date(),
        notificationData: {
          title: notification.title,
          body: notification.body,
          type: notification.type
        },
        grupo: (await userGroupService.getUserProfile())?.grupo || 'unknown',
        isSimulated: true
      });

      console.log(`✅ [SIMULACIÓN] Notificación procesada: ${docId}`);

    } catch (error) {
      console.error(`❌ Error en notificación simulada ${docId}:`, error);
    }
  }

  // Mostrar toast notification
  showToastNotification(notification) {
    const event = new CustomEvent('mindu-toast', {
      detail: {
        title: notification.title,
        message: notification.body,
        type: this.getToastType(notification.type),
        duration: 6000
      }
    });
    window.dispatchEvent(event);
  }

  getToastType(notificationType) {
    const typeMap = {
      'meditation': 'success',
      'reminder': 'info',
      'session': 'warning',
      'crisis': 'error',
      'test': 'info'
    };
    return typeMap[notificationType] || 'info';
  }

  // Programar nueva notificación
  async scheduleNotification(notificationData) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    try {
      // Verificar si pertenece al grupo con notificaciones
      const hasNotifications = await userGroupService.hasNotificationsEnabled();
      if (!hasNotifications) {
        throw new Error('Tu grupo no tiene habilitadas las notificaciones programadas');
      }

      const notification = {
        userId: user.uid,
        title: notificationData.title,
        body: notificationData.body,
        scheduledTime: notificationData.scheduledTime,
        status: 'pending',
        type: notificationData.type || 'reminder',
        createdAt: new Date(),
        grupo: (await userGroupService.getUserProfile())?.grupo || 'unknown'
      };

      const docRef = await addDoc(collection(this.db, 'scheduled_notifications'), notification);
      
      console.log(`📅 Notificación programada: ${docRef.id} para ${notificationData.scheduledTime}`);
      
      // Mostrar toast de confirmación
      this.showToastNotification({
        title: '📅 Recordatorio Programado',
        body: `Notificación programada para ${new Date(notificationData.scheduledTime).toLocaleTimeString()}`,
        type: 'success'
      });

      return {
        success: true,
        notificationId: docRef.id,
        message: 'Notificación programada exitosamente'
      };

    } catch (error) {
      console.error('❌ Error programando notificación:', error);
      throw error;
    }
  }

  // Obtener notificaciones programadas del usuario
  async getUserScheduledNotifications() {
    const user = this.auth.currentUser;
    if (!user) return [];

    try {
      const q = query(
        collection(this.db, 'scheduled_notifications'),
        where('userId', '==', user.uid),
        where('status', '==', 'pending')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    } catch (error) {
      console.error('❌ Error obteniendo notificaciones:', error);
      return [];
    }
  }

  // Cancelar notificación
  async cancelScheduledNotification(notificationId) {
    try {
      await updateDoc(doc(this.db, 'scheduled_notifications', notificationId), {
        status: 'cancelled',
        cancelledAt: new Date()
      });
      console.log(`❌ Notificación cancelada: ${notificationId}`);
    } catch (error) {
      console.error('❌ Error cancelando notificación:', error);
      throw error;
    }
  }

  // SIMULACIÓN RÁPIDA - Para testing
  async simulateQuickNotification() {
    const user = this.auth.currentUser;
    if (!user) return;

    const scheduledTime = new Date(Date.now() + 5000); // 5 segundos

    return await this.scheduleNotification({
      title: '🧪 Notificación de Prueba',
      body: 'Esta es una notificación simulada de MindU',
      scheduledTime: scheduledTime,
      type: 'test'
    });
  }

  // Detener sistema
  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('🛑 Sistema de notificaciones detenido');
    }
  }
}

export default new ScheduledNotificationsService();