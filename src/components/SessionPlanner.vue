<template>
  <div class="session-planner">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Tipo de Sesión</label>
          <select class="form-select" v-model="sessionData.type">
            <option value="mindfulness">Mindfulness</option>
            <option value="breathing">Respiración</option>
            <option value="relaxation">Relajación</option>
            <option value="sleep">Sueño</option>
            <option value="anxiety">Ansiedad</option>
          </select>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Duración (minutos)</label>
          <select class="form-select" v-model="sessionData.duration">
            <option value="5">5 minutos</option>
            <option value="10">10 minutos</option>
            <option value="15">15 minutos</option>
            <option value="20">20 minutos</option>
            <option value="30">30 minutos</option>
          </select>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="mb-3">
          <label class="form-label">Fecha</label>
          <input type="date" class="form-control" v-model="sessionData.date">
        </div>
        
        <div class="mb-3">
          <label class="form-label">Hora</label>
          <input type="time" class="form-control" v-model="sessionData.time">
        </div>
      </div>
    </div>
    
    <div class="mb-3">
      <label class="form-label">Recordatorio</label>
      <select class="form-select" v-model="sessionData.reminder">
        <option value="5">5 minutos antes</option>
        <option value="10">10 minutos antes</option>
        <option value="15">15 minutos antes</option>
        <option value="30">30 minutos antes</option>
        <option value="0">Sin recordatorio</option>
      </select>
    </div>
    
    <div class="mb-3">
      <label class="form-label">Notas (opcional)</label>
      <textarea class="form-control" v-model="sessionData.notes" rows="3" 
                placeholder="Alguna nota especial para esta sesión..."></textarea>
    </div>
    
    <div class="d-grid gap-2">
      <button class="btn btn-primary" @click="scheduleSession">
        <i class="fas fa-calendar-plus me-2"></i>Programar Sesión
      </button>
      <button class="btn btn-outline-secondary" @click="cancelPlanning">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const emit = defineEmits(['session-scheduled'])
const toastService = inject('toastService', {
  success: () => {},
  error: () => {}
})

const sessionData = ref({
  type: 'mindfulness',
  duration: '10',
  date: getTomorrowDate(),
  time: '08:00',
  reminder: '5',
  notes: ''
})

function getTomorrowDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

const scheduleSession = () => {
  if (!sessionData.value.date || !sessionData.value.time) {
    toastService.error('Error', 'Por favor completa fecha y hora')
    return
  }
  
  emit('session-scheduled', sessionData.value)
  toastService.success('Éxito', 'Sesión programada correctamente')
  
  // Reset form
  sessionData.value = {
    type: 'mindfulness',
    duration: '10',
    date: getTomorrowDate(),
    time: '08:00',
    reminder: '5',
    notes: ''
  }
}

const cancelPlanning = () => {
  emit('session-scheduled', null)
}
</script>

<style scoped>
.session-planner {
  max-width: 600px;
  margin: 0 auto;
}
</style>