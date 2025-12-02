<template>
  <div class="pre-test-page min-vh-100 bg-gradient-light">
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
           <li class="nav-item">
  <router-link class="nav-link d-flex align-items-center" to="/post-test">
    <i class="fas fa-chart-line me-2"></i>
    <span>Post-Test</span>
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

    <!-- Contenido principal -->
    <div class="container py-5" style="padding-top: 80px !important;">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">
          
          <!-- Indicador de progreso -->
          <div class="progress-indicator mb-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span class="badge bg-primary rounded-pill px-3 py-2 me-2">
                  📋 Evaluación Inicial
                </span>
                <span class="text-primary fw-bold">Paso {{ currentStep }} de 2</span>
              </div>
              <div>
                <span class="text-muted small">
                  ⏱️ Aprox. {{ currentStep === 1 ? '2 min' : '5-7 min' }}
                </span>
              </div>
            </div>
            <div class="progress" style="height: 10px; border-radius: 5px;">
              <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" 
                   :style="{ width: currentStep === 1 ? '50%' : '100%' }"></div>
            </div>
          </div>

          <!-- Tarjeta principal -->
          <div class="card border-0 shadow-lg overflow-hidden">
            
            <!-- Encabezado -->
            <div class="card-header bg-primary text-white position-relative overflow-hidden py-4">
              <div class="position-relative z-1 text-center">
                <h2 class="display-6 fw-bold mb-2">🧠 Bienvenido a MindU</h2>
                <p class="lead mb-0 opacity-90">
                  Paso {{ currentStep }} de 2: {{ currentStep === 1 ? 'Conociendo tu punto de partida' : 'Evaluación de síntomas' }}
                </p>
              </div>
            </div>

            <!-- Contenido -->
            <div class="card-body p-4 p-md-5">
              
              <!-- Paso 1: Datos generales -->
              <div v-if="currentStep === 1" class="step-1">
                <div class="text-center mb-5">
                  <h4 class="fw-bold text-primary mb-3">📝 Datos Generales</h4>
                  <p class="text-muted">Estos datos nos ayudarán a personalizar tu experiencia en MindU</p>
                </div>

                <div class="row g-4">
                  <div class="col-12">
                    <div class="form-card p-4 border rounded-3 bg-light">
                      <label class="form-label fw-bold text-primary mb-2">ID Anónimo</label>
                      <input v-model="formData.anonId" 
                             class="form-control form-control-lg" 
                             placeholder="Ej: MA05RO (Madre-Día-Color)"
                             required>
                      <div class="mt-2 text-muted small">
                        ⚠️ Esto asegura que tus datos sean completamente confidenciales
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-card p-4 border rounded-3 bg-light h-100">
                      <label class="form-label fw-bold text-primary mb-2">Edad</label>
                      <input v-model.number="formData.edad" 
                             type="number" 
                             class="form-control form-control-lg" 
                             placeholder="Tu edad"
                             required>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-card p-4 border rounded-3 bg-light h-100">
                      <label class="form-label fw-bold text-primary mb-2">Semestre</label>
                      <select v-model="formData.semestre" class="form-select form-select-lg">
                        <option value="">Selecciona tu semestre</option>
                        <option v-for="n in 12" :key="n" :value="n">{{ n }}° Semestre</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="text-center mt-5">
                  <button @click="nextStep" 
                          class="btn btn-primary btn-lg px-5 py-3 fw-bold shadow-sm"
                          :disabled="!formData.anonId || !formData.edad || !formData.semestre">
                    Siguiente Paso →
                  </button>
                </div>
              </div>

              <!-- Paso 2: Cuestionarios -->
              <div v-if="currentStep === 2" class="step-2">
                <div class="text-center mb-5">
                  <h4 class="fw-bold text-primary mb-3">📋 Cuestionario de Salud Mental</h4>
                  <p class="lead">Durante las <strong>últimas 2 semanas</strong>, ¿con qué frecuencia te has sentido molesto por...?</p>
                  
                  <div class="alert alert-info border-0 bg-light">
                    <div class="d-flex align-items-center">
                      <div>
                        <strong>Escala:</strong> 
                        <span class="badge bg-secondary mx-1">0 = Nunca</span>
                        <span class="badge bg-secondary mx-1">1 = Varios días</span>
                        <span class="badge bg-secondary mx-1">2 = Más de la mitad</span>
                        <span class="badge bg-secondary mx-1">3 = Casi todos los días</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Parte A: Ansiedad -->
                <div class="section-card border-0 rounded-3 overflow-hidden shadow-sm mb-5">
                  <div class="section-header bg-primary text-white p-4">
                    <h5 class="mb-0 fw-bold">Parte A: Síntomas de Ansiedad (GAD-7)</h5>
                  </div>
                  <div class="section-body p-4 bg-white">
                    <div v-for="(item, index) in gad7Items" :key="'gad'+index" 
                         class="question-card mb-3 p-4 border rounded-3 bg-light">
                      <label class="mb-3 fw-bold text-primary d-flex align-items-center">
                        <span class="badge bg-primary me-3">{{ index + 1 }}</span>
                        {{ item }}
                      </label>
                      <div class="rating-buttons">
                        <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                          <label v-for="val in 4" :key="val" 
                                 class="btn btn-outline-primary flex-fill">
                            <input type="radio" 
                                   :name="'gad'+index" 
                                   :value="val-1" 
                                   v-model="respuestasGAD7[index]"> 
                            {{ val-1 }}: {{ ['Nunca', 'Varios días', 'Más de la mitad', 'Casi todos los días'][val-1] }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Parte B: Depresión -->
                <div class="section-card border-0 rounded-3 overflow-hidden shadow-sm mb-5">
                  <div class="section-header bg-info text-white p-4">
                    <h5 class="mb-0 fw-bold">Parte B: Síntomas de Depresión (PHQ-9)</h5>
                  </div>
                  <div class="section-body p-4 bg-white">
                    <div v-for="(item, index) in phq9Items" :key="'phq'+index" 
                         class="question-card mb-3 p-4 border rounded-3 bg-light">
                      <label class="mb-3 fw-bold text-primary d-flex align-items-center">
                        <span class="badge bg-info me-3">{{ index + 1 }}</span>
                        {{ item }}
                      </label>
                      <div class="rating-buttons">
                        <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                          <label v-for="val in 4" :key="val" 
                                 class="btn btn-outline-info flex-fill">
                            <input type="radio" 
                                   :name="'phq'+index" 
                                   :value="val-1" 
                                   v-model="respuestasPHQ9[index]"> 
                            {{ val-1 }}: {{ ['Nunca', 'Varios días', 'Más de la mitad', 'Casi todos los días'][val-1] }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Consentimiento -->
                <div class="consent-card border border-warning rounded-3 p-4 bg-light mb-4">
                  <div class="d-flex align-items-start">
                    <div>
                      <h6 class="fw-bold text-warning mb-2">📋 Consentimiento Informado</h6>
                      <p class="text-muted small mb-0">
                        Al hacer clic en "Finalizar y Comenzar", aceptas participar en el estudio 
                        bajo los términos de confidencialidad. Tus datos serán tratados de manera 
                        anónima y solo se usarán para fines de investigación.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Botones - AHORA CON FUNCIONALIDAD DIRECTA -->
                <div class="d-flex gap-3 justify-content-center mt-5">
                  <button type="button" 
                          @click="prevStep" 
                          class="btn btn-outline-primary btn-lg px-4">
                    ← Atrás
                  </button>
                  <button type="button" 
                          @click="submitTest" 
                          class="btn btn-success btn-lg px-5 fw-bold shadow-sm">
                    Finalizar y Comenzar
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Información adicional -->
          <div class="mt-4 text-center text-muted small">
            <p>🔒 Tus respuestas son confidenciales y protegidas</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const router = useRouter();
const currentStep = ref(1);

// Datos del formulario
const formData = reactive({ 
  anonId: '', 
  edad: null, 
  semestre: '' 
});

// Respuestas
const respuestasGAD7 = reactive(Array(7).fill(null));
const respuestasPHQ9 = reactive(Array(9).fill(null));

// Items de las escalas
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

// Funciones de navegación
const nextStep = () => {
  console.log('Siguiente paso clickeado');
  if (!formData.anonId || !formData.edad || !formData.semestre) {
    alert('Por favor completa todos los campos');
    return;
  }
  currentStep.value = 2;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const prevStep = () => {
  console.log('Atrás clickeado');
  currentStep.value = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Función para enviar el test
const submitTest = async () => {
  console.log('Finalizar y comenzar clickeado');
  
  // Validar respuestas
  const gad7Incompletas = respuestasGAD7.some(r => r === null);
  const phq9Incompletas = respuestasPHQ9.some(r => r === null);
  
  if (gad7Incompletas || phq9Incompletas) {
    alert('Por favor responde todas las preguntas antes de continuar');
    return;
  }

  // Calcular puntajes
  const totalGAD7 = respuestasGAD7.reduce((a, b) => a + b, 0);
  const totalPHQ9 = respuestasPHQ9.reduce((a, b) => a + b, 0);
  const itemCrisis = respuestasPHQ9[8] || 0;

  // Protocolo de seguridad
  if (itemCrisis >= 2) {
    await registrarCrisis(totalGAD7, totalPHQ9);
    router.push('/alerta-crisis');
    return;
  }

  // Asignar grupo aleatorio
  const grupos = ['A+B+', 'A+B-', 'A-B+', 'A-B-'];
  const grupoAsignado = grupos[Math.floor(Math.random() * grupos.length)];

  // Guardar datos
  const user = auth.currentUser;
  if (user) {
    try {
      const data = {
        ...formData,
        gad7_pre: totalGAD7,
        phq9_pre: totalPHQ9,
        grupo: grupoAsignado,
        fechaInicio: new Date().toISOString(),
        modulosCompletados: [],
        sesionesRapidas: 0,
        respuestas_detalladas: {
          gad7: [...respuestasGAD7],
          phq9: [...respuestasPHQ9]
        }
      };

      // Guardar en Firestore
      await setDoc(doc(db, "participantes", user.uid), data, { merge: true });
      
      // Guardar en localStorage
      localStorage.setItem('mindu_data', JSON.stringify(data));
      
      // Redirigir
      router.push('/gracias');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar los datos. Por favor intenta nuevamente.');
    }
  } else {
    alert('No hay usuario autenticado. Por favor inicia sesión.');
    router.push('/login');
  }
};

const registrarCrisis = async (gad, phq) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await setDoc(doc(db, "alertas_crisis", user.uid), {
        uid: user.uid,
        email: user.email,
        fecha: new Date().toISOString(),
        puntaje_gad7: gad,
        puntaje_phq9: phq,
        nivel_riesgo: 'ALTO',
        item_critico: respuestasPHQ9[8],
        datos_usuario: { ...formData }
      }, { merge: true });
    } catch (error) {
      console.error('Error al registrar crisis:', error);
    }
  }
};
</script>

<style scoped>
.bg-gradient-light {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.navbar {
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
}

.progress-indicator {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.form-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.form-card:hover {
  border-color: #0d6efd;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(13, 110, 253, 0.1);
}

.section-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-info {
  background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%) !important;
}

.question-card {
  transition: all 0.3s ease;
}

.question-card:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn-group-toggle .btn {
  border: 2px solid #dee2e6;
  margin: 2px;
}

.btn-group-toggle .btn.active {
  border-color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.consent-card {
  border-left: 4px solid #ffc107 !important;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border: none;
}

.btn-outline-primary {
  color: #667eea;
  border-color: #667eea;
}

.btn-outline-primary:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Progress bar animada */
.progress-bar-animated {
  animation: progress-animation 2s ease-in-out infinite;
}

@keyframes progress-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Responsive */
@media (max-width: 768px) {
  .card-body {
    padding: 2rem !important;
  }
  
  .btn-group-toggle {
    flex-direction: column;
  }
  
  .btn-group-toggle .btn {
    width: 100%;
    margin-bottom: 5px;
  }
  
  .d-flex.gap-3 {
    flex-direction: column;
    gap: 1rem !important;
  }
  
  .btn-lg {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .display-6 {
    font-size: 1.5rem;
  }
  
  .btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>