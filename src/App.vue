<template>
  <div id="app">
    <RouterView />
    <!-- Sistema de notificaciones toast -->
    <div class="notification-toast-container">
      <NotificationToast />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import NotificationToast from './components/NotificationToast.vue';
import scheduledNotificationsService from './services/scheduledNotifications';
import userGroupService from './services/userGroupService';

onMounted(async () => {
  console.log('🚀 App montada');
  
  // Iniciar sistema de notificaciones si el usuario está en grupo con notificaciones
  const userProfile = await userGroupService.getUserProfile();
  if (userProfile?.notificationsEnabled) {
    scheduledNotificationsService.start();
  }
});
</script>

<style>
/* Estilos globales para toasts */
.notification-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  pointer-events: none;
}

.notification-toast-container > * {
  pointer-events: auto;
}

@media (max-width: 640px) {
  .notification-toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
}
</style>