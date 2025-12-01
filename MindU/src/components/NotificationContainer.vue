<template>
  <div class="notification-container">
    <TransitionGroup name="notification-list">
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        v-bind="notification"
        @close="removeNotification"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NotificationItem from './NotificationItem.vue';

// Servicio temporal hasta que crees el archivo
const notificationService = {
  show(title, message, type = 'info', duration = 10000) {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const notification = {
      id,
      title,
      message,
      type,
      duration,
      timestamp: Date.now()
    };
    
    const event = new CustomEvent('mindu-notification-add', {
      detail: notification
    });
    window.dispatchEvent(event);

    return id;
  },

  success(title, message, duration = 5000) {
    return this.show(title, message, 'success', duration);
  },

  error(title, message, duration = 7000) {
    return this.show(title, message, 'error', duration);
  },

  warning(title, message, duration = 6000) {
    return this.show(title, message, 'warning', duration);
  },

  info(title, message, duration = 5000) {
    return this.show(title, message, 'info', duration);
  },

  closeAll() {
    const event = new CustomEvent('mindu-notification-clear');
    window.dispatchEvent(event);
  }
};

const notifications = ref([]);

// Agregar notificación
const addNotification = (notification) => {
  notifications.value.unshift(notification);
  
  // Limitar a 5 notificaciones máximo
  if (notifications.value.length > 5) {
    notifications.value = notifications.value.slice(0, 5);
  }
};

// Remover notificación
const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index > -1) {
    notifications.value.splice(index, 1);
  }
};

// Limpiar todas
const clearAll = () => {
  notifications.value = [];
};

// Escuchar eventos del servicio
const handleNotificationAdd = (event) => {
  addNotification(event.detail);
};

const handleNotificationRemove = (event) => {
  removeNotification(event.detail.id);
};

const handleNotificationClear = () => {
  clearAll();
};

onMounted(() => {
  window.addEventListener('mindu-notification-add', handleNotificationAdd);
  window.addEventListener('mindu-notification-remove', handleNotificationRemove);
  window.addEventListener('mindu-notification-clear', handleNotificationClear);
  
  // Exponer métodos globalmente para fácil acceso
  window.$notify = notificationService;
});

onUnmounted(() => {
  window.removeEventListener('mindu-notification-add', handleNotificationAdd);
  window.removeEventListener('mindu-notification-remove', handleNotificationRemove);
  window.removeEventListener('mindu-notification-clear', handleNotificationClear);
  
  delete window.$notify;
});

// Exponer métodos al padre
defineExpose({
  clearAll
});
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  pointer-events: none;
}

/* Animaciones para el grupo de notificaciones */
.notification-list-move,
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.notification-list-enter-from {
  opacity: 0;
  transform: translateX(400px) scale(0.9);
}

.notification-list-leave-to {
  opacity: 0;
  transform: translateX(400px) scale(0.9);
}

.notification-list-leave-active {
  position: absolute;
}

/* Permitir interacción con las notificaciones */
.notification-container > * {
  pointer-events: auto;
}

/* Responsive */
@media (max-width: 640px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
}
</style>