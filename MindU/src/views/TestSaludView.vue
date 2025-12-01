<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <!-- Encabezado -->
        <div class="text-center mb-5">
          <h1 class="display-5 fw-bold text-primary">🧠 Test de Salud Mental</h1>
          <p class="lead text-muted">Completa estos cuestionarios para ayudarnos a entender mejor cómo te sientes y asignarte al grupo más adecuado.</p>
        </div>

        <!-- Información del Usuario -->
        <div v-if="!testCompleted" class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="card-title">👤 Información Básica</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Edad</label>
                <input 
                  v-model="userInfo.edad" 
                  type="number" 
                  class="form-control" 
                  min="16" 
                  max="100"
                  placeholder="Ej: 20"
                >
              </div>
              <div class="col-md-6">
                <label class="form-label">Semestre (si eres estudiante)</label>
                <select v-model="userInfo.semestre" class="form-select">
                  <option value="">Seleccionar semestre</option>
                  <option v-for="n in 12" :key="n" :value="n">{{ n }}° Semestre</option>
                  <option value="0">No aplica</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Test GAD-7 -->
        <div v-if="!testCompleted && currentTest === 'gad7'" class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="card-title mb-0">😰 Test GAD-7 (Ansiedad)</h5>
              <span class="badge bg-primary">Paso 1 de 2</span>
            </div>
            <p class="text-muted mb-4">Durante las últimas 2 semanas, ¿con qué frecuencia te han molestado los siguientes problemas?</p>
            
            <div v-for="(question, index) in gad7Questions" :key="'gad7-' + index" class="mb-4">
              <h6 class="question-text">{{ question.text }}</h6>
              <div class="btn-group-vertical btn-group-lg w-100" role="group">
                <button
                  v-for="option in gad7Options"
                  :key="option.value"
                  :class="['btn', gad7Answers[index] === option.value ? 'btn-primary' : 'btn-outline-primary']"
                  @click="selectGAD7Answer(index, option.value)"
                >
                  {{ option.text }} ({{ option.value }} puntos)
                </button>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4">
              <button class="btn btn-outline-secondary" disabled>Anterior</button>
              <button 
                class="btn btn-primary" 
                @click="calculateGAD7Score"
                :disabled="gad7Answers.filter(a => a !== null).length !== gad7Questions.length"
              >
                Continuar al PHQ-9
              </button>
            </div>
          </div>
        </div>

        <!-- Test PHQ-9 -->
        <div v-if="!testCompleted && currentTest === 'phq9'" class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="card-title mb-0">😔 Test PHQ-9 (Depresión)</h5>
              <span class="badge bg-primary">Paso 2 de 2</span>
            </div>
            <p class="text-muted mb-4">Durante las últimas 2 semanas, ¿con qué frecuencia te han molestado los siguientes problemas?</p>
            
            <div v-for="(question, index) in phq9Questions" :key="'phq9-' + index" class="mb-4">
              <h6 class="question-text">{{ question.text }}</h6>
              <div class="btn-group-vertical btn-group-lg w-100" role="group">
                <button
                  v-for="option in phq9Options"
                  :key="option.value"
                  :class="['btn', phq9Answers[index] === option.value ? 'btn-primary' : 'btn-outline-primary']"
                  @click="selectPHQ9Answer(index, option.value)"
                >
                  {{ option.text }} ({{ option.value }} puntos)
                </button>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4">
              <button class="btn btn-outline-secondary" @click="currentTest = 'gad7'">Anterior</button>
              <button 
                class="btn btn-success" 
                @click="calculatePHQ9Score"
                :disabled="phq9Answers.filter(a => a !== null).length !== phq9Questions.length"
              >
                Ver Resultados
              </button>
            </div>
          </div>
        </div>

        <!-- Resultados -->
        <div v-if="testCompleted" class="card shadow-sm border-0">
          <div class="card-body text-center">
            <div class="mb-4">
              <span class="display-1">🎯</span>
            </div>
            <h3 class="card-title text-primary">Resultados de tu Evaluación</h3>
            
            <!-- Resultado GAD-7 -->
            <div class="row mb-4">
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h6>😰 Ansiedad (GAD-7)</h6>
                    <h2 :class="getScoreColor(testResults.gad7Score, 'gad7')">{{ testResults.gad7Score }}/21</h2>
                    <p class="small">{{ getGAD7Interpretation(testResults.gad7Score) }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h6>😔 Depresión (PHQ-9)</h6>
                    <h2 :class="getScoreColor(testResults.phq9Score, 'phq9')">{{ testResults.phq9Score }}/27</h2>
                    <p class="small">{{ getPHQ9Interpretation(testResults.phq9Score) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Grupo Asignado -->
            <div class="alert alert-info border-0 mb-4">
              <h5>👥 Grupo Asignado: <strong>{{ userProfile.grupo }}</strong></h5>
              <p class="mb-0">
                <span v-if="userProfile.notificationsEnabled">🔔 <strong>Con notificaciones</strong></span>
                <span v-else>🔕 <strong>Sin notificaciones</strong></span>
                • 
                <span v-if="userProfile.interactionType === 'active'">🎯 <strong>Interacción activa</strong></span>
                <span v-else>👀 <strong>Interacción pasiva</strong></span>
              </p>
            </div>

            <p class="text-muted mb-4">
              Basado en tus respuestas, has sido asignado al grupo {{ userProfile.grupo }}. 
              Esta asignación nos ayuda a personalizar tu experiencia en MindU.
            </p>

            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <router-link to="/home" class="btn btn-primary btn-lg">
                🏠 Comenzar en MindU
              </router-link>
              <button class="btn btn-outline-secondary btn-lg" @click="resetTest">
                ↻ Realizar Test Nuevamente
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <p class="mt-2">Asignando grupo y configurando tu experiencia...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import userGroupService from '../services/userGroupService';
import toastService from '../services/toastService';

const router = useRouter();

// Estado del test
const loading = ref(false);
const testCompleted = ref(false);
const currentTest = ref('gad7');

// Información del usuario
const userInfo = ref({
  edad: '',
  semestre: ''
});

// Resultados
const testResults = ref({
  gad7Score: 0,
  phq9Score: 0
});

const userProfile = ref(null);

// Preguntas GAD-7
const gad7Questions = ref([
  { text: "Sentirse nervioso, ansioso o al límite" },
  { text: "No poder dejar de preocuparse o controlar la preocupación" },
  { text: "Preocuparse demasiado por diferentes cosas" },
  { text: "Dificultad para relajarse" },
  { text: "Estar tan inquieto que es difícil permanecer sentado" },
  { text: "Molestarse o irritarse fácilmente" },
  { text: "Sentir miedo como si algo terrible fuera a suceder" }
]);

const gad7Options = ref([
  { value: 0, text: "Nunca" },
  { value: 1, text: "Varios días" },
  { value: 2, text: "Más de la mitad de los días" },
  { value: 3, text: "Casi todos los días" }
]);

const gad7Answers = ref(Array(7).fill(null));

// Preguntas PHQ-9
const phq9Questions = ref([
  { text: "Poco interés o placer en hacer las cosas" },
  { text: "Sentirse desanimado, deprimido o sin esperanza" },
  { text: "Dificultad para conciliar el sueño, permanecer dormido o dormir demasiado" },
  { text: "Sentirse cansado o tener poca energía" },
  { text: "Poco apetito o comer en exceso" },
  { text: "Sentirse mal consigo mismo - o que es un fracaso o que ha defraudado a su familia o a usted mismo" },
  { text: "Dificultad para concentrarse en cosas tales como leer el periódico o ver la televisión" },
  { text: "Moverse o hablar tan lento que otras personas podrían haberlo notado. O lo contrario - estar tan inquieto o agitado que se ha estado moviendo mucho más de lo normal" },
  { text: "Pensamientos de que estaría mejor muerto o de lastimarse de alguna manera" }
]);

const phq9Options = ref([
  { value: 0, text: "Nunca" },
  { value: 1, text: "Varios días" },
  { value: 2, text: "Más de la mitad de los días" },
  { value: 3, text: "Casi todos los días" }
]);

const phq9Answers = ref(Array(9).fill(null));

// Métodos GAD-7
const selectGAD7Answer = (index, value) => {
  gad7Answers.value[index] = value;
};

const calculateGAD7Score = () => {
  const score = gad7Answers.value.reduce((sum, answer) => sum + (answer || 0), 0);
  testResults.value.gad7Score = score;
  currentTest.value = 'phq9';
  window.scrollTo(0, 0);
};

// Métodos PHQ-9
const selectPHQ9Answer = (index, value) => {
  phq9Answers.value[index] = value;
};

const calculatePHQ9Score = async () => {
  const score = phq9Answers.value.reduce((sum, answer) => sum + (answer || 0), 0);
  testResults.value.phq9Score = score;
  
  await assignUserGroup();
};

// Asignar grupo al usuario
const assignUserGroup = async () => {
  if (!userInfo.value.edad) {
    toastService.error('Error', 'Por favor completa tu edad');
    return;
  }

  loading.value = true;

  try {
    const profile = await userGroupService.assignUserGroup({
      anonId: `user_${Date.now()}`,
      edad: parseInt(userInfo.value.edad),
      semestre: userInfo.value.semestre ? parseInt(userInfo.value.semestre) : 0,
      gad7_pre: testResults.value.gad7Score,
      phq9_pre: testResults.value.phq9Score
    });

    userProfile.value = profile;
    testCompleted.value = true;
    
    toastService.success(
      'Grupo Asignado', 
      `Has sido asignado al grupo ${profile.grupo}`,
      6000
    );

  } catch (error) {
    console.error('Error asignando grupo:', error);
    toastService.error('Error', 'No se pudo asignar el grupo. Intenta nuevamente.');
  } finally {
    loading.value = false;
  }
};

// Reiniciar test
const resetTest = () => {
  testCompleted.value = false;
  currentTest.value = 'gad7';
  gad7Answers.value = Array(7).fill(null);
  phq9Answers.value = Array(9).fill(null);
  userInfo.value = { edad: '', semestre: '' };
  testResults.value = { gad7Score: 0, phq9Score: 0 };
  userProfile.value = null;
  window.scrollTo(0, 0);
};

// Funciones de interpretación
const getGAD7Interpretation = (score) => {
  if (score >= 15) return 'Ansiedad severa';
  if (score >= 10) return 'Ansiedad moderada';
  if (score >= 5) return 'Ansiedad leve';
  return 'Ansiedad mínima';
};

const getPHQ9Interpretation = (score) => {
  if (score >= 20) return 'Depresión severa';
  if (score >= 15) return 'Depresión moderadamente grave';
  if (score >= 10) return 'Depresión moderada';
  if (score >= 5) return 'Depresión leve';
  return 'Depresión mínima';
};

const getScoreColor = (score, testType) => {
  const thresholds = testType === 'gad7' 
    ? { low: 5, medium: 10, high: 15 }
    : { low: 5, medium: 10, high: 15, severe: 20 };
  
  if (score >= thresholds.severe) return 'text-danger';
  if (score >= thresholds.high) return 'text-warning';
  if (score >= thresholds.medium) return 'text-info';
  if (score >= thresholds.low) return 'text-primary';
  return 'text-success';
};
</script>

<style scoped>
.question-text {
  color: #333;
  font-weight: 500;
  margin-bottom: 1rem;
}

.btn-group-vertical .btn {
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.card {
  border: none;
  border-radius: 1rem;
}

.alert {
  border-radius: 1rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .btn-group-vertical .btn {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
  }
  
  .display-5 {
    font-size: 2rem;
  }
}
</style>