// backend/server.js - VERSIÓN COMPLETA CON FIREBASE ADMIN
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// ---------------------------------------
// 🔥 Cargar credenciales del Service Account
// ---------------------------------------
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

console.log("📁 Buscando service account en:", serviceAccountPath);

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ ERROR: No se encontró serviceAccountKey.json");
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

console.log("✅ Service Account cargado:", serviceAccount.client_email);

// ---------------------------------------
// 🔥 Inicializar Firebase Admin
// ---------------------------------------
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "mindu-550fd"
  });
  console.log("✅ Firebase Admin inicializado correctamente");
} catch (error) {
  console.error("❌ Error inicializando Firebase Admin:", error);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const db = admin.firestore();

// ---------------------------------------
// 📌 RUTAS BÁSICAS
// ---------------------------------------

// Health check
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "🔥 Backend MindU funcionando",
    timestamp: new Date().toISOString(),
    project: admin.app().options.projectId,
    endpoints: [
      "GET / - Health check",
      "POST /send-notification - Enviar notificación FCM",
      "POST /schedule-appointment - Agendar cita",
      "GET /user-appointments/:userId - Obtener citas",
      "POST /cancel-appointment/:appointmentId - Cancelar cita",
      "GET /test-firestore - Probar Firestore"
    ]
  });
});

// Test Firestore
app.get("/test-firestore", async (req, res) => {
  try {
    // Probar conexión a Firestore
    const testDoc = await db.collection("test").add({
      message: "Test de conexión Firestore",
      timestamp: new Date()
    });
    
    res.json({
      ok: true,
      message: "✅ Firestore conectado correctamente",
      docId: testDoc.id
    });
  } catch (error) {
    console.error("❌ Error probando Firestore:", error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// ---------------------------------------
// 🔔 ENVIAR NOTIFICACIONES FCM
// ---------------------------------------
app.post("/send-notification", async (req, res) => {
  try {
    const { token, titulo, cuerpo, data } = req.body;

    console.log("📩 Recibiendo solicitud de notificación:", { 
      titulo, 
      cuerpo,
      token: token ? token.substring(0, 20) + "..." : "NO TOKEN"
    });

    if (!token) {
      return res.status(400).json({ ok: false, msg: "Falta el token FCM" });
    }

    const message = {
      token: token.trim(),
      notification: {
        title: titulo || "Notificación de MindU",
        body: cuerpo || "Tienes un nuevo mensaje."
      },
      webpush: {
        notification: {
          icon: "/logo.png",
          badge: "/badge.png"
        }
      },
      android: {
        notification: {
          sound: "default",
          priority: "high"
        }
      }
    };

    // Agregar data personalizada
    if (data && typeof data === 'object') {
      message.data = data;
    }

    console.log("📤 Enviando notificación FCM...");
    const response = await admin.messaging().send(message);

    console.log("✅ Notificación FCM enviada exitosamente");
    
    return res.json({
      ok: true,
      msg: "Notificación enviada",
      response: response
    });

  } catch (error) {
    console.error("❌ Error al enviar notificación:", error);
    
    if (error.errorInfo?.code === 'messaging/registration-token-not-registered') {
      return res.status(410).json({
        ok: false,
        msg: "Token inválido o expirado",
        error: "El token FCM ya no es válido."
      });
    }

    if (error.errorInfo?.code === 'messaging/invalid-argument') {
      return res.status(400).json({
        ok: false,
        msg: "Token inválido",
        error: "El formato del token es incorrecto."
      });
    }

    return res.status(500).json({
      ok: false,
      msg: "Error al enviar notificación",
      error: error.message,
      code: error.errorInfo?.code
    });
  }
});

// ---------------------------------------
// 📅 SISTEMA DE AGENDAMIENTO
// ---------------------------------------

// Agendar nueva cita
app.post("/schedule-appointment", async (req, res) => {
  try {
    const { userId, title, body, scheduledTime } = req.body;

    console.log("📅 Recibiendo solicitud de agendamiento:", { 
      userId, 
      title, 
      scheduledTime 
    });

    if (!userId || !scheduledTime) {
      return res.status(400).json({ 
        ok: false, 
        msg: "Faltan datos requeridos: userId y scheduledTime" 
      });
    }

    // Verificar disponibilidad (mismo día y hora)
    const scheduledDate = new Date(scheduledTime);
    const startOfDay = new Date(scheduledDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(scheduledDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await db
      .collection("scheduled_notifications")
      .where("userId", "==", userId)
      .where("scheduledTime", ">=", startOfDay)
      .where("scheduledTime", "<=", endOfDay)
      .where("status", "in", ["pending", "sent"])
      .get();

    if (!existingAppointments.empty) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una cita programada para este día"
      });
    }

    // Crear notificación programada
    const appointmentRef = await db.collection("scheduled_notifications").add({
      userId,
      title: title || "Recordatorio de MindU",
      body: body || "Es hora de tu sesión programada",
      scheduledTime: scheduledDate,
      status: "pending",
      type: "appointment",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: new Date(scheduledDate.getTime() + 30 * 60 * 1000) // 30 mins después
    });

    console.log(`✅ Cita agendada: ${appointmentRef.id} para ${scheduledTime}`);

    res.json({
      ok: true,
      msg: "Cita agendada exitosamente",
      appointmentId: appointmentRef.id
    });

  } catch (error) {
    console.error("❌ Error agendando cita:", error);
    res.status(500).json({ 
      ok: false, 
      error: error.message 
    });
  }
});

// Obtener citas del usuario
app.get("/user-appointments/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log(`📋 Obteniendo citas para usuario: ${userId}`);
    
    const appointmentsSnapshot = await db
      .collection("scheduled_notifications")
      .where("userId", "==", userId)
      .orderBy("scheduledTime", "desc")
      .limit(10)
      .get();

    const appointments = appointmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`✅ Encontradas ${appointments.length} citas para ${userId}`);

    res.json({
      ok: true,
      appointments
    });

  } catch (error) {
    console.error("❌ Error obteniendo citas:", error);
    res.status(500).json({ 
      ok: false, 
      error: error.message 
    });
  }
});

// Cancelar cita
app.post("/cancel-appointment/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;

    console.log(`❌ Cancelando cita: ${appointmentId}`);

    await db.collection("scheduled_notifications").doc(appointmentId).update({
      status: "cancelled",
      cancelledAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`✅ Cita cancelada: ${appointmentId}`);

    res.json({
      ok: true,
      msg: "Cita cancelada exitosamente"
    });

  } catch (error) {
    console.error("❌ Error cancelando cita:", error);
    res.status(500).json({ 
      ok: false, 
      error: error.message 
    });
  }
});

// ---------------------------------------
// ⏰ SCHEDULER PARA NOTIFICACIONES PROGRAMADAS
// ---------------------------------------
function startNotificationScheduler() {
  console.log('⏰ Iniciando scheduler de notificaciones...');
  
  setInterval(async () => {
    try {
      const now = new Date();
      
      console.log(`🔍 Buscando notificaciones pendientes... (${now.toISOString()})`);
      
      const pendingNotifications = await db
        .collection("scheduled_notifications")
        .where("status", "==", "pending")
        .where("scheduledTime", "<=", now)
        .get();

      console.log(`📨 Notificaciones pendientes encontradas: ${pendingNotifications.size}`);

      for (const doc of pendingNotifications.docs) {
        const notification = { id: doc.id, ...doc.data() };
        await processScheduledNotification(notification);
      }
    } catch (error) {
      console.error('❌ Error en scheduler:', error);
    }
  }, 30000); // Verificar cada 30 segundos
}

// Procesar notificación programada
async function processScheduledNotification(notification) {
  try {
    console.log(`📤 Procesando notificación programada: ${notification.title}`);
    
    // Obtener token FCM del usuario
    const userDoc = await db.collection("users").doc(notification.userId).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      const fcmToken = userData.fcmToken;
      
      if (fcmToken) {
        // Enviar notificación FCM
        const message = {
          token: fcmToken,
          notification: {
            title: notification.title,
            body: notification.body
          },
          data: {
            type: 'scheduled_notification',
            notificationId: notification.id,
            scheduledTime: notification.scheduledTime.toDate().toISOString()
          },
          android: {
            notification: {
              sound: "default"
            }
          }
        };
        
        await admin.messaging().send(message);
        console.log(`📤 Notificación FCM enviada a ${notification.userId}`);
      } else {
        console.log(`⚠️ Usuario ${notification.userId} no tiene token FCM`);
      }
    } else {
      console.log(`⚠️ Usuario ${notification.userId} no encontrado`);
    }
    
    // Actualizar estado
    await db.collection("scheduled_notifications").doc(notification.id).update({
      status: "sent",
      sentAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Registrar en sesiones
    await db.collection("user_sessions").add({
      userId: notification.userId,
      notificationId: notification.id,
      sessionTime: notification.scheduledTime,
      status: "completed",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      notificationData: {
        title: notification.title,
        body: notification.body
      }
    });

    console.log(`✅ Notificación procesada: ${notification.id}`);
    
  } catch (error) {
    console.error(`❌ Error procesando notificación ${notification.id}:`, error);
    await db.collection("scheduled_notifications").doc(notification.id).update({
      status: "failed",
      error: error.message
    });
  }
}

// Iniciar el scheduler
startNotificationScheduler();

// ---------------------------------------
// 🚀 INICIAR SERVIDOR
// ---------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("==========================================");
  console.log("🔥 Backend MindU iniciado correctamente");
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🏢 Project: ${admin.app().options.projectId}`);
  console.log(`📧 Service: ${serviceAccount.client_email}`);
  console.log("⏰ Scheduler activado - Verificando cada 30 segundos");
  console.log("==========================================");
});

// Manejo de errores global
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;