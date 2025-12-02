<template>
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
  


  <div class="dashboard-page min-vh-100 bg-light">
    
    <!-- Encabezado con imagen -->
    <div class="header-section bg-gradient-primary text-white py-5 position-relative overflow-hidden">
      <div class="container position-relative z-1">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="d-flex align-items-center mb-3">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                   alt="MindU" class="me-3" style="width: 48px; height: 48px;">
              <div>
                <h1 class="display-6 fw-bold mb-1">👋 Hola, {{ userData.anonId || 'Participante' }}</h1>
                <p class="mb-0 opacity-90">Tu camino hacia el bienestar mental</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 text-md-end">
            <div class="badge-group">
              <span class="badge bg-white text-primary fs-6 px-3 py-2 me-2">
                <img src="https://cdn-icons-png.flaticon.com/512/3069/3069229.png" 
                     alt="Día" class="me-1" style="width: 20px; height: 20px;">
                Día {{ diaActual }} de 14
              </span>
              <span class="badge bg-light text-primary fs-6 px-3 py-2">
                {{ descripcionGrupo }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="position-absolute bottom-0 start-0 w-100 overflow-hidden" style="height: 50px;">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="position-absolute bottom-0">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#f8f9fa"></path>
        </svg>
      </div>
    </div>

    <div class="container py-5">
      
      <!-- Estadísticas principales -->
      <div class="row mb-5">
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="stat-card bg-white p-4 rounded-3 shadow-sm border-0 h-100">
            <div class="d-flex align-items-center mb-3">
              <div class="stat-icon bg-primary rounded-circle p-3 me-3">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135753.png" 
                     alt="Progreso" style="width: 24px; height: 24px; filter: brightness(0) invert(1);">
              </div>
              <div>
                <h6 class="text-muted mb-0 small">Progreso Total</h6>
                <h3 class="fw-bold mb-0">{{ progresoTotal }}%</h3>
              </div>
            </div>
            <div class="progress" style="height: 8px;">
              <div class="progress-bar bg-primary" :style="{ width: progresoTotal + '%' }"></div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="stat-card bg-white p-4 rounded-3 shadow-sm border-0 h-100">
            <div class="d-flex align-items-center mb-3">
              <div class="stat-icon bg-success rounded-circle p-3 me-3">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                     alt="Completados" style="width: 24px; height: 24px; filter: brightness(0) invert(1);">
              </div>
              <div>
                <h6 class="text-muted mb-0 small">Módulos Completados</h6>
                <h3 class="fw-bold mb-0">{{ modulosCompletados.length }} de 7</h3>
              </div>
            </div>
            <div class="text-success small fw-bold">
              {{ Math.round((modulosCompletados.length / 7) * 100) }}% completado
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="stat-card bg-white p-4 rounded-3 shadow-sm border-0 h-100">
            <div class="d-flex align-items-center mb-3">
              <div class="stat-icon bg-warning rounded-circle p-3 me-3">
                <img src="https://cdn-icons-png.flaticon.com/512/2103/2103655.png" 
                     alt="Sesiones" style="width: 24px; height: 24px; filter: brightness(0) invert(1);">
              </div>
              <div>
                <h6 class="text-muted mb-0 small">Sesiones Rápidas</h6>
                <h3 class="fw-bold mb-0">{{ sesionesRapidas }}</h3>
              </div>
            </div>
            <div class="text-warning small fw-bold">
              +{{ sesionesRapidas * 10 }} min de práctica
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="stat-card bg-white p-4 rounded-3 shadow-sm border-0 h-100">
            <div class="d-flex align-items-center mb-3">
              <div class="stat-icon bg-info rounded-circle p-3 me-3">
                <img src="https://cdn-icons-png.flaticon.com/512/3094/3094836.png" 
                     alt="Días" style="width: 24px; height: 24px; filter: brightness(0) invert(1);">
              </div>
              <div>
                <h6 class="text-muted mb-0 small">Días Consecutivos</h6>
                <h3 class="fw-bold mb-0">{{ diasConsecutivos }}</h3>
              </div>
            </div>
            <div class="text-info small fw-bold">
              ¡Sigue así!
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de módulos -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold text-primary">
              <img src="https://cdn-icons-png.flaticon.com/512/3094/3094836.png" 
                   alt="Camino" class="me-2" style="width: 32px; height: 32px;">
              Tu Camino de Bienestar
            </h3>
            <span class="badge bg-light text-primary fs-6 px-3 py-2">
              {{ modulosCompletados.length }} de 7 módulos
            </span>
          </div>
          
          <!-- Barra de progreso de módulos -->
          <div class="modules-progress mb-5">
            <div class="d-flex justify-content-between position-relative">
              <div class="progress-line position-absolute top-50 start-0 end-0" 
                   style="height: 4px; background: #dee2e6; z-index: 1;"></div>
              <div v-for="mod in listaModulos" :key="mod.id" 
                   class="module-step position-relative z-2 text-center" style="flex: 1;">
                <div class="step-indicator mx-auto mb-2" 
                     :class="{
                       'step-active': esCompletado(mod.id) || esDisponible(mod.id),
                       'step-completed': esCompletado(mod.id),
                       'step-blocked': esBloqueado(listaModulos.indexOf(mod))
                     }"
                     @click="!esBloqueado(listaModulos.indexOf(mod)) && irAModulo(mod.id)">
                  <img :src="mod.icon" :alt="mod.titulo" style="width: 24px; height: 24px;">
                </div>
                <div class="step-label small fw-bold">{{ mod.titulo.split(' ')[0] }}</div>
                <div class="step-duration text-muted extra-small">{{ mod.duracion }}</div>
              </div>
            </div>
          </div>

          <!-- Grid de módulos -->
          <div class="row">
            <div class="col-md-6 col-lg-4 mb-4" v-for="(mod, index) in listaModulos" :key="mod.id">
              <div class="module-card card h-100 border-0 shadow-sm" 
                   :class="{ 
                     'module-completed': esCompletado(mod.id),
                     'module-blocked': esBloqueado(index),
                     'module-available': esDisponible(mod.id)
                   }">
                <div class="card-body p-4 position-relative">
                  
                  <!-- Estado del módulo -->
                  <div class="module-status d-flex justify-content-between align-items-start mb-3">
                    <span class="badge rounded-pill px-3 py-2" 
                          :class="{
                            'bg-success': esCompletado(mod.id),
                            'bg-secondary': esBloqueado(index),
                            'bg-primary': esDisponible(mod.id)
                          }">
                      <img :src="mod.icon" :alt="mod.titulo" class="me-1" style="width: 16px; height: 16px;">
                      {{ esCompletado(mod.id) ? 'Completado' : 
                         (esBloqueado(index) ? 'Bloqueado' : 'Disponible') }}
                    </span>
                    <span class="text-muted small d-flex align-items-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png" 
                           alt="Tiempo" class="me-1" style="width: 14px; height: 14px;">
                      {{ mod.duracion }}
                    </span>
                  </div>

                  <!-- Contenido del módulo -->
                  <div class="module-content">
                    <h5 class="card-title fw-bold mb-3">{{ mod.titulo }}</h5>
                    <p class="card-text text-muted small mb-4">{{ mod.desc }}</p>
                    
                    <div class="module-image mb-3 rounded-3 overflow-hidden" style="height: 120px;">
                      <img :src="mod.image" :alt="mod.titulo" 
                           class="img-fluid w-100 h-100" style="object-fit: cover;">
                    </div>

                    <button 
                      v-if="!esBloqueado(index)" 
                      @click="irAModulo(mod.id)"
                      class="btn w-100 mt-3 d-flex align-items-center justify-content-center"
                      :class="esCompletado(mod.id) ? 'btn-outline-success' : 'btn-primary'">
                      <img :src="mod.actionIcon" :alt="mod.titulo" class="me-2" style="width: 20px; height: 20px;">
                      {{ esCompletado(mod.id) ? 'Repasar Módulo' : 'Comenzar' }}
                    </button>
                    <button v-else disabled class="btn btn-light w-100 mt-3 text-muted d-flex align-items-center justify-content-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png" 
                           alt="Bloqueado" class="me-2" style="width: 16px; height: 16px;">
                      Completa el anterior
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de sesiones rápidas -->
      <div class="row mb-5" v-if="diaActual < 15">
        <div class="col-12">
          <div class="card border-0 shadow-sm bg-gradient-info text-white overflow-hidden">
            <div class="row g-0">
              <div class="col-md-8">
                <div class="card-body p-5">
                  <h3 class="fw-bold mb-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/2103/2103655.png" 
                         alt="Sesiones rápidas" class="me-2" style="width: 32px; height: 32px;">
                    ¿Necesitas un descanso rápido?
                  </h3>
                  <p class="mb-4 opacity-90">
                    Las sesiones rápidas cuentan para tu progreso total. 
                    Cada sesión rápida suma 10 minutos a tu práctica.
                  </p>
                  <div class="d-flex flex-wrap gap-3">
                    <button @click="iniciarSesionRapida('meditacion')" 
                            class="btn btn-light px-4 py-3 fw-bold d-flex align-items-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/2103/2103655.png" 
                           alt="Meditación" class="me-2" style="width: 24px; height: 24px;">
                      Meditación 5 min
                    </button>
                    <button @click="iniciarSesionRapida('respiracion')" 
                            class="btn btn-outline-light px-4 py-3 fw-bold d-flex align-items-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/3237/3237477.png" 
                           alt="Respiración" class="me-2" style="width: 24px; height: 24px;">
                      Respiración 3 min
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 d-none d-md-block">
                <div class="h-100" style="background: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje de finalización -->
      <div v-if="diaActual >= 15 && !userData.postTestCompletado" 
           class="row mb-5">
        <div class="col-12">
          <div class="card border-0 shadow-lg bg-gradient-success text-white overflow-hidden">
            <div class="card-body p-5 text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3069/3069229.png" 
                   alt="Felicidades" class="mb-4" style="width: 80px; height: 80px;">
              <h2 class="fw-bold mb-3">🎉 ¡Has completado los 14 días!</h2>
              <p class="lead mb-4">Es momento de ver cuánto has avanzado en tu bienestar mental.</p>
              <div class="d-flex flex-wrap justify-content-center gap-3">
                <button @click="$router.push('/post-test')" 
                        class="btn btn-light btn-lg px-5 py-3 fw-bold">
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135753.png" 
                       alt="Evaluación" class="me-2" style="width: 24px; height: 24px;">
                  Realizar Evaluación Final
                </button>
                <button @click="verResultadosParciales" 
                        class="btn btn-outline-light btn-lg px-5 py-3 fw-bold">
                  Ver mi progreso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const router = useRouter();
const userData = ref({});
const modulosCompletados = ref([]);
const sesionesRapidas = ref(0);
const diasConsecutivos = ref(1);
const diaActual = ref(1);

// Datos de módulos mejorados con imágenes
const listaModulos = [
  { 
    id: 1, 
    titulo: "Introducción a la Salud Mental", 
    duracion: "5 min", 
    desc: "¿Qué es la salud mental y por qué es importante cuidarla?",
    icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828696.png',
    actionIcon: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 2, 
    titulo: "Entendiendo la Ansiedad", 
    duracion: "7 min", 
    desc: "Comprendiendo los mecanismos del miedo y la preocupación.",
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069307.png',
    actionIcon: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 3, 
    titulo: "Conociendo la Depresión", 
    duracion: "7 min", 
    desc: "Diferencia entre tristeza normal y depresión clínica.",
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069231.png',
    actionIcon: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 4, 
    titulo: "Manejo del Estrés", 
    duracion: "10 min", 
    desc: "Técnicas prácticas para reducir el estrés diario.",
    icon: 'https://cdn-icons-png.flaticon.com/512/3595/3595458.png',
    actionIcon: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 5, 
    titulo: "Respiración Consciente", 
    duracion: "5 min", 
    desc: "El poder del diafragma y la respiración profunda.",
    icon: 'https://cdn-icons-png.flaticon.com/512/3237/3237477.png',
    actionIcon: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 6, 
    titulo: "Relajación Muscular", 
    duracion: "8 min", 
    desc: "Técnicas para soltar la tensión física acumulada.",
    icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103655.png',
    actionIcon: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 7, 
    titulo: "Pensamientos Positivos", 
    duracion: "10 min", 
    desc: "Identificando y transformando pensamientos negativos.",
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069229.png',
    actionIcon: 'https://cdn-icons-png.flaticon.com/512/709/709612.png',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Computed properties
const progresoTotal = computed(() => {
  const modulosProgreso = (modulosCompletados.value.length / 7) * 60;
  const sesionesProgreso = Math.min((sesionesRapidas.value / 10) * 30, 30);
  const diasProgreso = Math.min((diasConsecutivos.value / 14) * 10, 10);
  return Math.round(modulosProgreso + sesionesProgreso + diasProgreso);
});

const descripcionGrupo = computed(() => {
  const g = userData.value.grupo || '';
  if (g.includes('A+')) return "Versión Interactiva";
  return "Versión Lectura";
});

onMounted(async () => {
  // Cargar datos locales
  const localData = localStorage.getItem('mindu_data');
  
  if (!localData) {
    router.push('/pre-test');
    return;
  }

  userData.value = JSON.parse(localData);
  modulosCompletados.value = userData.value.modulosCompletados || [];
  sesionesRapidas.value = userData.value.sesionesRapidas || 0;
  
  // Calcular días consecutivos
  const fechaInicio = new Date(userData.value.fechaInicio);
  const hoy = new Date();
  const diffTime = Math.abs(hoy - fechaInicio);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  diasConsecutivos.value = Math.min(diffDays, 14);
  diaActual.value = Math.min(diffDays + 1, 15);
});

// Funciones auxiliares
const esCompletado = (id) => modulosCompletados.value.includes(id);

const esBloqueado = (index) => {
  if (index === 0) return false;
  return !modulosCompletados.value.includes(listaModulos[index - 1].id);
};

const esDisponible = (id) => {
  return !esCompletado(id) && !esBloqueado(listaModulos.findIndex(m => m.id === id));
};

const irAModulo = (id) => {
  router.push(`/modulo/${id}`);
};

const iniciarSesionRapida = async (tipo) => {
  sesionesRapidas.value++;
  
  // Actualizar localStorage
  userData.value.sesionesRapidas = sesionesRapidas.value;
  localStorage.setItem('mindu_data', JSON.stringify(userData.value));
  
  // Actualizar Firestore
  const user = auth.currentUser;
  if (user) {
    await updateDoc(doc(db, "participantes", user.uid), {
      sesionesRapidas: sesionesRapidas.value
    });
  }
  
  // Redirigir a la sesión rápida
  if (tipo === 'meditacion') {
    router.push('/meditacion');
  } else {
    router.push('/meditacion');
  }
};

const verResultadosParciales = () => {
  router.push('/resultados-parciales');
};
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-info {
  background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%);
}

.bg-gradient-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.stat-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
  border-color: #dee2e6;
}

.stat-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Progress steps */
.modules-progress {
  position: relative;
  padding: 20px 0;
}

.progress-line {
  background: linear-gradient(90deg, #28a745, #0d6efd, #17a2b8);
}

.step-indicator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid #dee2e6;
  background: white;
}

.step-active {
  border-color: #0d6efd;
  background: #f8f9fa;
}

.step-completed {
  border-color: #28a745;
  background: #28a745;
}

.step-completed img {
  filter: brightness(0) invert(1);
}

.step-blocked {
  border-color: #dee2e6;
  background: #f8f9fa;
  opacity: 0.6;
  cursor: not-allowed;
}

.step-label {
  color: #495057;
}

.step-duration {
  font-size: 0.75rem;
}

/* Module cards */
.module-card {
  transition: all 0.3s ease;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
}

.module-completed {
  border-left: 4px solid #28a745 !important;
}

.module-blocked {
  opacity: 0.7;
}

.module-available {
  border-left: 4px solid #0d6efd !important;
}

.module-status .badge {
  font-size: 0.8rem;
}

.module-image {
  transition: transform 0.5s ease;
}

.module-card:hover .module-image {
  transform: scale(1.05);
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border: none;
}

.btn-outline-success {
  color: #28a745;
  border-color: #28a745;
}

.btn-outline-success:hover {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .display-6 {
    font-size: 1.5rem;
  }
  
  .modules-progress .step-indicator {
    width: 40px;
    height: 40px;
  }
  
  .step-label {
    font-size: 0.75rem;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
  }
}
</style>