<template>
  <div class="gracias-page min-vh-100 bg-gradient-primary">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-6">
          
          <!-- Tarjeta principal -->
          <div class="card border-0 shadow-lg overflow-hidden">
            
            <!-- Encabezado con animación -->
            <div class="card-header bg-white text-center position-relative py-5 overflow-hidden">
              <div class="confetti-container">
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
                <div class="confetti"></div>
              </div>
              
              <div class="position-relative z-1">
                <div class="celebration-icon mb-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/3069/3069229.png" 
                       alt="Celebración" class="img-fluid" style="width: 100px; height: 100px;">
                </div>
                <h1 class="display-5 fw-bold text-primary mb-3">¡Gracias por Completar la Evaluación! 🎉</h1>
                <p class="lead text-muted mb-0">Tu compromiso con tu bienestar es el primer paso hacia el cambio</p>
              </div>
            </div>

            <!-- Contenido -->
            <div class="card-body p-4 p-md-5">
              
              <!-- Resultados -->
              <div class="results-section mb-5">
                <h4 class="fw-bold text-center mb-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135753.png" 
                       alt="Resultados" class="me-2" style="width: 32px; height: 32px;">
                  Tus Puntajes Iniciales
                </h4>
                
                <div class="row g-4">
                  <!-- Ansiedad -->
                  <div class="col-md-6">
                    <div class="score-card bg-light-primary p-4 rounded-3 border border-primary border-2">
                      <div class="d-flex align-items-center mb-3">
                        <div class="score-icon bg-primary rounded-circle p-3 me-3">
                          <img src="https://cdn-icons-png.flaticon.com/512/3069/3069307.png" 
                               alt="Ansiedad" style="width: 24px; height: 24px; filter: brightness(0) invert(1);">
                        </div>
                        <div>
                          <h6 class="text-muted mb-0 small">Ansiedad (GAD-7)</h6>
                          <h2 class="fw-bold mb-0">{{ puntajeGAD7 }}</h2>
                        </div>
                      </div>
                      <div class="progress" style="height: 10px;">
                        <div class="progress-bar bg-primary" 
                             :style="{ width: Math.min((puntajeGAD7/21)*100, 100) + '%' }"></div>
                      </div>
                      <div class="mt-2">
                        <span class="badge" :class="nivelGAD7.color">
                          {{ nivelGAD7.nivel }}
                        </span>
                        <small class="text-muted ms-2">{{ nivelGAD7.descripcion }}</small>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Depresión -->
                  <div class="col-md-6">
                    <div class="score-card bg-light-info p-4 rounded-3 border border-info border-2">
                      <div class="d-flex align-items-center mb-3">
                        <div class="score-icon bg-info rounded-circle p-3 me-3">
                          <img src="https://cdn-icons-png.flaticon.com/512/3069/3069231.png" 
                               alt="Depresión" style="width: 24px; height: 24px; filter: brightness(0) invert(1);">
                        </div>
                        <div>
                          <h6 class="text-muted mb-0 small">Depresión (PHQ-9)</h6>
                          <h2 class="fw-bold mb-0">{{ puntajePHQ9 }}</h2>
                        </div>
                      </div>
                      <div class="progress" style="height: 10px;">
                        <div class="progress-bar bg-info" 
                             :style="{ width: Math.min((puntajePHQ9/27)*100, 100) + '%' }"></div>
                      </div>
                      <div class="mt-2">
                        <span class="badge" :class="nivelPHQ9.color">
                          {{ nivelPHQ9.nivel }}
                        </span>
                        <small class="text-muted ms-2">{{ nivelPHQ9.descripcion }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Retroalimentación -->
              <div class="feedback-section mb-5">
                <div class="feedback-card bg-light border-0 rounded-3 p-4">
                  <div class="d-flex align-items-start mb-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                         alt="Retroalimentación" class="me-3 mt-1" style="width: 32px; height: 32px;">
                    <div>
                      <h5 class="fw-bold text-primary mb-2">📋 Retroalimentación Personalizada</h5>
                      <p class="text-muted">
                        Basado en tus respuestas, hemos identificado algunas áreas donde 
                        <span class="fw-bold text-primary">MindU</span> puede ayudarte. 
                        Tu puntaje inicial es una referencia importante para medir tu progreso.
                      </p>
                      
                      <div class="alert alert-success border-0 mt-3">
                        <div class="d-flex align-items-center">
                          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                               alt="Recomendación" class="me-3" style="width: 24px; height: 24px;">
                          <div>
                            <strong>Recomendación:</strong> 
                            <span v-if="puntajeGAD7 > 10 || puntajePHQ9 > 10">
                              Te sugerimos comenzar con los módulos de manejo de estrés y ansiedad.
                            </span>
                            <span v-else>
                              Te sugerimos comenzar con los módulos de introducción y bienestar general.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Próximos pasos -->
              <div class="next-steps-section mb-5">
                <div class="timeline-card bg-white border rounded-3 p-4 shadow-sm">
                  <h5 class="fw-bold text-primary mb-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/3595/3595458.png" 
                         alt="Próximos pasos" class="me-2" style="width: 28px; height: 28px;">
                    Tu Plan de 14 Días
                  </h5>
                  
                  <div class="timeline">
                    <div class="timeline-item">
                      <div class="timeline-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                        1
                      </div>
                      <div class="timeline-content">
                        <h6 class="fw-bold mb-1">Completar 7 módulos educativos</h6>
                        <p class="text-muted small mb-0">1 módulo cada 2 días aproximadamente</p>
                      </div>
                    </div>
                    
                    <div class="timeline-item">
                      <div class="timeline-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center">
                        2
                      </div>
                      <div class="timeline-content">
                        <h6 class="fw-bold mb-1">Realizar sesiones prácticas</h6>
                        <p class="text-muted small mb-0">Meditación y respiración diaria recomendada</p>
                      </div>
                    </div>
                    
                    <div class="timeline-item">
                      <div class="timeline-icon bg-info text-white rounded-circle d-flex align-items-center justify-content-center">
                        3
                      </div>
                      <div class="timeline-content">
                        <h6 class="fw-bold mb-1">Registro diario de ánimo</h6>
                        <p class="text-muted small mb-0">Seguimiento de tu progreso emocional</p>
                      </div>
                    </div>
                    
                    <div class="timeline-item">
                      <div class="timeline-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center">
                        4
                      </div>
                      <div class="timeline-content">
                        <h6 class="fw-bold mb-1">Evaluación Final (Día 15)</h6>
                        <p class="text-muted small mb-0">Compararás tus resultados iniciales vs finales</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="alert alert-info border-0 mt-4">
                    <div class="d-flex align-items-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                           alt="Recordatorio" class="me-3" style="width: 24px; height: 24px;">
                      <div>
                        <strong>Recordatorio importante:</strong> 
                        Después de completar los 14 días, realizarás una evaluación final 
                        para medir tu progreso y ver cuánto has avanzado.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Opciones de navegación -->
              <div class="navigation-section">
                <h5 class="fw-bold text-center mb-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" 
                       alt="Continuar" class="me-2" style="width: 28px; height: 28px;">
                  ¿Qué te gustaría hacer ahora?
                </h5>
                
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="option-card bg-white border rounded-3 p-4 text-center h-100 shadow-sm hover-lift">
                      <div class="option-icon mb-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" 
                             alt="Dashboard" style="width: 64px; height: 64px;">
                      </div>
                      <h5 class="fw-bold mb-3">Ir al Dashboard</h5>
                      <p class="text-muted small mb-4">
                        Comienza tu primer módulo educativo y sigue tu progreso día a día
                      </p>
                      <button @click="irADashboard" class="btn btn-primary w-100 py-3 fw-bold">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135753.png" 
                             alt="Dashboard" class="me-2" style="width: 20px; height: 20px;">
                        Comenzar Mi Camino
                      </button>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="option-card bg-white border rounded-3 p-4 text-center h-100 shadow-sm hover-lift">
                      <div class="option-icon mb-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                             alt="Home" style="width: 64px; height: 64px;">
                      </div>
                      <h5 class="fw-bold mb-3">Ir al Home</h5>
                      <p class="text-muted small mb-4">
                        Explora todas las herramientas de MindU antes de comenzar los módulos
                      </p>
                      <button @click="irAHome" class="btn btn-outline-primary w-100 py-3 fw-bold">
                        <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" 
                             alt="Home" class="me-2" style="width: 20px; height: 20px;">
                        Explorar MindU
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mensaje de motivación -->
              <div class="motivation-card bg-gradient-success text-white border-0 rounded-3 p-4 mt-5 text-center">
                <div class="d-flex align-items-center justify-content-center mb-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/3069/3069210.png" 
                       alt="Motivación" class="me-3" style="width: 48px; height: 48px;">
                  <h4 class="fw-bold mb-0">¡Tú puedes hacerlo! 💪</h4>
                </div>
                <p class="mb-0 opacity-90">
                  Cada pequeño paso cuenta. En 14 días podrás ver cambios significativos 
                  en tu bienestar mental. ¡Confía en el proceso!
                </p>
              </div>

            </div>
          </div>

          <!-- Pie de página -->
          <div class="text-center mt-4">
            <p class="text-muted small">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                   alt="Privacidad" class="me-1" style="width: 14px; height: 14px;">
              Tus resultados son privados y están protegidos. Solo tú tienes acceso a ellos.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const puntajeGAD7 = ref(0);
const puntajePHQ9 = ref(0);

// Cargar datos del usuario
onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('mindu_data') || '{}');
  puntajeGAD7.value = userData.gad7_pre || 0;
  puntajePHQ9.value = userData.phq9_pre || 0;
});

// Interpretación de niveles GAD-7
const nivelGAD7 = computed(() => {
  const score = puntajeGAD7.value;
  
  if (score >= 0 && score <= 4) {
    return {
      nivel: 'Ansiedad Mínima',
      descripcion: 'Síntomas de ansiedad dentro del rango normal',
      color: 'bg-success'
    };
  } else if (score >= 5 && score <= 9) {
    return {
      nivel: 'Ansiedad Leve',
      descripcion: 'Podría beneficiarse de técnicas de manejo',
      color: 'bg-info'
    };
  } else if (score >= 10 && score <= 14) {
    return {
      nivel: 'Ansiedad Moderada',
      descripcion: 'Podría necesitar apoyo profesional',
      color: 'bg-warning'
    };
  } else {
    return {
      nivel: 'Ansiedad Severa',
      descripcion: 'Se recomienda buscar apoyo profesional',
      color: 'bg-danger'
    };
  }
});

// Interpretación de niveles PHQ-9
const nivelPHQ9 = computed(() => {
  const score = puntajePHQ9.value;
  
  if (score >= 0 && score <= 4) {
    return {
      nivel: 'Depresión Mínima',
      descripcion: 'Síntomas de depresión dentro del rango normal',
      color: 'bg-success'
    };
  } else if (score >= 5 && score <= 9) {
    return {
      nivel: 'Depresión Leve',
      descripcion: 'Síntomas leves que podrían mejorar con intervención',
      color: 'bg-info'
    };
  } else if (score >= 10 && score <= 14) {
    return {
      nivel: 'Depresión Moderada',
      descripcion: 'Podría beneficiarse de tratamiento profesional',
      color: 'bg-warning'
    };
  } else if (score >= 15 && score <= 19) {
    return {
      nivel: 'Depresión Moderadamente Severa',
      descripcion: 'Se recomienda evaluación profesional',
      color: 'bg-danger'
    };
  } else {
    return {
      nivel: 'Depresión Severa',
      descripcion: 'Se recomienda atención profesional inmediata',
      color: 'bg-danger'
    };
  }
});

const irADashboard = () => {
  router.push('/dashboard');
};

const irAHome = () => {
  router.push('/home');
};
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

/* Animación de confeti */
.confetti-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 20px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3);
  opacity: 0.8;
  animation: fall 5s linear infinite;
}

.confetti:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
  background: #ff6b6b;
}

.confetti:nth-child(2) {
  left: 20%;
  animation-delay: 1s;
  background: #4ecdc4;
}

.confetti:nth-child(3) {
  left: 30%;
  animation-delay: 2s;
  background: #45b7d1;
}

.confetti:nth-child(4) {
  left: 40%;
  animation-delay: 3s;
  background: #96ceb4;
}

.confetti:nth-child(5) {
  left: 60%;
  animation-delay: 4s;
  background: #feca57;
}

.confetti:nth-child(6) {
  left: 80%;
  animation-delay: 5s;
  background: #ff9ff3;
}

@keyframes fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(500px) rotate(360deg);
    opacity: 0;
  }
}

/* Tarjetas de puntaje */
.score-card {
  transition: all 0.3s ease;
}

.score-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.score-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-light-primary {
  background-color: rgba(13, 110, 253, 0.1);
}

.bg-light-info {
  background-color: rgba(23, 162, 184, 0.1);
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
  display: flex;
  align-items: flex-start;
}

.timeline-icon {
  position: absolute;
  left: -40px;
  width: 32px;
  height: 32px;
  font-weight: bold;
  font-size: 0.9rem;
}

.timeline-content {
  flex: 1;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -25px;
  top: 32px;
  bottom: -25px;
  width: 2px;
  background: #dee2e6;
}

.timeline-item:last-child::before {
  display: none;
}

/* Tarjetas de opción */
.option-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.option-card:hover {
  border-color: #0d6efd;
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.hover-lift:hover {
  transform: translateY(-5px);
}

.option-icon {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Botones */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-outline-primary {
  color: #667eea;
  border-color: #667eea;
}

.btn-outline-primary:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

/* Motivación */
.bg-gradient-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

/* Responsive */
@media (max-width: 768px) {
  .display-5 {
    font-size: 2rem;
  }
  
  .timeline {
    padding-left: 20px;
  }
  
  .timeline-icon {
    left: -30px;
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }
  
  .score-icon {
    width: 48px;
    height: 48px;
  }
}
</style>