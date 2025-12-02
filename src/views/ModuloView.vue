<template>
  <div class="container my-5">
    <button @click="$router.push('/dashboard')" class="btn btn-outline-secondary mb-4">
      ← Volver al Dashboard
    </button>

    <div v-if="moduloActual" class="card shadow-lg border-0">
      <div class="card-header bg-white p-4 border-bottom">
        <span class="badge bg-primary mb-2">Módulo {{ moduloActual.id }}</span>
        <h2 class="fw-bold">{{ moduloActual.titulo }}</h2>
      </div>

      <div class="card-body p-5">
        
        <div v-if="esGrupoPasivo">
          <div class="content-text" style="font-size: 1.1rem; line-height: 1.8;">
            <p>{{ contenido.textoIntro }}</p>
            <hr class="my-4">
            <h5 class="fw-bold text-primary">Conceptos Clave</h5>
            <p>{{ contenido.textoCuerpo }}</p>
            <div class="alert alert-info mt-4">
              <strong>💡 Consejo:</strong> {{ contenido.consejo }}
            </div>
          </div>
        </div>

        <div v-else>
          <div class="text-center py-4">
            <div style="font-size: 3rem;" class="mb-3">🎧</div>
            <h4 class="mb-3">Ejercicio Guiado</h4>
            <p class="text-muted">{{ contenido.instruccionAudio }}</p>
            
            <div class="bg-light p-4 rounded-3 d-inline-block w-100" style="max-width: 500px;">
              <audio controls class="w-100">
                <source :src="contenido.audioUrl" type="audio/mpeg">
                Tu navegador no soporta audio.
              </audio>
            </div>

            <div class="form-check mt-5 text-start d-inline-block border p-3 rounded">
              <input class="form-check-input" type="checkbox" v-model="ejercicioRealizado" id="checkEjercicio">
              <label class="form-check-label user-select-none" for="checkEjercicio">
                Confirmo que he escuchado el audio y realizado el ejercicio.
              </label>
            </div>
          </div>
        </div>

      </div>

      <div class="card-footer bg-white p-4 text-end">
        <button 
          @click="marcarComoCompletado" 
          class="btn btn-success btn-lg"
          :disabled="!puedeAvanzar"
        >
          Marcar como Completado y Continuar →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db, auth } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const route = useRoute();
const router = useRouter();
const moduloId = parseInt(route.params.id);
const userData = ref({});
const ejercicioRealizado = ref(false); // Solo para grupo A+

// Base de Datos de Contenido (Simulada)
// En un proyecto real, esto podría venir de Firestore, pero un JSON aquí es más rápido.
const DB_CONTENIDO = {
  1: {
    titulo: "Introducción a la Salud Mental",
    textoIntro: "La salud mental incluye nuestro bienestar emocional, psicológico y social. Afecta la forma en que pensamos, sentimos y actuamos cuando enfrentamos la vida.",
    textoCuerpo: "No es solo la ausencia de trastornos mentales. Es vital en todas las etapas de la vida, desde la niñez y la adolescencia hasta la adultez.",
    consejo: "Intenta identificar cómo te sientes hoy en una escala del 1 al 10.",
    instruccionAudio: "Escucha esta introducción de bienvenida y prepárate para el programa.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  2: {
    titulo: "Comprendiendo la Ansiedad",
    textoIntro: "La ansiedad es una respuesta natural al estrés. Es un sentimiento de miedo o aprensión sobre lo que está por venir.",
    textoCuerpo: "El primer día de escuela, ir a una entrevista de trabajo o dar un discurso pueden causar que la mayoría de las personas se sientan temerosas y nerviosas.",
    consejo: "La ansiedad no es tu enemiga, es una señal de alerta de tu cuerpo.",
    instruccionAudio: "Cierra los ojos y escucha esta explicación sobre el mecanismo del miedo.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  // ... Puedes agregar más módulos aquí (3 al 7) siguiendo el mismo patrón
  default: {
    titulo: "Módulo en Construcción",
    textoIntro: "Contenido pendiente.",
    audioUrl: "" 
  }
};

const contenido = computed(() => DB_CONTENIDO[moduloId] || DB_CONTENIDO.default);
const moduloActual = computed(() => ({ id: moduloId, titulo: contenido.value.titulo }));

onMounted(() => {
  const localData = localStorage.getItem('mindu_data');
  if (localData) {
    userData.value = JSON.parse(localData);
  }
});

const esGrupoPasivo = computed(() => {
  // Si el grupo contiene "A-", es pasivo (lectura)
  const g = userData.value.grupo || 'A-';
  return g.includes('A-');
});

const puedeAvanzar = computed(() => {
  if (esGrupoPasivo.value) return true; // Grupo lectura no necesita check
  return ejercicioRealizado.value; // Grupo activo necesita check
});

const marcarComoCompletado = async () => {
  // 1. Actualizar LocalStorage
  let completados = userData.value.modulosCompletados || [];
  if (!completados.includes(moduloId)) {
    completados.push(moduloId);
  }
  
  userData.value.modulosCompletados = completados;
  localStorage.setItem('mindu_data', JSON.stringify(userData.value));

  // 2. Intentar Actualizar Firestore (Background)
  const user = auth.currentUser;
  if (user) {
    try {
      const userRef = doc(db, "participantes", user.uid);
      await updateDoc(userRef, {
        modulosCompletados: completados,
        ultimoAcceso: new Date().toISOString()
      });
    } catch (e) {
      console.error("Error guardando progreso en nube:", e);
    }
  }

  // 3. Volver
  router.push('/dashboard');
};
</script>