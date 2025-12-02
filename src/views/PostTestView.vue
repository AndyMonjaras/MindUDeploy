<template>
  <div class="post-test-page min-vh-100 bg-light">
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
    <section class="hero-section bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold mb-4">Evaluación Final</h1>
            <p class="lead mb-4 opacity-90">
              Has completado los 14 días del programa MindU. 
              Responde esta evaluación para ver tu progreso y resultados finales.
            </p>
            <div class="d-flex gap-3 flex-wrap">
              <div class="badge bg-white text-primary p-2 fs-6">
                🏁 Completado 100%
              </div>
              <div class="badge bg-light text-success p-2 fs-6">
                ⭐ Evaluación de Seguimiento
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="hero-illustration">
              <img src="https://cdn-icons-png.flaticon.com/512/3069/3069229.png" 
                   alt="Celebración" class="img-fluid" style="max-height: 200px;">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <section class="stats-bar py-3 bg-white border-bottom">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-primary mb-1">14</h4>
              <small class="text-muted">Días Completados</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-success mb-1">100%</h4>
              <small class="text-muted">Progreso del Programa</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-info mb-1">2</h4>
              <small class="text-muted">Evaluaciones Hechas</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stat-item">
              <h4 class="fw-bold text-warning mb-1">🏆</h4>
              <small class="text-muted">Logro Final</small>
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
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-header bg-transparent">
              <h5 class="mb-0">📊 Tu Progreso</h5>
            </div>
            <div class="card-body">
              <div class="progress-card mb-3">
                <h6 class="text-muted mb-2">Programa Completo</h6>
                <div class="progress mb-2" style="height: 20px;">
                  <div class="progress-bar bg-success" style="width: 100%">
                    100%
                  </div>
                </div>
                <small class="text-muted">14/14 días completados</small>
              </div>
              
              <div class="progress-card mb-3">
                <h6 class="text-muted mb-2">Meditaciones</h6>
                <div class="progress mb-2" style="height: 20px;">
                  <div class="progress-bar bg-info" style="width: 85%">
                    85%
                  </div>
                </div>
                <small class="text-muted">17/20 sesiones completadas</small>
              </div>
              
              <div class="progress-card">
                <h6 class="text-muted mb-2">Tests Completados</h6>
                <div class="d-flex align-items-center">
                  <div class="circle-progress me-3">
                    <div class="circle-bg">
                      <div class="circle-fill" style="transform: rotate(180deg);"></div>
                    </div>
                    <span class="circle-text">1/2</span>
                  </div>
                  <div>
                    <small class="text-muted d-block">Inicial: Completado</small>
                    <small class="text-muted d-block">Final: En progreso</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- INFO CARD -->
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <div class="d-flex align-items-start mb-3">
                <div class="icon-circle bg-light-primary me-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                       alt="Info" style="width: 20px; height: 20px;">
                </div>
                <div>
                  <h6 class="fw-bold mb-1">Importante</h6>
                  <p class="small text-muted mb-0">
                    Esta evaluación compara tus resultados iniciales con los actuales para mostrar tu progreso.
                  </p>
                </div>
              </div>
              
              <div class="d-flex align-items-start">
                <div class="icon-circle bg-light-success me-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/2913/2913394.png" 
                       alt="Tiempo" style="width: 20px; height: 20px;">
                </div>
                <div>
                  <h6 class="fw-bold mb-1">Tiempo Estimado</h6>
                  <p class="small text-muted mb-0">
                    5-7 minutos para completar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="col-lg-9">
          <div class="card border-0 shadow-lg mb-4">
            <div class="card-body p-4 p-md-5">
              <!-- Intro -->
              <div class="text-center mb-5">
                <div class="icon-circle-lg bg-gradient-success mb-4 mx-auto">
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                       alt="MindU" style="width: 40px; height: 40px;">
                </div>
                <h4 class="fw-bold text-primary mb-3">Evaluación de Seguimiento</h4>
                <p class="lead text-muted">
                  Por favor, responde estas preguntas pensando en cómo te has sentido 
                  <span class="fw-bold text-success">la última semana</span>.
                </p>
                
                <div class="alert alert-light border-success border-start-4 d-inline-flex align-items-center px-4 py-3 mb-0">
                  <div class="me-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                         alt="Info" style="width: 24px; height: 24px;">
                  </div>
                  <div class="text-start">
                    <strong>Recuerda:</strong> Esta evaluación nos ayuda a medir tu progreso y 
                    entender qué tan efectivo ha sido el programa para ti.
                  </div>
                </div>
              </div>

              <!-- Scale Guide -->
              <div class="scale-guide bg-light rounded-3 p-4 mb-5">
                <h6 class="fw-bold text-primary mb-3">📏 Escala de Respuestas</h6>
                <div class="row g-3">
                  <div class="col-3" v-for="(label, index) in escalaLabels" :key="index">
                    <div class="scale-card text-center p-3 rounded-3 bg-white border h-100">
                      <div class="scale-number bg-primary text-white rounded-circle mb-2 mx-auto" 
                           style="width: 40px; height: 40px; line-height: 40px; font-size: 1.2rem;">
                        {{ index }}
                      </div>
                      <div class="scale-label fw-bold text-dark">{{ label }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <form @submit.prevent="guardarPostTest">
                <!-- GAD-7 Section -->
                <div class="section-card border-0 rounded-3 overflow-hidden shadow-sm mb-5">
                  <div class="section-header bg-gradient-success text-white p-4">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <div class="icon-circle bg-white bg-opacity-25 me-3 p-2">
                          <img src="https://cdn-icons-png.flaticon.com/512/3069/3069307.png" 
                               alt="Ansiedad" style="width: 24px; height: 24px;">
                        </div>
                        <div>
                          <h5 class="mb-0 fw-bold">Síntomas de Ansiedad</h5>
                          <small class="opacity-90">GAD-7 - Última semana</small>
                        </div>
                      </div>
                      <span class="badge bg-light text-success">7 preguntas</span>
                    </div>
                  </div>
                  <div class="section-body p-4 bg-white">
                    <div class="questions-grid">
                      <div v-for="(item, index) in gad7Items" :key="'gad'+index" 
                           class="question-card p-4 border rounded-3 bg-light mb-3">
                        <label class="mb-3 fw-bold text-success d-flex align-items-start">
                          <span class="badge bg-success me-3 mt-1">{{ index + 1 }}</span>
                          <span>{{ item }}</span>
                        </label>
                        <div class="rating-scale">
                          <div class="scale-options d-flex justify-content-between">
                            <div v-for="val in 4" :key="val" class="scale-option">
                              <input :id="'post_gad'+index+'_'+(val-1)" 
                                     class="form-check-input visually-hidden" 
                                     type="radio" 
                                     :name="'post_gad'+index" 
                                     :value="val-1" 
                                     v-model="respuestasGAD7[index]" 
                                     required>
                              <label :for="'post_gad'+index+'_'+(val-1)" 
                                     class="scale-option-btn">
                                <span class="scale-option-value">{{ val-1 }}</span>
                                <span class="scale-option-label small">{{ escalaLabels[val-1] }}</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- PHQ-9 Section -->
                <div class="section-card border-0 rounded-3 overflow-hidden shadow-sm mb-5">
                  <div class="section-header bg-gradient-info text-white p-4">
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <div class="icon-circle bg-white bg-opacity-25 me-3 p-2">
                          <img src="https://cdn-icons-png.flaticon.com/512/3069/3069231.png" 
                               alt="Depresión" style="width: 24px; height: 24px;">
                        </div>
                        <div>
                          <h5 class="mb-0 fw-bold">Síntomas de Depresión</h5>
                          <small class="opacity-90">PHQ-9 - Última semana</small>
                        </div>
                      </div>
                      <span class="badge bg-light text-info">9 preguntas</span>
                    </div>
                  </div>
                  <div class="section-body p-4 bg-white">
                    <div class="questions-grid">
                      <div v-for="(item, index) in phq9Items" :key="'phq'+index" 
                           class="question-card p-4 border rounded-3 bg-light mb-3">
                        <label class="mb-3 fw-bold text-info d-flex align-items-start">
                          <span class="badge bg-info me-3 mt-1">{{ index + 1 }}</span>
                          <span>{{ item }}</span>
                        </label>
                        <div class="rating-scale">
                          <div class="scale-options d-flex justify-content-between">
                            <div v-for="val in 4" :key="val" class="scale-option">
                              <input :id="'post_phq'+index+'_'+(val-1)" 
                                     class="form-check-input visually-hidden" 
                                     type="radio" 
                                     :name="'post_phq'+index" 
                                     :value="val-1" 
                                     v-model="respuestasPHQ9[index]" 
                                     required>
                              <label :for="'post_phq'+index+'_'+(val-1)" 
                                     class="scale-option-btn">
                                <span class="scale-option-value">{{ val-1 }}</span>
                                <span class="scale-option-label small">{{ escalaLabels[val-1] }}</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Final Section -->
                <div class="final-section bg-light rounded-3 p-5 text-center mb-4">
                  <div class="icon-circle-lg bg-gradient-success mb-3 mx-auto">
                    <img src="https://cdn-icons-png.flaticon.com/512/3069/3069210.png" 
                         alt="Gracias" style="width: 32px; height: 32px;">
                  </div>
                  <h4 class="fw-bold text-success mb-3">¡Gracias por tu compromiso! 🙏</h4>
                  <p class="text-muted">
                    Tus respuestas nos ayudan a mejorar el programa y apoyar a más personas 
                    en su camino hacia el bienestar mental.
                  </p>
                  
                  <div class="mt-4">
                    <button type="submit" 
                            class="btn btn-success btn-lg px-5 py-3 fw-bold shadow-lg"
                            :disabled="!todasRespondidas">
                      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135753.png" 
                           alt="Resultados" class="me-2" style="width: 24px; height: 24px;">
                      Ver Mis Resultados 📊
                    </button>
                    
                    <div v-if="!todasRespondidas" class="mt-3">
                      <small class="text-danger">
                        ⚠️ Por favor responde todas las preguntas antes de continuar
                      </small>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Progress Footer -->
          <div class="text-center mt-4">
            <p class="text-muted small">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" 
                   alt="Privacidad" class="me-1" style="width: 14px; height: 14px;">
              Tus resultados son privados y solo tú podrás verlos
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTIFICATION CONTAINER -->
    <div class="notification-container position-fixed top-0 end-0 p-3" style="z-index: 9999">
      <!-- Notifications will appear here -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const router = useRouter();
const respuestasGAD7 = ref(Array(7).fill(null));
const respuestasPHQ9 = ref(Array(9).fill(null));
const userData = ref({});

const escalaLabels = [
  'Nunca',
  'Varios días',
  'Más de la mitad',
  'Casi todos los días'
];

const gad7Items = [
  "Nerviosismo, ansiedad o sensación de estar al límite",
  "No poder dejar de preocuparse ni controlar la preocupación",
  "Preocuparse demasiado por diferentes cosas",
  "Dificultad para relajarse",
  "Estar tan inquieto que cuesta quedarse quieto",
  "Irritarse o enfadarse fácilmente",
  "Sentir miedo como si algo terrible fuera a suceder"
];

const phq9Items = [
  "Poco interés o placer en hacer cosas",
  "Sentirse desanimado, deprimido o sin esperanza",
  "Problemas para dormir o dormir demasiado",
  "Sentirse cansado o con poca energía",
  "Poco apetito o comer en exceso",
  "Sentirse mal con uno mismo (fracaso)",
  "Dificultad para concentrarse",
  "Moverse/hablar lento o estar inquieto",
  "Pensamientos de estar mejor muerto o lastimarse"
];

// Computed para verificar si todas están respondidas
const todasRespondidas = computed(() => {
  return !respuestasGAD7.value.includes(null) && !respuestasPHQ9.value.includes(null);
});

onMounted(() => {
  const localData = localStorage.getItem('mindu_data');
  if (localData) {
    userData.value = JSON.parse(localData);
  } else {
    router.push('/dashboard');
  }
});

const guardarPostTest = async () => {
  if (!todasRespondidas.value) {
    alert('Por favor, responde todas las preguntas antes de continuar.');
    return;
  }

  const totalGAD7 = respuestasGAD7.value.reduce((a, b) => a + b, 0);
  const totalPHQ9 = respuestasPHQ9.value.reduce((a, b) => a + b, 0);

  // Guardar datos
  const user = auth.currentUser;
  if (user) {
    try {
      // Actualizar Firestore
      await updateDoc(doc(db, "participantes", user.uid), {
        gad7_post: totalGAD7,
        phq9_post: totalPHQ9,
        fechaFin: new Date().toISOString(),
        estado: 'COMPLETADO',
        postTestCompletado: true
      });

      // Actualizar LocalStorage
      userData.value.gad7_post = totalGAD7;
      userData.value.phq9_post = totalPHQ9;
      userData.value.estado = 'COMPLETADO';
      localStorage.setItem('mindu_data', JSON.stringify(userData.value));

      // Redirigir a resultados
      router.push('/resultados');
    } catch (error) {
      console.error('Error al guardar resultados:', error);
      alert('Hubo un error al guardar tus resultados. Por favor, intenta nuevamente.');
    }
  }
};
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.bg-gradient-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.hero-illustration img {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle-lg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle img {
  width: 24px;
  height: 24px;
}

.bg-light-primary {
  background-color: rgba(102, 126, 234, 0.1);
}

.bg-light-success {
  background-color: rgba(40, 167, 69, 0.1);
}

.circle-progress {
  position: relative;
  width: 60px;
  height: 60px;
}

.circle-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #e9ecef;
  position: relative;
  overflow: hidden;
}

.circle-fill {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #28a745;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  transition: transform 0.5s ease;
}

.circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 0.9rem;
}

.section-card {
  transition: all 0.3s ease;
}

.section-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}

.question-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.question-card:hover {
  border-color: #dee2e6;
  transform: translateX(5px);
}

.scale-guide {
  border-left: 4px solid #667eea;
}

.scale-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.scale-card:hover {
  border-color: #667eea;
  transform: translateY(-5px);
}

.scale-option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  background: white;
}

.scale-option-btn:hover {
  border-color: #28a745;
  background: #f8f9fa;
  transform: scale(1.05);
}

.form-check-input:checked + .scale-option-btn {
  border-color: #28a745;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  transform: scale(1.05);
}

.scale-option-value {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.scale-option-label {
  font-size: 0.8rem;
  text-align: center;
  line-height: 1.2;
}

.final-section {
  border: 2px dashed #28a745;
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.05) 0%, rgba(32, 201, 151, 0.05) 100%);
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border: none;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
}

.btn-success:disabled {
  opacity: 0.6;
  transform: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section .display-5 {
    font-size: 2rem;
  }
  
  .scale-option-btn {
    min-width: 70px;
    padding: 8px 4px;
  }
  
  .scale-option-value {
    font-size: 1.2rem;
  }
  
  .scale-option-label {
    font-size: 0.7rem;
  }
  
  .btn-success {
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }
  
  .scale-guide .col-3 {
    width: 50%;
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .scale-options {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .scale-option {
    flex: 0 0 calc(50% - 0.5rem);
    margin-bottom: 0.5rem;
  }
  
  .scale-option-btn {
    min-width: auto;
    width: 100%;
  }
}
</style>