const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Inicializar Firebase Admin con configuración de emulador
if (process.env.FUNCTIONS_EMULATOR) {
  console.log('🚀 Ejecutando en modo emulador');
  admin.initializeApp({
    projectId: 'mindu-91138'
  });
} else {
  admin.initializeApp();
}

// Función para agendar notificación
exports.scheduleNotification = functions.https.onCall(async (data, context) => {
  console.log('📅 Recibiendo solicitud de agendamiento:', data);
  
  // Verificar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }

  const { title, body, scheduledTime } = data;
  const userId = context.auth.uid;

  try {
    const db = admin.firestore();
    
    // Verificar que no exista notificación duplicada
    const existingQuery = await db
      .collection('scheduled_notifications')
      .where('userId', '==', userId)
      .where('scheduledTime', '==', new Date(scheduledTime))
      .where('status', 'in', ['pending', 'sent'])
      .get();

    if (!existingQuery.empty) {
      throw new functions.https.HttpsError(
        'already-exists', 
        'Ya existe una notificación programada para esta fecha y hora'
      );
    }

    // Crear la notificación programada
    const notificationRef = await db.collection('scheduled_notifications').add({
      userId: userId,
      title: title || 'Recordatorio de MindU',
      body: body || 'Es hora de tu sesión programada',
      scheduledTime: new Date(scheduledTime),
      status: 'pending',
      type: 'appointment',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: new Date(new Date(scheduledTime).getTime() + 30 * 60 * 1000)
    });

    console.log(`✅ Notificación programada: ${notificationRef.id}`);
    
    return {
      success: true,
      notificationId: notificationRef.id,
      message: 'Notificación programada exitosamente'
    };
    
  } catch (error) {
    console.error('❌ Error programando notificación:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Función de prueba que se ejecuta cada minuto
exports.scheduledNotifications = functions.pubsub
  .schedule('* * * * *') // Cada minuto
  .timeZone('America/Mexico_City')
  .onRun(async (context) => {
    console.log('⏰ Ejecutando verificación de notificaciones programadas');
    
    try {
      const db = admin.firestore();
      
      const now = new Date();
      const notifications = await db
        .collection('scheduled_notifications')
        .where('status', '==', 'pending')
        .where('scheduledTime', '<=', now)
        .get();

      console.log(`📨 Notificaciones pendientes encontradas: ${notifications.size}`);

      for (const doc of notifications.docs) {
        const notification = doc.data();
        console.log(`🔔 Procesando notificación: ${notification.title}`);
        
        // Simular envío de notificación
        console.log(`📤 ENVIANDO NOTIFICACIÓN: "${notification.title}" - "${notification.body}"`);
        
        // Marcar como enviada
        await doc.ref.update({
          status: 'sent',
          sentAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Registrar en sesiones
        await db.collection('user_sessions').add({
          userId: notification.userId,
          notificationId: doc.id,
          sessionTime: notification.scheduledTime,
          status: 'completed',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      
    } catch (error) {
      console.error('❌ Error en scheduledNotifications:', error);
    }
    
    return null;
  });