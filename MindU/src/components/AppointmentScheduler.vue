<template>
  <div class="appointment-scheduler">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">📅 Agendar Nueva Cita</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="scheduleAppointment">
          <div class="mb-3">
            <label class="form-label">Título</label>
            <input 
              v-model="appointment.title"
              type="text" 
              class="form-control"
              placeholder="Ej: Sesión de meditación"
              required
            >
          </div>
          
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea 
              v-model="appointment.body"
              class="form-control"
              rows="3"
              placeholder="Ej: No olvides tu sesión de mindfulness programada"
              required
            ></textarea>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Fecha y Hora</label>
            <input 
              v-model="appointment.datetime"
              type="datetime-local" 
              class="form-control"
              :min="minDateTime"
              required
            >
            <div class="form-text">
              ⏰ La notificación se enviará exactamente a esta hora
            </div>
          </div>
          
          <div v-if="timeStatus.checked" class="mb-3">
            <div :class="['alert', timeStatus.available ? 'alert-success' : 'alert-warning']">
              {{ timeStatus.message }}
            </div>
          </div>
          
          <div class="d-grid gap-2">
            <button 
              type="button"
              @click="checkAvailability"
              :disabled="!appointment.datetime"
              class="btn btn-outline-info"
            >
              🔍 Verificar Disponibilidad
            </button>
            
            <button 
              type="submit"
              :disabled="!canSchedule || scheduling"
              class="btn btn-success"
            >
              <span v-if="scheduling" class="spinner-border spinner-border-sm me-2"></span>
              {{ scheduling ? 'Agendando...' : '📅 Agendar Cita' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Lista de citas agendadas -->
    <div class="mt-4">
      <h6>📋 Mis Citas Agendadas</h6>
      <div v-if="loadingAppointments" class="text-center">
        <div class="spinner-border text-primary"></div>
      </div>
      <div v-else-if="appointments.length === 0" class="alert alert-info">
        No tienes citas agendadas
      </div>
      <div v-else class="list-group">
        <div 
          v-for="appointment in appointments" 
          :key="appointment.id"
          class="list-group-item"
        >
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="mb-1">{{ appointment.title }}</h6>
              <p class="mb-1 text-muted">{{ appointment.body }}</p>
              <small class="text-muted">
                🕐 {{ formatDate(appointment.scheduledTime?.toDate()) }}
                • Estado: <span :class="getStatusClass(appointment.status)">{{ appointment.status }}</span>
              </small>
            </div>
            <button 
              v-if="appointment.status === 'pending'"
              @click="cancelAppointment(appointment.id)"
              class="btn btn-sm btn-outline-danger"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import schedulingService from '@/services/schedulingService';

const auth = getAuth();
const appointment = ref({
  title: '',
  body: '',
  datetime: ''
});
const timeStatus = ref({ checked: false, available: false, message: '' });
const scheduling = ref(false);
const appointments = ref([]);
const loadingAppointments = ref(false);

const minDateTime = computed(() => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30); // Mínimo 30 mins en el futuro
  return now.toISOString().slice(0, 16);
});

const canSchedule = computed(() => {
  return timeStatus.value.available && 
         appointment.value.title && 
         appointment.value.body && 
         appointment.value.datetime;
});

// Verificar disponibilidad
async function checkAvailability() {
  if (!appointment.value.datetime) return;
  
  const scheduledTime = new Date(appointment.value.datetime);
  const userId = auth.currentUser?.uid;
  
  if (!userId) {
    alert('❌ Debes iniciar sesión primero');
    return;
  }
  
  try {
    const available = await schedulingService.checkTimeAvailability(userId, scheduledTime);
    
    timeStatus.value = {
      checked: true,
      available: available,
      message: available 
        ? '✅ Horario disponible' 
        : '❌ Horario no disponible. Ya tienes una cita programada en este horario.'
    };
    
  } catch (error) {
    timeStatus.value = {
      checked: true,
      available: false,
      message: '❌ Error verificando disponibilidad'
    };
  }
}

// Agendar cita
async function scheduleAppointment() {
  if (!canSchedule.value) return;
  
  scheduling.value = true;
  const userId = auth.currentUser?.uid;
  
  try {
    const result = await schedulingService.scheduleAppointment({
      title: appointment.value.title,
      body: appointment.value.body,
      scheduledTime: new Date(appointment.value.datetime)
    });
    
    alert('✅ Cita agendada exitosamente');
    
    // Reset form
    appointment.value = { title: '', body: '', datetime: '' };
    timeStatus.value = { checked: false, available: false, message: '' };
    
    // Recargar lista
    loadAppointments();
    
  } catch (error) {
    alert(`❌ Error: ${error.message}`);
  } finally {
    scheduling.value = false;
  }
}

// Cargar citas del usuario
async function loadAppointments() {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  
  loadingAppointments.value = true;
  try {
    appointments.value = await schedulingService.getUserAppointments(userId);
  } catch (error) {
    console.error('Error cargando citas:', error);
  } finally {
    loadingAppointments.value = false;
  }
}

// Cancelar cita
async function cancelAppointment(notificationId) {
  if (!confirm('¿Estás seguro de que quieres cancelar esta cita?')) return;
  
  try {
    await schedulingService.cancelAppointment(notificationId);
    alert('✅ Cita cancelada');
    loadAppointments(); // Recargar lista
  } catch (error) {
    alert(`❌ Error cancelando cita: ${error.message}`);
  }
}

// Helper functions
function formatDate(date) {
  return date ? new Date(date).toLocaleString('es-MX') : 'N/A';
}

function getStatusClass(status) {
  const classes = {
    pending: 'text-warning',
    sent: 'text-success',
    cancelled: 'text-danger',
    failed: 'text-danger'
  };
  return classes[status] || 'text-muted';
}

onMounted(() => {
  loadAppointments();
});
</script>

<style scoped>
.appointment-scheduler {
  max-width: 600px;
  margin: 0 auto;
}
</style>