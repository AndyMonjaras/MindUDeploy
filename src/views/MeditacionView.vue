<template>
  <div class="meditation-container">
    <!-- NAVBAR -->
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div class="container">
        <router-link class="navbar-brand fw-bold text-primary d-flex align-items-center" to="/home">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="MindU Logo" class="me-2" style="width: 32px; height: 32px;">
          <span class="brand-name">MindU</span>
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/home">
                <i class="fas fa-home me-2"></i>
                <span>Inicio</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/pre-test">
                <i class="fas fa-heartbeat me-2"></i>
                <span>Test de Salud</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/meditacion">
                <i class="fas fa-spa me-2"></i>
                <span>Meditación</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/especialistas">
                <i class="fas fa-user-md me-2"></i>
                <span>Especialistas</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/dashboard">
                <i class="fas fa-user-md me-2"></i>
                <span>Modulos</span>
              </router-link>
            </li>
          </ul>
          

          <div class="d-flex align-items-center gap-3">
            <!-- CAMPANITA SIMPLIFICADA DE NOTIFICACIONES -->
            <NotificationToggle />
            
            <!-- MENÚ USUARIO -->
            <div class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" type="button" id="userMenu" data-bs-toggle="dropdown">
                <div class="avatar-placeholder me-2">
                  <i class="fas fa-user"></i>
                </div>
                <span>Mi Cuenta</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item text-danger d-flex align-items-center" @click="logout">
                  <i class="fas fa-sign-out-alt me-2"></i>
                  Cerrar sesión
                </button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="meditation-hero text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Zona Zen</h1>
            <p class="lead mb-4">
              Encuentra tu paz interior con nuestras meditaciones guiadas. 
              Reduce el estrés, mejora tu concentración y cultiva la atención plena.
            </p>
            <div class="d-flex gap-3 flex-wrap">
              <button class="btn btn-light btn-lg fw-bold" @click="startQuickSession">
                🎧 Meditación Rápida (5 min)
              </button>
              <button class="btn btn-outline-light btn-lg" @click="showSessionPlanner = true">
                ⏰ Programar Sesión
              </button>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="floating-meditation">
              🧘‍♀️
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <section class="stats-bar py-3 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-primary mb-1">{{ stats.totalSessions }}</h4>
              <small class="text-muted">Sesiones Completadas</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-success mb-1">{{ stats.totalMinutes }} min</h4>
              <small class="text-muted">Tiempo Meditado</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-info mb-1">{{ stats.currentStreak }} días</h4>
              <small class="text-muted">Racha Actual</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-warning mb-1">{{ userLevel }}</h4>
              <small class="text-muted">Tu Nivel</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <div class="container my-5">
      <div class="row">
        <!-- SIDEBAR -->
        <div class="col-lg-3 mb-4">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-transparent">
              <h5 class="mb-0">🔍 Filtros</h5>
            </div>
            <div class="card-body">
              <!-- Filtro por Duración -->
              <div class="mb-4">
                <h6 class="text-muted mb-3">Duración</h6>
                <div class="btn-group-vertical w-100" role="group">
                  <button 
                    v-for="duration in durationFilters" 
                    :key="duration.value"
                    class="btn btn-outline-primary text-start"
                    :class="{ 'active': selectedDuration === duration.value }"
                    @click="selectDuration(duration.value)"
                  >
                    ⏱️ {{ duration.label }}
                  </button>
                </div>
              </div>

              <!-- Filtro por Tipo -->
              <div class="mb-4">
                <h6 class="text-muted mb-3">Tipo de Meditación</h6>
                <div class="btn-group-vertical w-100" role="group">
                  <button 
                    v-for="type in typeFilters" 
                    :key="type.value"
                    class="btn btn-outline-success text-start"
                    :class="{ 'active': selectedType === type.value }"
                    @click="selectType(type.value)"
                  >
                    {{ type.icon }} {{ type.label }}
                  </button>
                </div>
              </div>

              <!-- Filtro por Nivel -->
              <div class="mb-4">
                <h6 class="text-muted mb-3">Nivel</h6>
                <div class="btn-group-vertical w-100" role="group">
                  <button 
                    v-for="level in levelFilters" 
                    :key="level.value"
                    class="btn btn-outline-info text-start"
                    :class="{ 'active': selectedLevel === level.value }"
                    @click="selectLevel(level.value)"
                  >
                    📊 {{ level.label }}
                  </button>
                </div>
              </div>

              <button class="btn btn-outline-secondary w-100" @click="clearFilters">
                🗑️ Limpiar Filtros
              </button>
            </div>
          </div>

          <!-- PROGRESS CARD -->
          <div class="card shadow-sm border-0 mt-4">
            <div class="card-body text-center">
              <h6 class="text-muted mb-3">Tu Progreso Semanal</h6>
              <div class="progress mb-3" style="height: 20px;">
                <div 
                  class="progress-bar bg-success" 
                  role="progressbar" 
                  :style="{ width: weeklyProgress + '%' }"
                >
                  {{ Math.round(weeklyProgress) }}%
                </div>
              </div>
              <small class="text-muted">
                {{ stats.weeklySessions }}/7 sesiones esta semana
              </small>
            </div>
          </div>
        </div>

        <!-- MEDITATION CONTENT -->
        <div class="col-lg-9">
          <!-- ACTIVE SESSION -->
          <div v-if="activeSession" class="card active-session-card shadow-lg border-0 mb-4">
            <div class="card-body text-center p-5">
              <div class="session-timer mb-4">
                <h2 class="display-1 fw-bold text-primary">{{ formatTime(currentTime) }}</h2>
                <p class="text-muted">Tiempo restante: {{ formatTime(activeSession.duration * 60 - currentTime) }}</p>
              </div>
              
              <div class="session-controls mb-4">
                <button class="btn btn-lg btn-success me-3" @click="toggleSession" v-if="!sessionPaused">
                  ⏸️ Pausar
                </button>
                <button class="btn btn-lg btn-warning me-3" @click="toggleSession" v-else>
                  ▶️ Reanudar
                </button>
                <button class="btn btn-lg btn-danger" @click="endSession">
                  ⏹️ Finalizar
                </button>
              </div>

              <div class="session-guidance">
                <p class="lead">{{ currentGuidance }}</p>
              </div>

              <div class="breathing-animation mt-4">
                <div 
                  class="breathing-circle mx-auto"
                  :class="{ 'breathing-in': breathingIn, 'breathing-out': !breathingIn }"
                ></div>
                <p class="text-muted mt-2">{{ breathingText }}</p>
              </div>
            </div>
          </div>

          <!-- MEDITATION GRID -->
          <div v-else>
            <!-- QUICK ACCESS -->
            <div class="row mb-4">
              <div class="col-12">
                <h3 class="mb-4">🚀 Acceso Rápido</h3>
                <div class="row g-3">
                  <div class="col-md-4" v-for="quick in quickSessions" :key="quick.id">
                    <div class="card quick-session-card h-100 border-0 shadow-sm">
                      <div class="card-body text-center p-4">
                        <div class="quick-icon display-4 mb-3" :class="quick.color">
                          {{ quick.icon }}
                        </div>
                        <h5 class="card-title">{{ quick.title }}</h5>
                        <p class="card-text text-muted small">{{ quick.description }}</p>
                        <button class="btn btn-outline-primary w-100" @click="startSession(quick)">
                          ▶️ Comenzar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- MEDITATION LIBRARY -->
            <div class="row">
              <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h3>📚 Biblioteca de Meditaciones</h3>
                  <div class="search-box">
                    <div class="input-group">
                      <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Buscar meditaciones..."
                        v-model="searchQuery"
                      >
                      <span class="input-group-text">
                        🔍
                      </span>
                    </div>
                  </div>
                </div>

                <div class="row g-4">
                  <div 
                    class="col-xl-4 col-lg-6" 
                    v-for="meditation in filteredMeditations" 
                    :key="meditation.id"
                  >
                    <div class="card meditation-card h-100 border-0 shadow-sm">
                      <div class="card-img-top position-relative">
                        <div class="meditation-image" :class="meditation.imageClass"></div>
                        <div class="duration-badge">
                          <span class="badge bg-dark">{{ meditation.duration }} min</span>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                          <h5 class="card-title">{{ meditation.title }}</h5>
                          <span class="badge" :class="getLevelBadgeClass(meditation.level)">
                            {{ meditation.level }}
                          </span>
                        </div>
                        <p class="card-text text-muted small">{{ meditation.description }}</p>
                        <div class="meditation-meta d-flex justify-content-between align-items-center">
                          <small class="text-muted">
                            {{ meditation.typeIcon }} {{ meditation.type }}
                          </small>
                          <div class="rating">
                            ⭐
                            <small class="text-muted">{{ meditation.rating }}</small>
                          </div>
                        </div>
                      </div>
                      <div class="card-footer bg-transparent">
                        <button 
                          class="btn btn-primary w-100" 
                          @click="startSession(meditation)"
                          :disabled="activeSession"
                        >
                          🎧 {{ activeSession ? 'Sesión en curso' : 'Comenzar Sesión' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- LOAD MORE -->
                <div class="text-center mt-5">
                  <button class="btn btn-outline-primary" @click="loadMoreMeditations">
                    📥 Cargar Más Meditaciones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SESSION PLANNER MODAL -->
    <div v-if="showSessionPlanner" class="modal-backdrop fade show" @click="showSessionPlanner = false"></div>
    <div v-if="showSessionPlanner" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">📅 Programar Sesión de Meditación</h5>
            <button type="button" class="btn-close" @click="showSessionPlanner = false"></button>
          </div>
          <div class="modal-body">
            <div class="session-planner">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Tipo de Sesión</label>
                    <select class="form-select" v-model="sessionData.type">
                      <option value="mindfulness">🧠 Mindfulness</option>
                      <option value="breathing">💨 Respiración</option>
                      <option value="relaxation">☁️ Relajación</option>
                      <option value="sleep">🌙 Sueño</option>
                      <option value="anxiety">😌 Ansiedad</option>
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
                <label class="form-label">⏰ Recordatorio</label>
                <select class="form-select" v-model="sessionData.reminder">
                  <option value="5">5 minutos antes</option>
                  <option value="10">10 minutos antes</option>
                  <option value="15">15 minutos antes</option>
                  <option value="30">30 minutos antes</option>
                  <option value="0">Sin recordatorio</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label class="form-label">📝 Notas (opcional)</label>
                <textarea class="form-control" v-model="sessionData.notes" rows="3" 
                          placeholder="Alguna nota especial para esta sesión..."></textarea>
              </div>
              
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="scheduleSession">
                  ✅ Programar Sesión
                </button>
                <button class="btn btn-outline-secondary" @click="showSessionPlanner = false">
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ACHIEVEMENT TOAST -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div 
        v-for="achievement in recentAchievements" 
        :key="achievement.id"
        class="toast show mb-2" 
        role="alert"
      >
        <div class="toast-header">
          <strong class="me-auto">🏆 {{ achievement.title }}</strong>
          <small>Ahora</small>
          <button type="button" class="btn-close" @click="removeAchievement(achievement.id)"></button>
        </div>
        <div class="toast-body">
          {{ achievement.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado de la aplicación
const activeSession = ref(null)
const sessionPaused = ref(false)
const currentTime = ref(0)
const currentGuidance = ref('')
const breathingIn = ref(true)
const breathingText = ref('Inhala profundamente...')
const showSessionPlanner = ref(false)

// Estadísticas del usuario
const stats = ref({
  totalSessions: 12,
  totalMinutes: 145,
  currentStreak: 5,
  weeklySessions: 4
})

// Filtros
const selectedDuration = ref('all')
const selectedType = ref('all')
const selectedLevel = ref('all')
const searchQuery = ref('')

// Datos de sesión programada
const sessionData = ref({
  type: 'mindfulness',
  duration: '10',
  date: getTomorrowDate(),
  time: '08:00',
  reminder: '5',
  notes: ''
})

// Logros
const recentAchievements = ref([])

// Timers
let sessionTimer = null
let breathingTimer = null

// Datos de meditaciones
const quickSessions = ref([
  {
    id: 1,
    title: 'Respiración Consciente',
    description: '5 minutos para centrarte',
    duration: 5,
    type: 'breathing',
    icon: '💨',
    color: 'text-info'
  },
  {
    id: 2,
    title: 'Relajación Rápida',
    description: 'Alivia la tensión en 3 minutos',
    duration: 3,
    type: 'relaxation',
    icon: '☁️',
    color: 'text-success'
  },
  {
    id: 3,
    title: 'Enfoque Mental',
    description: 'Mejora tu concentración',
    duration: 7,
    type: 'focus',
    icon: '🎯',
    color: 'text-warning'
  }
])

const meditationLibrary = ref([
  {
    id: 1,
    title: 'Meditación para la Ansiedad',
    description: 'Técnicas específicas para calmar la mente ansiosa y encontrar paz interior.',
    duration: 10,
    type: 'ansiedad',
    typeIcon: '😌',
    level: 'Principiante',
    rating: 4.8,
    imageClass: 'meditation-anxiety'
  },
  {
    id: 2,
    title: 'Mindfulness Completo',
    description: 'Desarrolla atención plena en el momento presente.',
    duration: 15,
    type: 'mindfulness',
    typeIcon: '🧠',
    level: 'Intermedio',
    rating: 4.9,
    imageClass: 'meditation-mindfulness'
  },
  {
    id: 3,
    title: 'Sueño Profundo',
    description: 'Induce un estado de relajación profunda para mejorar el descanso.',
    duration: 20,
    type: 'sueño',
    typeIcon: '🌙',
    level: 'Principiante',
    rating: 4.7,
    imageClass: 'meditation-sleep'
  },
  {
    id: 4,
    title: 'Auto-compasión',
    description: 'Cultiva la bondad amorosa hacia ti mismo.',
    duration: 12,
    type: 'autocompasion',
    typeIcon: '💝',
    level: 'Intermedio',
    rating: 4.6,
    imageClass: 'meditation-compassion'
  },
  {
    id: 5,
    title: 'Concentración Avanzada',
    description: 'Entrena tu mente para mantener el enfoque por periodos prolongados.',
    duration: 25,
    type: 'concentracion',
    typeIcon: '🎯',
    level: 'Avanzado',
    rating: 4.9,
    imageClass: 'meditation-focus'
  },
  {
    id: 6,
    title: 'Liberación Emocional',
    description: 'Libera emociones acumuladas y encuentra equilibrio interior.',
    duration: 18,
    type: 'emocional',
    typeIcon: '🌧️',
    level: 'Intermedio',
    rating: 4.5,
    imageClass: 'meditation-emotional'
  }
])

// Filtros disponibles
const durationFilters = ref([
  { label: 'Todas las duraciones', value: 'all' },
  { label: 'Corta (1-5 min)', value: 'short' },
  { label: 'Media (6-15 min)', value: 'medium' },
  { label: 'Larga (16+ min)', value: 'long' }
])

const typeFilters = ref([
  { label: 'Todos los tipos', value: 'all', icon: '🔍' },
  { label: 'Mindfulness', value: 'mindfulness', icon: '🧠' },
  { label: 'Respiración', value: 'breathing', icon: '💨' },
  { label: 'Relajación', value: 'relaxation', icon: '☁️' },
  { label: 'Sueño', value: 'sueño', icon: '🌙' },
  { label: 'Ansiedad', value: 'ansiedad', icon: '😌' }
])

const levelFilters = ref([
  { label: 'Todos los niveles', value: 'all' },
  { label: 'Principiante', value: 'beginner' },
  { label: 'Intermedio', value: 'intermediate' },
  { label: 'Avanzado', value: 'advanced' }
])

// Computed properties
const userLevel = computed(() => {
  const totalMinutes = stats.value.totalMinutes
  if (totalMinutes < 60) return 'Principiante'
  if (totalMinutes < 300) return 'Intermedio'
  return 'Avanzado'
})

const weeklyProgress = computed(() => {
  return (stats.value.weeklySessions / 7) * 100
})

const filteredMeditations = computed(() => {
  return meditationLibrary.value.filter(meditation => {
    // Filtro de búsqueda
    if (searchQuery.value && !meditation.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }

    // Filtro de duración
    if (selectedDuration.value !== 'all') {
      const duration = meditation.duration
      if (selectedDuration.value === 'short' && duration > 5) return false
      if (selectedDuration.value === 'medium' && (duration <= 5 || duration > 15)) return false
      if (selectedDuration.value === 'long' && duration <= 15) return false
    }

    // Filtro de tipo
    if (selectedType.value !== 'all' && meditation.type !== selectedType.value) {
      return false
    }

    // Filtro de nivel
    if (selectedLevel.value !== 'all') {
      const levelMap = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' }
      if (meditation.level !== levelMap[selectedLevel.value]) return false
    }

    return true
  })
})

// Métodos
function getTomorrowDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const startQuickSession = () => {
  startSession(quickSessions.value[0])
}

const startSession = (session) => {
  activeSession.value = { ...session }
  currentTime.value = 0
  sessionPaused.value = false
  
  startTimers()
  showAchievement('¡Sesión Iniciada!', 'Comienza tu viaje hacia la paz interior.')
}

const toggleSession = () => {
  sessionPaused.value = !sessionPaused.value
  if (sessionPaused.value) {
    clearTimers()
  } else {
    startTimers()
  }
}

const endSession = () => {
  clearTimers()
  updateStats()
  showAchievement('¡Sesión Completada!', `Completaste ${activeSession.value.duration} minutos de meditación.`)
  activeSession.value = null
}

const startTimers = () => {
  // Timer principal de sesión
  sessionTimer = setInterval(() => {
    if (currentTime.value < activeSession.value.duration * 60) {
      currentTime.value++
      
      // Actualizar guía cada 30 segundos
      if (currentTime.value % 30 === 0) {
        updateGuidance()
      }
    } else {
      endSession()
    }
  }, 1000)

  // Timer de respiración (4 segundos inhala, 6 segundos exhala)
  breathingTimer = setInterval(() => {
    breathingIn.value = !breathingIn.value
    breathingText.value = breathingIn.value ? 'Inhala profundamente...' : 'Exhala lentamente...'
  }, 4000)
}

const clearTimers = () => {
  if (sessionTimer) clearInterval(sessionTimer)
  if (breathingTimer) clearInterval(breathingTimer)
}

const updateGuidance = () => {
  const guidanceMessages = [
    'Observa tu respiración sin juzgarla...',
    'Deja que los pensamientos vayan y vengan como nubes...',
    'Siente la conexión con el momento presente...',
    'Permite que la relajación se expanda por todo tu cuerpo...',
    'Cultiva una actitud de aceptación y compasión...'
  ]
  const randomMessage = guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)]
  currentGuidance.value = randomMessage
}

const updateStats = () => {
  stats.value.totalSessions++
  stats.value.totalMinutes += activeSession.value.duration
  stats.value.weeklySessions++
  
  // Actualizar racha
  const lastSession = localStorage.getItem('lastMeditationSession')
  const today = new Date().toDateString()
  if (lastSession !== today) {
    stats.value.currentStreak++
    localStorage.setItem('lastMeditationSession', today)
  }
}

const showAchievement = (title, message) => {
  const achievement = {
    id: Date.now(),
    title,
    message
  }
  recentAchievements.value.push(achievement)
  
  // Remover automáticamente después de 5 segundos
  setTimeout(() => {
    removeAchievement(achievement.id)
  }, 5000)
}

const removeAchievement = (id) => {
  recentAchievements.value = recentAchievements.value.filter(ach => ach.id !== id)
}

const selectDuration = (duration) => {
  selectedDuration.value = duration
}

const selectType = (type) => {
  selectedType.value = type
}

const selectLevel = (level) => {
  selectedLevel.value = level
}

const clearFilters = () => {
  selectedDuration.value = 'all'
  selectedType.value = 'all'
  selectedLevel.value = 'all'
  searchQuery.value = ''
}

const loadMoreMeditations = () => {
  // Simular carga de más meditaciones
  const newMeditation = {
    id: meditationLibrary.value.length + 1,
    title: 'Nueva Meditación ' + (meditationLibrary.value.length + 1),
    description: 'Descubre esta nueva meditación añadida recientemente.',
    duration: 15,
    type: 'mindfulness',
    typeIcon: '🧠',
    level: 'Intermedio',
    rating: 4.8,
    imageClass: 'meditation-new'
  }
  meditationLibrary.value.push(newMeditation)
  showAchievement('Contenido Actualizado', 'Se han cargado nuevas meditaciones para ti.')
}

const getLevelBadgeClass = (level) => {
  switch (level) {
    case 'Principiante': return 'bg-success'
    case 'Intermedio': return 'bg-warning text-dark'
    case 'Avanzado': return 'bg-danger'
    default: return 'bg-secondary'
  }
}

const scheduleSession = () => {
  if (!sessionData.value.date || !sessionData.value.time) {
    showAchievement('Error', 'Por favor completa fecha y hora')
    return
  }
  
  showSessionPlanner.value = false
  showAchievement('Sesión Programada', `Meditación de ${sessionData.value.duration}min programada para ${sessionData.value.date} a las ${sessionData.value.time}`)
  
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

// Lifecycle
onMounted(() => {
  // Cargar estadísticas del localStorage
  const savedStats = localStorage.getItem('meditationStats')
  if (savedStats) {
    stats.value = { ...stats.value, ...JSON.parse(savedStats) }
  }
})

onUnmounted(() => {
  clearTimers()
  // Guardar estadísticas
  localStorage.setItem('meditationStats', JSON.stringify(stats.value))
})
</script>

<style scoped>
.meditation-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.meditation-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.floating-meditation {
  font-size: 8rem;
  color: rgba(255, 255, 255, 0.8);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.stats-bar {
  border-bottom: 1px solid #e9ecef;
}

.quick-session-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.quick-session-card:hover {
  transform: translateY(-5px);
  border-color: #007bff;
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
}

.meditation-card {
  transition: all 0.3s ease;
}

.meditation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.meditation-image {
  height: 120px;
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
}

.meditation-anxiety { background: linear-gradient(135deg, #ff6b6b, #ffa8a8); }
.meditation-mindfulness { background: linear-gradient(135deg, #51cf66, #94d82d); }
.meditation-sleep { background: linear-gradient(135deg, #845ef7, #cc5de8); }
.meditation-compassion { background: linear-gradient(135deg, #f06595, #fcc419); }
.meditation-focus { background: linear-gradient(135deg, #339af0, #22b8cf); }
.meditation-emotional { background: linear-gradient(135deg, #da77f2, #9775fa); }
.meditation-new { background: linear-gradient(135deg, #ffa94d, #ffd43b); }

.duration-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

.breathing-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transition: all 4s ease-in-out;
}

.breathing-in {
  transform: scale(1.2);
  background: linear-gradient(135deg, #51cf66, #94d82d);
}

.breathing-out {
  transform: scale(0.8);
  background: linear-gradient(135deg, #ff6b6b, #ffa8a8);
}

.active-session-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-left: 5px solid #007bff !important;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.toast {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .floating-meditation {
    font-size: 4rem;
  }
  
  .display-1 {
    font-size: 3rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
  
  .hero-buttons .btn {
    margin-bottom: 10px;
  }
}

.btn-group-vertical .btn {
  margin-bottom: 5px;
  text-align: left;
  display: flex;
  align-items: center;
}

.btn-group-vertical .btn.active {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.quick-icon {
  font-size: 3rem;
}

.session-planner {
  max-width: 100%;
}

/* Mejoras de accesibilidad */
.btn:focus,
.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  border-color: #007bff;
}

/* Animaciones suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mejoras visuales para las tarjetas */
.card {
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 1.25rem;
}

/* Estilos para la barra de progreso */
.progress {
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  border-radius: 10px;
  transition: width 0.6s ease;
}

/* Efectos hover mejorados */
.meditation-card:hover .card-title {
  color: #007bff;
}

.quick-session-card:hover .quick-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Estilos para los badges de nivel */
.badge {
  font-size: 0.7em;
  padding: 0.4em 0.6em;
}

/* Mejoras en la animación de respiración */
.breathing-circle {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Estilos para el modal */
.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
}

/* Estilos para los toasts de logros */
.toast {
  border: 1px solid #e9ecef;
  border-left: 4px solid #ffc107;
}

.toast-header {
  background: rgba(255, 193, 7, 0.1);
  border-bottom: 1px solid #e9ecef;
}

/* Mejoras en la responsividad */
@media (max-width: 576px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
}

/* Estilos para los filtros activos */
.btn-outline-primary.active,
.btn-outline-success.active,
.btn-outline-info.active {
  color: white;
}

/* Efectos de transición suaves */
* {
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

/* Mejoras en la legibilidad */
.card-text {
  line-height: 1.5;
}

.lead {
  line-height: 1.6;
}

/* Estilos para el temporizador de sesión activa */
.session-timer {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Efectos de profundidad */
.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}

.shadow-lg {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1) !important;
}
</style>