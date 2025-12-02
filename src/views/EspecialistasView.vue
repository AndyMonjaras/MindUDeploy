<template>
  <div class="especialistas-container">

  
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
    <section class="hero-section text-white py-5">
      <div class="container text-center">
        <h1 class="display-5 fw-bold mb-4">👨‍⚕️ Nuestros Especialistas</h1>
        <p class="lead mb-4">Profesionales certificados listos para ayudarte</p>
        <button class="btn btn-light btn-lg" @click="scrollToSpecialists">
          Ver Especialistas ↓
        </button>
      </div>
    </section>

    <!-- SPECIALISTS GRID -->
    <section class="specialists-grid py-5" id="specialists-grid">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h2 class="fw-bold mb-0">👥 Todos los Especialistas</h2>
              <div class="d-flex gap-2">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Buscar..."
                  v-model="searchQuery"
                  style="min-width: 200px;"
                >
                <select class="form-select" v-model="selectedSpecialty">
                  <option value="all">Todas</option>
                  <option value="psicologia">Psicología</option>
                  <option value="psiquiatria">Psiquiatría</option>
                  <option value="terapia">Terapia</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div 
            class="col-xl-4 col-lg-6 mb-4" 
            v-for="(doc, index) in filteredSpecialists" 
            :key="index"
          >
            <div class="card h-100 shadow-sm border-0">
              <div class="card-body text-center p-4">
                <!-- Avatar -->
                <div class="avatar mb-3">
                  <div class="avatar-circle" :style="{ backgroundColor: getAvatarColor(index) }">
                    {{ doc.emoji }}
                  </div>
                  <div class="online-dot" :class="{ online: doc.online }"></div>
                </div>

                <!-- Info -->
                <h5 class="card-title fw-bold">{{ doc.nombre }}</h5>
                <span class="badge bg-primary mb-2">{{ doc.especialidad }}</span>
                
                <div class="rating mb-2">
                  <span class="stars">⭐⭐⭐⭐⭐</span>
                  <small class="text-muted ms-1">({{ doc.rating }})</small>
                </div>

                <p class="card-text text-muted small mb-3">{{ doc.descripcion }}</p>

                <!-- Details -->
                <div class="specialist-details mb-3">
                  <small class="text-muted d-block">🎓 {{ doc.experience }}</small>
                  <small class="text-muted d-block">💵 ${{ doc.precio }}/sesión</small>
                  <small class="text-muted d-block" :class="doc.online ? 'text-success' : 'text-secondary'">
                    {{ doc.online ? '🟢 En línea' : '⚫ No disponible' }}
                  </small>
                </div>

                <!-- Actions -->
                <div class="d-grid gap-2">
                  <button class="btn btn-primary" @click="contactSpecialist(doc)">
                    📞 Contactar
                  </button>
                  <button class="btn btn-outline-primary" @click="viewProfile(doc)">
                    👁️ Ver Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROFILE MODAL -->
    <div v-if="showProfileModal" class="modal-backdrop fade show" @click="showProfileModal = false"></div>
    <div v-if="showProfileModal" class="modal fade show d-block">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">👨‍⚕️ Perfil del Especialista</h5>
            <button type="button" class="btn-close" @click="showProfileModal = false"></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedSpecialist" class="profile-content">
              <div class="row">
                <div class="col-md-4 text-center">
                  <div class="avatar-large mb-3">
                    <div class="avatar-circle large" :style="{ backgroundColor: getAvatarColor(selectedSpecialist.id) }">
                      {{ selectedSpecialist.emoji }}
                    </div>
                  </div>
                  <button class="btn btn-success w-100 mb-2" @click="contactSpecialist(selectedSpecialist)">
                    📅 Agendar Cita
                  </button>
                  <a :href="'mailto:' + selectedSpecialist.email" class="btn btn-outline-primary w-100">
                    ✉️ Enviar Email
                  </a>
                </div>
                <div class="col-md-8">
                  <h4 class="fw-bold">{{ selectedSpecialist.nombre }}</h4>
                  <span class="badge bg-primary fs-6 mb-3">{{ selectedSpecialist.especialidad }}</span>
                  
                  <p class="lead">{{ selectedSpecialist.descripcion }}</p>
                  
                  <div class="row">
                    <div class="col-6">
                      <strong>🎓 Experiencia:</strong>
                      <p>{{ selectedSpecialist.experience }}</p>
                    </div>
                    <div class="col-6">
                      <strong>💵 Precio:</strong>
                      <p>${{ selectedSpecialist.precio }}/sesión</p>
                    </div>
                  </div>

                  <div class="mb-3">
                    <strong>🛠️ Especialidades:</strong>
                    <div class="mt-2">
                      <span 
                        v-for="skill in selectedSpecialist.especialidades" 
                        :key="skill"
                        class="badge bg-light text-dark me-1 mb-1"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Estado
const showProfileModal = ref(false)
const selectedSpecialist = ref(null)
const searchQuery = ref('')
const selectedSpecialty = ref('all')

// Datos de especialistas
const specialists = ref([
  {
    id: 1,
    nombre: "Dra. Maria Gonzalez",
    emoji: "👩‍⚕️",
    especialidad: "Psicología Clínica",
    email: "maria@mindu.com",
    descripcion: "Experta en terapia cognitivo-conductual para el manejo de ansiedad y depresión.",
    rating: 4.9,
    experience: "10+ años",
    precio: 80,
    online: true,
    especialidades: ["Ansiedad", "Depresión", "TOC", "TEPT"]
  },
  {
    id: 2,
    nombre: "Dr. Roberto Diaz",
    emoji: "👨‍⚕️",
    especialidad: "Psiquiatría",
    email: "roberto@mindu.com",
    descripcion: "Especialista en diagnóstico clínico y tratamiento farmacológico.",
    rating: 4.8,
    experience: "8+ años",
    precio: 120,
    online: false,
    especialidades: ["Psiquiatría General", "Farmacología", "Diagnóstico"]
  },
  {
    id: 3,
    nombre: "Lic. Ana Torres",
    emoji: "🧘‍♀️",
    especialidad: "Terapeuta Holística",
    email: "ana@mindu.com",
    descripcion: "Enfoque en mindfulness y gestión emocional para situaciones de estrés laboral.",
    rating: 4.9,
    experience: "6+ años",
    precio: 65,
    online: true,
    especialidades: ["Mindfulness", "Meditación", "Estrés Laboral"]
  },
  {
    id: 4,
    nombre: "Dr. Carlos Mendoza",
    emoji: "👨‍💼",
    especialidad: "Psicología Organizacional",
    email: "carlos@mindu.com",
    descripcion: "Especialista en desarrollo profesional y manejo del estrés laboral.",
    rating: 4.7,
    experience: "12+ años",
    precio: 95,
    online: true,
    especialidades: ["Desarrollo Profesional", "Liderazgo", "Burnout"]
  },
  {
    id: 5,
    nombre: "Dra. Laura Fernandez",
    emoji: "👩‍🎓",
    especialidad: "Psicología Infantil",
    email: "laura@mindu.com",
    descripcion: "Especializada en terapia infantil y apoyo familiar para el desarrollo emocional.",
    rating: 4.9,
    experience: "9+ años",
    precio: 75,
    online: false,
    especialidades: ["Infantil", "Adolescentes", "Familia"]
  },
  {
    id: 6,
    nombre: "Lic. Diego Ramirez",
    emoji: "🧠",
    especialidad: "Coach de Vida",
    email: "diego@mindu.com",
    descripcion: "Coach certificado en desarrollo personal y establecimiento de metas de vida.",
    rating: 4.6,
    experience: "5+ años",
    precio: 60,
    online: true,
    especialidades: ["Coaching", "Metas", "Motivación"]
  }
])

// Filtrado
const filteredSpecialists = computed(() => {
  return specialists.value.filter(specialist => {
    // Filtro de búsqueda
    if (searchQuery.value && 
        !specialist.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        !specialist.especialidad.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }

    // Filtro de especialidad
    if (selectedSpecialty.value !== 'all') {
      if (!specialist.especialidad.toLowerCase().includes(selectedSpecialty.value)) {
        return false
      }
    }

    return true
  })
})

// Métodos
const scrollToSpecialists = () => {
  document.getElementById('specialists-grid')?.scrollIntoView({ behavior: 'smooth' })
}

const viewProfile = (specialist) => {
  selectedSpecialist.value = specialist
  showProfileModal.value = true
}

const contactSpecialist = (specialist) => {
  // Aquí podrías integrar con tu sistema de citas
  alert(`Contactando a ${specialist.nombre}\nEmail: ${specialist.email}`)
}

const getAvatarColor = (index) => {
  const colors = [
    '#ff6b6b', '#51cf66', '#339af0', 
    '#845ef7', '#f06595', '#ffa94d'
  ]
  return colors[index % colors.length]
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

/* Avatar Styles */
.avatar {
  position: relative;
  display: inline-block;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.avatar-circle.large {
  width: 120px;
  height: 120px;
  font-size: 3rem;
}

.online-dot {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #adb5bd;
  border: 2px solid white;
}

.online-dot.online {
  background: #51cf66;
}

/* Card Hover Effects */
.card {
  transition: all 0.3s ease;
  border-radius: 15px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
}

/* Rating Stars */
.rating .stars {
  color: #ffc107;
}

/* Modal Backdrop */
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  border-radius: 15px;
  border: none;
}

/* Specialist Details */
.specialist-details {
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section .display-5 {
    font-size: 2.5rem;
  }
  
  .d-flex.justify-content-between {
    flex-direction: column;
    align-items: start !important;
  }
  
  .d-flex.gap-2 {
    width: 100%;
    margin-top: 1rem;
  }
  
  .form-control, .form-select {
    width: 100% !important;
  }
}

/* Button Styles */
.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* Badge Styles */
.badge {
  font-size: 0.75em;
  padding: 0.5em 0.75em;
  border-radius: 6px;
}

/* Form Styles */
.form-control, .form-select {
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.form-control:focus, .form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* Animation */
.card {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>