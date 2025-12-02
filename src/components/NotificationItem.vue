<template>
  <div 
    class="notification" 
    :class="[type, { 'notification-enter': show, 'notification-leave': !show }]"
    @mouseenter="pauseProgress"
    @mouseleave="resumeProgress"
  >
    <div class="notification-content">
      <!-- Icono según tipo -->
      <div class="notification-icon">
        <span v-html="typeIcon"></span>
      </div>

      <!-- Contenido -->
      <div class="notification-body">
        <h6 class="notification-title">{{ title }}</h6>
        <p class="notification-message">{{ message }}</p>
      </div>

      <!-- Botón cerrar -->
      <button 
        class="notification-close" 
        @click="close"
        aria-label="Cerrar notificación"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Barra de progreso animada -->
    <div class="notification-progress">
      <div 
        class="notification-progress-bar" 
        :class="type"
        :style="progressStyle"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  id: String,
  title: String,
  message: String,
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 10000
  }
});

const emit = defineEmits(['close']);

const show = ref(false);
const progress = ref(100);
const isPaused = ref(false);
const startTime = ref(Date.now());
const progressInterval = ref(null);

// Iconos por tipo
const typeIcon = computed(() => {
  const icons = {
    info: '💡',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
  return icons[props.type] || '💬';
});

// Estilo de la barra de progreso
const progressStyle = computed(() => ({
  width: `${progress.value}%`,
  transition: isPaused.value ? 'none' : `width ${props.duration}ms linear`
}));

// Animación de entrada
const startEnterAnimation = () => {
  setTimeout(() => {
    show.value = true;
  }, 10);
};

// Iniciar progreso
const startProgress = () => {
  const updateProgress = () => {
    if (isPaused.value) return;

    const elapsed = Date.now() - startTime.value;
    const remaining = Math.max(0, props.duration - elapsed);
    progress.value = (remaining / props.duration) * 100;

    if (remaining <= 0) {
      close();
    }
  };

  progressInterval.value = setInterval(updateProgress, 50);
};

// Pausar progreso al hacer hover
const pauseProgress = () => {
  isPaused.value = true;
};

// Reanudar progreso al salir del hover
const resumeProgress = () => {
  isPaused.value = false;
  startTime.value = Date.now() - (props.duration * (1 - progress.value / 100));
};

// Cerrar notificación
const close = () => {
  show.value = false;
  clearInterval(progressInterval.value);
  
  setTimeout(() => {
    emit('close', props.id);
  }, 300);
};

onMounted(() => {
  startEnterAnimation();
  startProgress();
});

onUnmounted(() => {
  clearInterval(progressInterval.value);
});
</script>

<style scoped>
.notification {
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  margin-bottom: 12px;
  overflow: hidden;
  border-left: 4px solid #3b82f6;
  transform: translateX(400px) scale(0.9);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  max-width: 380px;
}

.notification-enter {
  transform: translateX(0) scale(1);
  opacity: 1;
}

.notification-leave {
  transform: translateX(400px) scale(0.9);
  opacity: 0;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
}

.notification-icon {
  font-size: 1.4em;
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-body {
  flex: 1;
  min-width: 0;
}

.notification-title {
  margin: 0 0 6px 0;
  font-weight: 600;
  font-size: 0.95em;
  color: #1f2937;
  line-height: 1.3;
}

.notification-message {
  margin: 0;
  font-size: 0.85em;
  color: #6b7280;
  line-height: 1.4;
}

.notification-close {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #9ca3af;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #f3f4f6;
  overflow: hidden;
}

.notification-progress-bar {
  height: 100%;
  background: #3b82f6;
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}

/* Variantes de tipo */
.notification.success {
  border-left-color: #10b981;
}

.notification.success .notification-progress-bar {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.notification.warning {
  border-left-color: #f59e0b;
}

.notification.warning .notification-progress-bar {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.notification.error {
  border-left-color: #ef4444;
}

.notification.error .notification-progress-bar {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.notification.info {
  border-left-color: #3b82f6;
}

.notification.info .notification-progress-bar {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

/* Efectos de hover */
.notification:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  transform: translateX(0) scale(1.02);
}

/* Responsive */
@media (max-width: 640px) {
  .notification {
    max-width: calc(100vw - 40px);
    margin-bottom: 8px;
  }
  
  .notification-content {
    padding: 14px;
    gap: 10px;
  }
}
</style>