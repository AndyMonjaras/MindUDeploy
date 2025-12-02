<template>
  <div class="notification-scheduler">
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">⏰ Programar Recordatorios</h5>
        
        <!-- Recordatorio Diario -->
        <div class="mb-4">
          <h6>🔔 Recordatorio Diario</h6>
          <div class="row g-2 align-items-end">
            <div class="col-md-4">
              <label class="form-label small">Hora:</label>
              <input 
                v-model="dailyReminder.time" 
                type="time" 
                class="form-control"
              >
            </div>
            <div class="col-md-6">
              <label class="form-label small">Mensaje:</label>
              <input 
                v-model="dailyReminder.message" 
                type="text" 
                class="form-control"
                placeholder="Ej: Es hora de tu práctica diaria"
              >
            </div>
            <div class="col-md-2">
              <button 
                @click="scheduleDailyReminder" 
                class="btn btn-primary w-100"
                :disabled="!dailyReminder.time"
              >
                Programar
              </button>
            </div>
          </div>
        </div>

        <!-- Recordatorio de Sesión -->
        <div class="mb-4">
          <h6>📅 Recordatorio de Sesión</h6>
          <div class="row g-2">
            <div class="col-md-4">
              <label class="form-label small">Módulo:</label>
              <select v-model="sessionReminder.moduleId" class="form-select">
                <option value="">Seleccionar módulo</option>
                <option v-for="mod in modules" :key="mod.id" :value="mod.id">
                  {{ mod.titulo }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label small">Fecha y Hora:</label>
              <input 
                v-model="sessionReminder.datetime" 
                type="datetime-local" 
                class="form-control"
              >
            </div>
            <div class="col-md-4">
              <label class="form-label small">&nbsp;</label>
              <button 
                @click="scheduleSessionReminder" 
                class="btn btn-success w-100"
                :disabled="!sessionReminder.moduleId || !sessionReminder.datetime"
              >
                Programar Sesión
              </button>
            </div>
          </div>
        </div>

        <!-- Notificaciones Programadas -->
        <div>
          <h6>📋 Recordatorios Activos</h6>
          <div v-if="scheduledNotifications.length === 0" class="text-muted text-center py-3">
            No hay recordatorios programados
          </div>
          <div v-else class="scheduled-list">
            <div 
              v-for="notif in scheduledNotifications" 
              :key="notif.id"
              class="scheduled-item"
            >
              <div class="scheduled-content">
                <strong>{{ notif.title }}</strong>
                <small class="d-block text-muted">{{ notif.message }}</small>
                <small class="text-info">
                  {{ formatDate(notif.scheduledFor) }} • 
                  {{ notif.frequency === 'daily' ? 'Diario' : 'Una vez' }}
                </small>
              </div>
              <button 
                @click="cancelNotification(notif.id)"
                class="btn btn-outline-danger btn-sm"
                title="Cancelar recordatorio"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import scheduledNotifications from '../services/scheduledNotifications';

// Módulos disponibles (puedes importarlos de tu data)
const modules = ref([
  { id: 1, titulo: "Introducción" },
  { id: 2, titulo: "La Ansiedad" },
  { id: 3, titulo: "La Depresión" },
  { id: 4, titulo: "Manejo del Estrés" },
  { id: 5, titulo: "Respiración" },
  { id: 6, titulo: "Relajación Muscular" },
  { id: 7, titulo: "Pensamientos" }
]);

const dailyReminder = ref({
  time: '',
  message: 'Es un buen momento para practicar mindfulness'
});
// Programar recordatorio diario
const scheduleDailyReminder = async () => {
  try {
    await scheduledNotificationsService.scheduleDailyReminder(
      dailyReminder.value.time,
      dailyReminder.value.message
    );
    alert('✅ Recordatorio diario programado');
    loadScheduledNotifications();
  } catch (error) {
    alert('❌ Error programando recordatorio');
    console.error(error);
  }
};
const sessionReminder = ref({
  moduleId: '',
  datetime: ''
});

const scheduledNotifications = ref([]);

// Programar recordatorio diario
const scheduleDailyReminder = async () => {
  try {
    await scheduledNotifications.scheduleDailyReminder(
      dailyReminder.value.time,
      dailyReminder.value.message
    );
    alert('✅ Recordatorio diario programado');
    loadScheduledNotifications();
  } catch (error) {
    alert('❌ Error programando recordatorio');
    console.error(error);
  }
};

// Programar recordatorio de sesión
const scheduleSessionReminder = async () => {
  try {
    const module = modules.value.find(m => m.id == sessionReminder.value.moduleId);
    
    await scheduledNotifications.scheduleSessionReminder({
      moduleId: sessionReminder.value.moduleId,
      moduleName: module.titulo,
      scheduledTime: new Date(sessionReminder.value.datetime)
    });
    
    alert('✅ Recordatorio de sesión programado');
    sessionReminder.value = { moduleId: '', datetime: '' };
    loadScheduledNotifications();
  } catch (error) {
    alert('❌ Error programando sesión');
    console.error(error);
  }
};

// Cargar notificaciones programadas
const loadScheduledNotifications = async () => {
  scheduledNotifications.value = await scheduledNotifications.getUserScheduledNotifications();
};

// Cancelar notificación
const cancelNotification = async (id) => {
  if (confirm('¿Estás seguro de que quieres cancelar este recordatorio?')) {
    try {
      await scheduledNotifications.cancelScheduledNotification(id);
      loadScheduledNotifications();
    } catch (error) {
      alert('❌ Error cancelando recordatorio');
    }
  }
};

// Formatear fecha
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  loadScheduledNotifications();
  // Iniciar el sistema de verificación
  scheduledNotifications.start();
});

onUnmounted(() => {
  // Opcional: detener el sistema al salir del componente
  // scheduledNotifications.stop();
});
</script>

<style scoped>
.scheduled-list {
  max-height: 300px;
  overflow-y: auto;
}

.scheduled-item {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #f8f9fa;
}

.scheduled-content {
  flex: 1;
}

.scheduled-item:last-child {
  margin-bottom: 0;
}

.btn {
  white-space: nowrap;
}

.form-label {
  font-weight: 500;
}
</style>