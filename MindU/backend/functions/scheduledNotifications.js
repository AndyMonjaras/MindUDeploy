const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Función que se ejecuta cada minuto para verificar notificaciones pendientes
exports.checkScheduledNotifications = functions.pubsub
  .schedule('* * * * *') // Cada minuto
  .timeZone('America/Mexico_City')
  .onRun(async (context) => {
    const now = new Date();
    console.log(`🔍 Buscando notificaciones para: ${now}`);
    
    try {
      const db = admin.firestore();
      
      // Buscar notificaciones pendientes cuyo scheduledTime ya pasó
      const notificationsSnapshot = await db
        .collection('scheduled_notifications')
        .where('status', '==', 'pending')
        .where('scheduledTime', '<=', now)
        .get();

      console.log(`📨 Encontradas ${notificationsSnapshot.size} notificaciones pendientes`);

      const promises = notificationsSnapshot.docs.map(async (doc) => {
        const notification = doc.data();
        
        try {
          // 1. Enviar notificación FCM
          await sendFCMNotification(notification);
          
          // 2. Actualizar estado a "sent"
          await doc.ref.update({
            status: 'sent',
            sentAt: new Date()
          });
          
          // 3. Registrar en user_sessions
          await db.collection('user_sessions').add({
            userId: notification.userId,
            notificationId: doc.id,
            sessionTime: notification.scheduledTime,
            status: 'completed',
            createdAt: new Date(),
            notificationData: {
              title: notification.title,
              body: notification.body
            }
          });
          
          console.log(`✅ Notificación enviada: ${doc.id}`);
          
        } catch (error) {
          console.error(`❌ Error enviando notificación ${doc.id}:`, error);
          await doc.ref.update({ status: 'failed' });
        }
      });

      await Promise.all(promises);
      console.log('🎯 Procesamiento de notificaciones completado');
      
    } catch (error) {
      console.error('❌ Error en checkScheduledNotifications:', error);
    }
    
    return null;
  });

// Función para enviar notificación FCM
async function sendFCMNotification(notification) {
  try {
    // Obtener el token FCM del usuario
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(notification.userId)
      .get();
    
    if (!userDoc.exists) {
      throw new Error('Usuario no encontrado');
    }
    
    const userData = userDoc.data();
    const fcmToken = userData.fcmToken;
    
    if (!fcmToken) {
      throw new Error('Usuario no tiene token FCM');
    }

    const message = {
      token: fcmToken,
      notification: {
        title: notification.title,
        body: notification.body
      },
      data: {
        type: 'scheduled_notification',
        notificationId: notification.id,
        click_action: 'FLUTTER_NOTIFICATION_CLICK'
      },
      android: {
        notification: {
          sound: 'default',
          priority: 'high'
        }
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1
          }
        }
      }
    };

    const response = await admin.messaging().send(message);
    console.log(`📤 Notificación FCM enviada: ${response}`);
    return response;
    
  } catch (error) {
    console.error('❌ Error enviando FCM:', error);
    throw error;
  }
}

// Función para agendar nueva notificación
exports.scheduleNotification = functions.https.onCall(async (data, context) => {
  // Verificar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
  }

  const { title, body, scheduledTime, type = 'appointment' } = data;
  const userId = context.auth.uid;

  try {
    const db = admin.firestore();
    
    // Verificar que no exista notificación duplicada
    const existingNotification = await db
      .collection('scheduled_notifications')
      .where('userId', '==', userId)
      .where('scheduledTime', '==', new Date(scheduledTime))
      .where('status', 'in', ['pending', 'sent'])
      .get();

    if (!existingNotification.empty) {
      throw new functions.https.HttpsError(
        'already-exists', 
        'Ya existe una notificación programada para esta fecha y hora'
      );
    }

    // Crear la notificación programada
    const notificationRef = await db.collection('scheduled_notifications').add({
      userId: userId,
      title: title,
      body: body,
      scheduledTime: new Date(scheduledTime),
      status: 'pending',
      type: type,
      createdAt: new Date(),
      expiresAt: new Date(new Date(scheduledTime).getTime() + 30 * 60 * 1000) // 30 mins después
    });

    console.log(`📅 Notificación programada: ${notificationRef.id} para ${scheduledTime}`);
    
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