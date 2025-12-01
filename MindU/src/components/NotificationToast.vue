<template>
  <div class="notification-toast-container">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        :class="['notification-toast', `toast-${toast.type}`]"
        @click="removeToast(toast.id)"
      >
        <div class="toast-icon">
          <span v-if="toast.type === 'success'">✅</span>
          <span v-else-if="toast.type === 'error'">❌</span>
          <span v-else-if="toast.type === 'warning'">⚠️</span>
          <span v-else>🔔</span>
        </div>
        <div class="toast-content">
          <div class="toast-title">{{ toast.title }}</div>
          <div class="toast-message">{{ toast.message }}</div>
        </div>
        <button class="toast-close" @click.stop="removeToast(toast.id)">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const toasts = ref([]);

const addToast = (toastData) => {
  const toast = {
    id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: toastData.title,
    message: toastData.message,
    type: toastData.type || 'info',
    duration: toastData.duration || 5000,
    timestamp: Date.now()
  };

  toasts.value.unshift(toast);

  // Auto-remove after duration
  setTimeout(() => {
    removeToast(toast.id);
  }, toast.duration);

  // Limit to 3 toasts maximum
  if (toasts.value.length > 3) {
    toasts.value = toasts.value.slice(0, 3);
  }
};

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

const clearAllToasts = () => {
  toasts.value = [];
};

// Listen for global toast events
const handleToastAdd = (event) => {
  addToast(event.detail);
};

onMounted(() => {
  window.addEventListener('mindu-toast', handleToastAdd);
});

onUnmounted(() => {
  window.removeEventListener('mindu-toast', handleToastAdd);
});

// Expose methods
defineExpose({
  addToast,
  removeToast,
  clearAllToasts
});
</script>

<style scoped>
.notification-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999; /* Muy alto para que esté por encima de todo */
  pointer-events: none;
}

.notification-toast-container > * {
  pointer-events: auto;
}

.notification-toast {
  display: flex;
  align-items: center;
  min-width: 320px;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-left: 5px solid #007bff;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.notification-toast:hover {
  transform: translateX(-5px) translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.toast-success {
  border-left-color: #28a745;
  background: linear-gradient(135deg, #ffffff 0%, #f8fff9 100%);
}

.toast-error {
  border-left-color: #dc3545;
  background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
}

.toast-warning {
  border-left-color: #ffc107;
  background: linear-gradient(135deg, #ffffff 0%, #fffef8 100%);
}

.toast-info {
  border-left-color: #17a2b8;
  background: linear-gradient(135deg, #ffffff 0%, #f8fdff 100%);
}

.toast-icon {
  font-size: 1.4em;
  margin-right: 14px;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 700;
  font-size: 0.95em;
  margin-bottom: 4px;
  color: #2c3e50;
  line-height: 1.2;
}

.toast-message {
  font-size: 0.85em;
  color: #5a6c7d;
  line-height: 1.4;
  word-wrap: break-word;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.4em;
  color: #a0a0a0;
  cursor: pointer;
  padding: 4px;
  margin-left: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.toast-close:hover {
  color: #666;
  background: #f0f0f0;
}

/* Animaciones mejoradas */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(400px) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(400px) scale(0.8);
}

.toast-leave-active {
  position: absolute;
}

.toast-move {
  transition: transform 0.5s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .notification-toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
  
  .notification-toast {
    min-width: unset;
    max-width: unset;
    width: auto;
  }
}

@media (max-width: 480px) {
  .notification-toast {
    padding: 14px;
    margin-bottom: 10px;
  }
  
  .toast-icon {
    font-size: 1.2em;
    margin-right: 12px;
  }
  
  .toast-title {
    font-size: 0.9em;
  }
  
  .toast-message {
    font-size: 0.8em;
  }
}
</style>