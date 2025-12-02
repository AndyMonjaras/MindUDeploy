import { db } from '@/services/firebaseConfig';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit,
  updateDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

class SchedulingService {
  constructor() {
    this.functions = getFunctions();
    
    // Conectar con emulador en desarrollo
    if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
      connectFunctionsEmulator(this.functions, '127.0.0.1', 5001);
      console.log('🔗 Conectado a Functions Emulator');
    }
  }
  
  // Agendar nueva cita/notificación
  async scheduleAppointment(appointmentData) {
    try {
      const { title, body, scheduledTime } = appointmentData;
      
      console.log('📅 Intentando agendar:', { title, body, scheduledTime });
      
      // Usar Cloud Function para agendar
      const scheduleNotification = httpsCallable(this.functions, 'scheduleNotification');
      
      const result = await scheduleNotification({
        title: title || 'Recordatorio de MindU',
        body: body || 'Es hora de tu sesión programada',
        scheduledTime: scheduledTime.toISOString(),
        type: 'appointment'
      });
      
      console.log('✅ Cita agendada:', result.data);
      return result.data;
      
    } catch (error) {
      console.error('❌ Error agendando cita:', error);
      throw new Error(error.message || 'Error al agendar la cita');
    }
  }

  // Verificar disponibilidad de horario
  async checkTimeAvailability(userId, scheduledTime) {
    try {
      // Buscar notificaciones en la misma hora (±30 mins)
      const startTime = new Date(scheduledTime.getTime() - 30 * 60 * 1000);
      const endTime = new Date(scheduledTime.getTime() + 30 * 60 * 1000);
      
      const q = query(
        collection(db, 'scheduled_notifications'),
        where('userId', '==', userId),
        where('scheduledTime', '>=', startTime),
        where('scheduledTime', '<=', endTime),
        where('status', 'in', ['pending', 'sent'])
      );
      
      const snapshot = await getDocs(q);
      const available = snapshot.empty;
      
      console.log(`📅 Disponibilidad para ${scheduledTime}: ${available ? 'DISPONIBLE' : 'OCUPADO'}`);
      return available;
      
    } catch (error) {
      console.error('❌ Error verificando disponibilidad:', error);
      return false;
    }
  }

  // Obtener citas del usuario
  async getUserAppointments(userId, limitCount = 10) {
    try {
      const q = query(
        collection(db, 'scheduled_notifications'),
        where('userId', '==', userId),
        orderBy('scheduledTime', 'desc'),
        limit(limitCount)
      );
      
      const snapshot = await getDocs(q);
      const appointments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log(`📋 Citas obtenidas: ${appointments.length}`);
      return appointments;
      
    } catch (error) {
      console.error('❌ Error obteniendo citas:', error);
      return [];
    }
  }

  // Cancelar cita
  async cancelAppointment(notificationId) {
    try {
      await updateDoc(doc(db, 'scheduled_notifications', notificationId), {
        status: 'cancelled',
        cancelledAt: serverTimestamp()
      });
      
      console.log('✅ Cita cancelada:', notificationId);
      return { success: true, message: 'Cita cancelada exitosamente' };
      
    } catch (error) {
      console.error('❌ Error cancelando cita:', error);
      throw new Error('Error al cancelar la cita');
    }
  }
}

export default new SchedulingService();