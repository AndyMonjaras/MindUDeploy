<template>
  <div class="notification-toggle">
    <button 
      @click="toggleNotifications"
      :class="['notification-bell-btn', { 'enabled': isEnabled }]"
      :title="isEnabled ? 'Notificaciones activadas' : 'Notificaciones desactivadas'"
    >
      <img 
        :src="isEnabled 
          ? 'https://cdn-icons-png.flaticon.com/512/565/565422.png' 
          : 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png'" 
        alt="Notificaciones"
        class="bell-icon"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isEnabled = ref(false);

// Verificar estado inicial
const checkStatus = () => {
  isEnabled.value = Notification.permission === 'granted';
};

// Alternar notificaciones
const toggleNotifications = async () => {
  try {
    if (Notification.permission === 'default' || Notification.permission === 'denied') {
      // Solicitar permiso
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        isEnabled.value = true;
        showNotification('🔔 Notificaciones activadas', 'Ahora recibirás recordatorios importantes.');
        
        // Mostrar notificación de bienvenida después de 1 segundo
        setTimeout(() => {
          showWelcomeNotification();
        }, 1000);
      } else {
        isEnabled.value = false;
        showNotification('🔕 Notificaciones desactivadas', 'No recibirás recordatorios.');
      }
    } else {
      // Ya tiene permisos, mostrar mensaje de estado
      if (isEnabled.value) {
        showNotification('🔔 Notificaciones activadas', 'El sistema de recordatorios está funcionando.');
      } else {
        showNotification('🔕 Notificaciones desactivadas', 'Habilita las notificaciones para recibir recordatorios.');
      }
    }
    
    checkStatus();
    
  } catch (error) {
    console.error('Error al alternar notificaciones:', error);
  }
};

// Mostrar notificación del navegador
const showNotification = (title, body) => {
  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      });
    } catch (err) {
      console.error('Error mostrando notificación:', err);
    }
  }
};

// Mostrar notificación de bienvenida
const showWelcomeNotification = () => {
  showNotification(
    '👋 ¡Bienvenido a MindU!',
    'Configura recordatorios para no perder tus sesiones importantes.'
  );
};

// Verificar si hay notificaciones programadas pendientes
const checkScheduledNotifications = () => {
  const scheduled = localStorage.getItem('mindu_scheduled_notifications');
  if (scheduled && Notification.permission === 'granted') {
    const notifications = JSON.parse(scheduled);
    const now = new Date();
    
    notifications.forEach(notif => {
      const scheduledTime = new Date(notif.scheduledFor);
      if (scheduledTime <= now && scheduledTime > new Date(now.getTime() - 60000)) {
        showNotification(notif.title, notif.message);
      }
    });
  }
};

onMounted(() => {
  checkStatus();
  
  // Mostrar notificación de bienvenida si es primera vez
  const firstTime = localStorage.getItem('mindu_first_visit');
  if (!firstTime && Notification.permission === 'granted') {
    setTimeout(() => {
      showWelcomeNotification();
      localStorage.setItem('mindu_first_visit', 'true');
    }, 2000);
  }
  
  // Verificar notificaciones programadas cada minuto
  setInterval(checkScheduledNotifications, 60000);
});
</script>

<style scoped>
.notification-toggle {
  position: relative;
}

.notification-bell-btn {
  position: relative;
  background: none;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.notification-bell-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.notification-bell-btn.enabled {
  border-color: #10b981;
  background: #10b981;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.bell-icon {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(0);
  transition: filter 0.3s ease;
}

.notification-bell-btn.enabled .bell-icon {
  filter: brightness(0) invert(1);
}

/* Para navegadores que no soportan animaciones */
@media (prefers-reduced-motion: reduce) {
  .notification-bell-btn.enabled {
    animation: none;
  }
  
  .notification-bell-btn:hover {
    transform: none;
  }
}
</style>