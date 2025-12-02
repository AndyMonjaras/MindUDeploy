<template>
  <div class="container my-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold">Tus Resultados</h1>
      <p class="text-muted">Comparativa de tu bienestar: Inicio vs. Final</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-8">
        
        <div class="card mb-4 shadow-sm border-0">
          <div class="card-body p-4">
            <h4 class="card-title">Nivel de Ansiedad (GAD-7)</h4>
            <div class="d-flex justify-content-between mb-2">
              <span>Antes: <strong>{{ preGAD }}</strong></span>
              <span>Ahora: <strong>{{ postGAD }}</strong></span>
            </div>
            
            <div class="progress mb-3" style="height: 25px;">
              <div class="progress-bar bg-secondary" :style="{ width: (preGAD/21)*100 + '%' }">Inicio</div>
              <div class="progress-bar bg-success" :style="{ width: (postGAD/21)*100 + '%' }">Final</div>
            </div>

            <div v-if="mejoraGAD > 0" class="alert alert-success">
              📉 ¡Disminuiste tu ansiedad en un <strong>{{ mejoraGAD }}%</strong>!
            </div>
            <div v-else class="alert alert-light">
              Tu nivel de ansiedad se mantuvo estable.
            </div>
          </div>
        </div>

        <div class="card mb-4 shadow-sm border-0">
          <div class="card-body p-4">
            <h4 class="card-title">Nivel de Ánimo (PHQ-9)</h4>
            <div class="d-flex justify-content-between mb-2">
              <span>Antes: <strong>{{ prePHQ }}</strong></span>
              <span>Ahora: <strong>{{ postPHQ }}</strong></span>
            </div>

            <div class="progress mb-3" style="height: 25px;">
              <div class="progress-bar bg-secondary" :style="{ width: (prePHQ/27)*100 + '%' }">Inicio</div>
              <div class="progress-bar bg-primary" :style="{ width: (postPHQ/27)*100 + '%' }">Final</div>
            </div>

            <div v-if="mejoraPHQ > 0" class="alert alert-primary">
              📉 ¡Mejoraste tu estado de ánimo en un <strong>{{ mejoraPHQ }}%</strong>!
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <p>Gracias por ser parte del estudio MindU.</p>
          <button @click="cerrarSesion" class="btn btn-outline-danger">Cerrar Sesión</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const router = useRouter();
const userData = ref({});

const preGAD = ref(0);
const postGAD = ref(0);
const prePHQ = ref(0);
const postPHQ = ref(0);

onMounted(() => {
  const localData = localStorage.getItem('mindu_data');
  if (localData) {
    userData.value = JSON.parse(localData);
    preGAD.value = userData.value.gad7_pre || 0;
    postGAD.value = userData.value.gad7_post || 0;
    prePHQ.value = userData.value.phq9_pre || 0;
    postPHQ.value = userData.value.phq9_post || 0;
  }
});

const calcularMejora = (pre, post) => {
  if (pre === 0) return 0;
  const diff = pre - post;
  return Math.round((diff / pre) * 100);
};

const mejoraGAD = computed(() => calcularMejora(preGAD.value, postGAD.value));
const mejoraPHQ = computed(() => calcularMejora(prePHQ.value, postPHQ.value));

const cerrarSesion = async () => {
  await signOut(auth);
  localStorage.clear();
  router.push('/login');
};
</script>