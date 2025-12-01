<template>
  <div class="notification-toggle">
    <div class="dropdown">
      <button class="btn btn-outline-secondary position-relative dropdown-toggle" 
              type="button" 
              id="notificationDropdown" 
              data-bs-toggle="dropdown">
        🔔
        <span v-if="pendingCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ pendingCount }}
        </span>
      </button>
      
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
        <li>
          <h6 class="dropdown-header">Notificaciones</h6>
        </li>
        
        <!-- Simulación rápida -->
        <li>
          <button class="dropdown-item text-primary" @click="simulateNotification">
            🧪 Simular Notificación
          </button>
        </li>
        
        <!-- Programar recordatorio -->
        <li>
          <button class="dropdown-item" @click="scheduleTestReminder">
            ⏰ Programar Prueba (5 min)
          </button>
        </li>
        
        <li><hr class="dropdown-divider"></li>
        
        <!-- Estado -->
        <li>
          <span class="dropdown-item-text small text-muted">
            Modo: {{ isSimulation ? 'Simulación' : 'Producción' }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import scheduledNotificationsService from '../services/scheduledNotifications'; // Nombre actualizado

const pendingCount = ref(0);
const isSimulation = ref(true);

// Simular notificación inmediata
const simulateNotification = async () => {
  try {
    // Mostrar notificación inmediata
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('🧪 MindU - Prueba', {
        body: 'Esta es una notificación de prueba simulada',
        icon: '/favicon.ico',
        requireInteraction: true
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } else {
      // Disparar evento para UI
      const event = new CustomEvent('mindu-notification', {
        detail: {
          title: '🧪 Prueba Exitosa',
          body: 'Notificación simulada correctamente'
        }
      });
      window.dispatchEvent(event);
    }

    console.log('✅ Notificación simulada enviada');
    
  } catch (error) {
    console.error('❌ Error simulando notificación:', error);
  }
};

// Programar recordatorio de prueba
const scheduleTestReminder = async () => {
  try {
    const in5Minutes = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos
    
    await scheduledNotificationsService.scheduleNotification({
      title: '⏰ Recordatorio de Prueba',
      body: 'Esta es una notificación programada de prueba',
      scheduledTime: in5Minutes,
      type: 'test'
    });

    // Mostrar confirmación
    const event = new CustomEvent('mindu-notification', {
      detail: {
        title: '📅 Prueba Programada',
        body: 'Notificación programada para 5 minutos'
      }
    });
    window.dispatchEvent(event);

  } catch (error) {
    console.error('❌ Error programando prueba:', error);
  }
};

// Cargar notificaciones pendientes
const loadPendingNotifications = async () => {
  const notifications = await scheduledNotificationsService.getUserScheduledNotifications();
  pendingCount.value = notifications.length;
};

onMounted(() => {
  loadPendingNotifications();
  
  // Actualizar cada 30 segundos
  setInterval(loadPendingNotifications, 30000);
});
</script>

<style scoped>
.notification-toggle .badge {
  font-size: 0.6em;
  padding: 0.25em 0.4em;
}

.dropdown-menu {
  min-width: 250px;
}
</style>