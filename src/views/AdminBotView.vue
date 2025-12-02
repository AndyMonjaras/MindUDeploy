<template>
  <div class="container my-5">
    <div class="card shadow-lg border-0">
      <div class="card-header bg-dark text-white p-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 class="fw-bold">🗄️ Base de Datos Central</h2>
          <p class="mb-0 text-white-50">Gestión de participantes</p>
        </div>
        <div class="text-end">
          <h3 class="fw-bold text-warning mb-0">{{ listaParticipantes.length }}</h3>
          <small>Registros Totales</small>
        </div>
      </div>

      <div class="card-body p-5">
        
        <div class="row align-items-end mb-4 bg-light p-4 rounded border">
          <div class="col-md-3">
            <label class="form-label fw-bold">Nuevos a Generar</label>
            <input type="number" v-model="cantidadBots" class="form-control" min="1" max="1000">
          </div>
          <div class="col-md-3">
            <button @click="generarSimulacion" class="btn btn-primary w-100" :disabled="procesando">
              <span v-if="procesando">⏳ Creando...</span>
              <span v-else>➕ Añadir Datos</span>
            </button>
          </div>
          <div class="col-md-3">
            <button @click="cargarBD" class="btn btn-outline-secondary w-100" :disabled="cargando">
              🔄 Actualizar Tabla
            </button>
          </div>
          <div class="col-md-3">
            <button @click="descargarTodoCSV" class="btn btn-success w-100" :disabled="listaParticipantes.length === 0">
              📥 Excel Formateado
            </button>
          </div>
        </div>

        <div v-if="procesando" class="progress mb-4" style="height: 5px;">
          <div class="progress-bar bg-primary" :style="{ width: progreso + '%' }"></div>
        </div>

        <div class="table-responsive" style="max-height: 600px; overflow-y: auto;">
          <table class="table table-hover table-bordered align-middle">
            <thead class="table-dark sticky-top">
              <tr>
                <th>ID Anónimo</th>
                <th>Perfil Académico</th>
                <th>Grupo Experimental</th>
                <th class="text-center">Pre-Test</th>
                <th class="text-center">Post-Test</th>
                <th class="text-center" style="width: 150px;">Mejoras (Pts)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cargando">
                <td colspan="6" class="text-center py-5">
                  <div class="spinner-border text-primary" role="status"></div>
                  <p class="mt-2">Cargando datos...</p>
                </td>
              </tr>
              <tr v-else-if="listaParticipantes.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  Base de datos vacía.
                </td>
              </tr>
              
              <tr v-for="p in listaParticipantes" :key="p.uid">
                <td class="fw-bold font-monospace">{{ p.anonId }}</td>
                <td>
                  {{ p.semestre }}° Semestre<br>
                  <small class="text-muted">({{ p.edad }} años)</small>
                </td>
                <td>
                  <span class="badge" :class="claseGrupo(p.grupo)">{{ p.grupo }}</span>
                </td>
                <td class="text-center small">
                  GAD: <strong>{{ p.gad7_pre }}</strong><br>
                  PHQ: <strong>{{ p.phq9_pre }}</strong>
                </td>
                <td class="text-center small">
                  <span v-if="p.gad7_post !== undefined">
                    GAD: <strong>{{ p.gad7_post }}</strong><br>
                    PHQ: <strong>{{ p.phq9_post }}</strong>
                  </span>
                  <span v-else class="badge bg-light text-dark">Pendiente</span>
                </td>
                
                <td class="text-center bg-light">
                   <div v-if="p.delta_gad !== undefined" class="mb-1 d-flex justify-content-between px-2">
                     <span class="text-muted small">Ansiedad:</span>
                     <span :class="p.delta_gad > 0 ? 'text-success fw-bold' : 'text-danger'">
                       {{ p.delta_gad > 0 ? '⬇' + p.delta_gad : '⬆' + Math.abs(p.delta_gad) }}
                     </span>
                   </div>
                   <div v-if="p.delta_phq !== undefined" class="d-flex justify-content-between px-2">
                     <span class="text-muted small">Depresión:</span>
                     <span :class="p.delta_phq > 0 ? 'text-primary fw-bold' : 'text-danger'">
                       {{ p.delta_phq > 0 ? '⬇' + p.delta_phq : '⬆' + Math.abs(p.delta_phq) }}
                     </span>
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../firebaseConfig';
import { doc, setDoc, collection, getDocs, query } from 'firebase/firestore';

const cantidadBots = ref(50);
const procesando = ref(false);
const cargando = ref(false);
const descargando = ref(false);
const progreso = ref(0);
const listaParticipantes = ref([]);

// --- CARGAR DATOS ---
const cargarBD = async () => {
  cargando.value = true;
  try {
    const q = query(collection(db, "participantes"));
    const querySnapshot = await getDocs(q);
    
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    
    listaParticipantes.value = temp.sort((a, b) => {
      const idA = a.uid || '';
      const idB = b.uid || '';
      return idB.localeCompare(idA);
    });

  } catch (e) {
    console.error("Error cargando BD:", e);
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  cargarBD();
});

// --- GENERACIÓN DE DATOS ---
const nombresMadre = ["Maria", "Ana", "Sofia", "Carmen", "Luisa", "Elena", "Isabel", "Patricia", "Rosa", "Teresa", "Laura", "Andrea", "Claudia", "Martha", "Gabriela", "Veronica", "Juana", "Antonia"];
const colores = ["Azul", "Rojo", "Verde", "Rosa", "Negro", "Lila", "Gris", "Cafe", "Mora", "Cian", "Ocre", "Vino"];

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generarIDHumano = () => {
  const madre = sample(nombresMadre).substring(0, 2).toUpperCase();
  const dia = String(randomInt(1, 31)).padStart(2, '0');
  const color = sample(colores).substring(0, 2).toUpperCase();
  return `${madre}${dia}${color}`;
};

const generarSimulacion = async () => {
  if (!confirm(`¿Generar ${cantidadBots.value} nuevos participantes?`)) return;

  procesando.value = true;
  progreso.value = 0;
  const grupos = ['A+B+', 'A+B-', 'A-B+', 'A-B-'];

  for (let i = 0; i < cantidadBots.value; i++) {
    progreso.value = Math.floor(((i + 1) / cantidadBots.value) * 100);
    
    const grupo = grupos[i % 4]; 
    const semestre = randomInt(1, 9);
    const edad = 17 + Math.ceil(semestre / 2) + randomInt(0, 2); 
    let gadPre = randomInt(6, 16); 
    let phqPre = randomInt(5, 15);
    let mejoraGad = 0;
    let mejoraPhq = 0;
    const factorPersonal = (Math.random() * 0.4) + 0.8; 

    if (grupo === 'A+B+') {
      mejoraGad = Math.round(randomInt(5, 9) * factorPersonal);
      mejoraPhq = Math.round(randomInt(4, 8) * factorPersonal);
    } else if (grupo === 'A+B-') {
      mejoraGad = Math.round(randomInt(3, 6) * factorPersonal);
      mejoraPhq = Math.round(randomInt(2, 5) * factorPersonal);
    } else if (grupo === 'A-B+') {
      mejoraGad = Math.round(randomInt(2, 4) * factorPersonal);
      mejoraPhq = Math.round(randomInt(1, 3) * factorPersonal);
    } else {
      mejoraGad = randomInt(-1, 2);
      mejoraPhq = randomInt(-1, 2);
    }

    let gadPost = Math.max(0, gadPre - mejoraGad);
    let phqPost = Math.max(0, phqPre - mejoraPhq);

    const nuevoBot = {
      uid: `USER-${Date.now()}-${i}`,
      anonId: generarIDHumano(),
      grupo: grupo,
      edad: edad,
      semestre: semestre,
      gad7_pre: gadPre,
      phq9_pre: phqPre,
      gad7_post: gadPost,
      phq9_post: phqPost,
      delta_gad: gadPre - gadPost,
      delta_phq: phqPre - phqPost,
      fechaSimulacion: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, "participantes", nuevoBot.uid), nuevoBot);
    } catch (e) {
      console.error("Error guardando:", e);
    }

    if (i % 10 === 0) await new Promise(r => setTimeout(r, 10));
  }

  procesando.value = false;
  progreso.value = 100;
  
  await cargarBD();
  alert("Generación completada. Tabla actualizada.");
};

// --- DESCARGAR CSV MEJORADO (EXCEL COMPATIBLE) ---
const descargarTodoCSV = () => {
  descargando.value = true;
  
  // 1. Usamos PUNTO Y COMA (;) en vez de coma. 
  // Esto hace que Excel separe las columnas correctamente en español.
  const separator = ";"; 
  
  const cabeceras = [
    `ID_Anonimo${separator}Grupo${separator}Edad${separator}Semestre${separator}GAD7_Pre${separator}PHQ9_Pre${separator}GAD7_Post${separator}PHQ9_Post${separator}Mejora_Ansiedad${separator}Mejora_Depresion`
  ];
  
  const filas = listaParticipantes.value.map(p => 
    `${p.anonId}${separator}${p.grupo}${separator}${p.edad}${separator}${p.semestre}${separator}${p.gad7_pre}${separator}${p.phq9_pre}${separator}${p.gad7_post || ''}${separator}${p.phq9_post || ''}${separator}${p.delta_gad || 0}${separator}${p.delta_phq || 0}`
  );

  const csvContent = cabeceras.concat(filas).join("\n");
  
  // 2. Agregamos "\uFEFF" al inicio.
  // Esto es una marca (BOM) que le dice a Excel "Usa codificación UTF-8" para que salgan bien los acentos.
  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  
  // Nombramos el archivo .csv
  link.setAttribute("download", `mindu_bd_excel_${new Date().toISOString().slice(0,10)}.csv`);
  
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  descargando.value = false;
};

// --- UTILIDADES VISUALES ---
const claseGrupo = (grupo) => {
  if (grupo === 'A+B+') return 'bg-success text-white';
  if (grupo === 'A+B-') return 'bg-primary text-white';
  if (grupo === 'A-B+') return 'bg-warning text-dark';
  return 'bg-secondary text-white';
};
</script>