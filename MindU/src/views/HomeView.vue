<template>
  <div>
    <!-- NOTIFICACIONES FLOTANTES -->
    <div class="notification-container">
      <div v-for="notification in notifications" 
           :key="notification.id"
           :class="['notification', `notification-${notification.type}`]"
           :style="{ 'animation-delay': `${notification.id * 0.1}s` }">
        <div class="notification-content">
          <img :src="notification.icon" :alt="notification.type" class="notification-icon">
          <div class="notification-body">
            <strong>{{ notification.title }}</strong>
            <p class="mb-0">{{ notification.message }}</p>
          </div>
          <button class="notification-close" @click="removeNotification(notification.id)">
            ×
          </button>
        </div>
        <div class="notification-progress" v-if="notification.autoClose">
          <div class="notification-progress-bar"></div>
        </div>
      </div>
    </div>

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div class="container">
        <router-link class="navbar-brand fw-bold text-primary d-flex align-items-center" to="/home">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="MindU Logo" class="me-2" style="width: 32px; height: 32px;">
          <span>MindU</span>
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/home">
                <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" alt="Inicio" class="me-1" style="width: 20px; height: 20px;">
                <span>Inicio</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/test-salud">
                <img src="https://cdn-icons-png.flaticon.com/512/2913/2913394.png" alt="Test" class="me-1" style="width: 20px; height: 20px;">
                <span>Test de Salud</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/meditacion">
                <img src="https://cdn-icons-png.flaticon.com/512/2103/2103655.png" alt="Meditación" class="me-1" style="width: 20px; height: 20px;">
                <span>Meditación</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/planes">
                <img src="https://cdn-icons-png.flaticon.com/512/3595/3595458.png" alt="Planes" class="me-1" style="width: 20px; height: 20px;">
                <span>Planes</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center" to="/especialistas">
                <img src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" alt="Especialistas" class="me-1" style="width: 20px; height: 20px;">
                <span>Especialistas</span>
              </router-link>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-3">
            <!-- CAMPANITA SIMPLIFICADA DE NOTIFICACIONES -->
            <NotificationToggle />
            
            <!-- MENÚ USUARIO -->
            <div class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" type="button" id="userMenu" data-bs-toggle="dropdown">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Usuario" class="me-1" style="width: 20px; height: 20px;">
                <span>Mi Cuenta</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item text-danger d-flex align-items-center" @click="logout">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png" alt="Cerrar sesión" class="me-2" style="width: 16px; height: 16px;">
                  Cerrar sesión
                </button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero-section text-white position-relative overflow-hidden">
      <div class="container position-relative z-1">
        <div class="row align-items-center min-vh-70">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-4 fw-bold mb-4">
              Bienvenido a <span class="text-warning">MindU</span>
            </h1>
            <p class="lead mb-5">
              Tu espacio seguro para el bienestar mental. Encuentra herramientas, recursos y apoyo profesional para tu camino hacia una mente más saludable.
            </p>
            <div class="d-flex flex-wrap justify-content-center gap-3">
              <router-link to="/test-salud" class="btn btn-light btn-lg px-4 py-3 fw-bold text-primary shadow-sm">
                <img src="https://cdn-icons-png.flaticon.com/512/2913/2913394.png" alt="Test" class="me-2" style="width: 24px; height: 24px;">
                Realizar evaluación inicial
              </router-link>
              <button @click="startQuickMeditation" class="btn btn-outline-light btn-lg px-4 py-3 fw-bold shadow-sm">
                <img src="https://cdn-icons-png.flaticon.com/512/2103/2103655.png" alt="Meditación" class="me-2" style="width: 24px; height: 24px;">
                Meditación rápida
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-overlay"></div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-6 fw-bold text-primary mb-3">¿Qué ofrece MindU?</h2>
            <p class="lead text-muted">Herramientas diseñadas para apoyar tu bienestar mental en cada etapa del proceso.</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
              <div class="feature-icon bg-primary text-white d-flex align-items-center justify-content-center p-4">
                <img src="https://cdn-icons-png.flaticon.com/512/2103/2103655.png" alt="Meditación" style="width: 64px; height: 64px;">
              </div>
              <div class="p-4">
                <h4 class="fw-bold mb-3">Meditación Guiada</h4>
                <p class="text-muted mb-4">Sesiones de audio diseñadas para reducir el estrés, mejorar la concentración y promover la relajación profunda.</p>
                <router-link to="/meditacion" class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="Ir" class="me-2" style="width: 16px; height: 16px;">
                  Explorar meditaciones
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
              <div class="feature-icon bg-success text-white d-flex align-items-center justify-content-center p-4">
                <img src="https://cdn-icons-png.flaticon.com/512/2913/2913394.png" alt="Evaluación" style="width: 64px; height: 64px;">
              </div>
              <div class="p-4">
                <h4 class="fw-bold mb-3">Evaluación Personalizada</h4>
                <p class="text-muted mb-4">Tests validados que te ayudan a entender tu estado emocional y recibir recomendaciones personalizadas.</p>
                <router-link to="/test-salud" class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="Ir" class="me-2" style="width: 16px; height: 16px;">
                  Comenzar evaluación
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
              <div class="feature-icon bg-info text-white d-flex align-items-center justify-content-center p-4">
                <img src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" alt="Especialistas" style="width: 64px; height: 64px;">
              </div>
              <div class="p-4">
                <h4 class="fw-bold mb-3">Apoyo Profesional</h4>
                <p class="text-muted mb-4">Conecta con especialistas certificados en salud mental para recibir orientación y apoyo personalizado.</p>
                <router-link to="/especialistas" class="btn btn-outline-info w-100 d-flex align-items-center justify-content-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="Ir" class="me-2" style="width: 16px; height: 16px;">
                  Ver especialistas
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DAILY CHECK-IN SECTION -->
    <section class="py-5 bg-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="p-4 p-lg-5">
              <h2 class="display-6 fw-bold text-primary mb-4">
                <img src="https://cdn-icons-png.flaticon.com/512/3094/3094836.png" alt="Estado de ánimo" class="me-3" style="width: 48px; height: 48px;">
                Registro Diario de Estado de Ánimo
              </h2>
              <p class="lead text-muted mb-4">Lleva un seguimiento de tu bienestar emocional y observa tu progreso a lo largo del tiempo.</p>
              
              <div class="mb-4">
                <h5 class="fw-bold mb-3">¿Cómo te sientes hoy?</h5>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  <button 
                    v-for="mood in moodOptions" 
                    :key="mood.id"
                    @click="selectMood(mood)"
                    class="btn btn-outline-primary rounded-pill px-4"
                    :class="{ 'active': selectedMood?.id === mood.id }"
                  >
                    <img :src="mood.icon" :alt="mood.label" class="me-2" style="width: 20px; height: 20px;">
                    {{ mood.label }}
                  </button>
                </div>
              </div>
              
              <div v-if="selectedMood" class="alert alert-success">
                <div class="d-flex align-items-center">
                  <img :src="selectedMood.icon" alt="Estado de ánimo seleccionado" class="me-3" style="width: 32px; height: 32px;">
                  <div>
                    <strong>Estado registrado:</strong> {{ selectedMood.label }}
                    <div class="text-muted small">¡Gracias por compartir cómo te sientes hoy!</div>
                  </div>
                </div>
              </div>
              
              <button @click="saveMoodRecord" class="btn btn-primary px-4 py-3 fw-bold" :disabled="!selectedMood">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="Guardar" class="me-2" style="width: 20px; height: 20px;">
                Guardar registro
              </button>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="position-relative p-4">
              <div class="rounded-4 shadow-lg p-4 bg-light">
                <h5 class="fw-bold text-primary mb-3">Tu Progreso</h5>
                <p class="text-muted mb-4">Mantener un registro regular te ayuda a identificar patrones y celebrar tus avances.</p>
                
                <div class="progress-stats mb-4">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Sesiones esta semana</span>
                    <strong>3/7</strong>
                  </div>
                  <div class="progress" style="height: 10px;">
                    <div class="progress-bar bg-success" style="width: 42%"></div>
                  </div>
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="fw-bold mb-0">Días consecutivos</h6>
                    <div class="display-6 fw-bold text-primary">5</div>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-0">Mejor ánimo</h6>
                    <div class="d-flex align-items-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/3069/3069229.png" alt="Feliz" class="me-2" style="width: 24px; height: 24px;">
                      <span class="fw-bold">Muy bien</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOTIFICATION REMINDER -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <div class="card border-0 shadow-sm bg-white">
              <div class="card-body p-4 p-lg-5">
                <img src="https://cdn-icons-png.flaticon.com/512/565/565422.png" alt="Notificaciones" class="mb-4" style="width: 64px; height: 64px;">
                <h3 class="fw-bold text-primary mb-3">Recuerda activar las notificaciones</h3>
                <p class="text-muted mb-4">
                  Haz clic en la campana para activar las notificaciones y recibir recordatorios importantes sobre tus sesiones y progreso.
                </p>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                  <button @click="toggleNotifications" class="btn btn-primary px-4 py-3 fw-bold">
                    <img src="https://cdn-icons-png.flaticon.com/512/565/565422.png" alt="Notificaciones" class="me-2" style="width: 20px; height: 20px;">
                    Activar notificaciones
                  </button>
                  <button @click="showNotificationInfo" class="btn btn-outline-secondary px-4 py-3">
                    ¿Cómo funciona?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUICK ACTIONS -->
    <section class="py-5 bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-5">
            <h3 class="fw-bold text-primary mb-3">Acciones Rápidas</h3>
            <p class="text-muted">Accede rápidamente a las herramientas más utilizadas</p>
          </div>
        </div>
        <div class="row g-3 justify-content-center">
          <div class="col-md-3 col-sm-6">
            <button @click="startQuickMeditation" class="btn btn-white shadow-sm w-100 py-4 rounded-3 d-flex flex-column align-items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/2103/2103655.png" alt="Meditación rápida" class="mb-3" style="width: 48px; height: 48px;">
              <span class="fw-bold">Meditación 5 min</span>
              <small class="text-muted">Relajación rápida</small>
            </button>
          </div>
          <div class="col-md-3 col-sm-6">
            <button @click="goToTest" class="btn btn-white shadow-sm w-100 py-4 rounded-3 d-flex flex-column align-items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/2913/2913394.png" alt="Test" class="mb-3" style="width: 48px; height: 48px;">
              <span class="fw-bold">Test rápido</span>
              <small class="text-muted">Evaluación emocional</small>
            </button>
          </div>
          <div class="col-md-3 col-sm-6">
            <button @click="viewProgress" class="btn btn-white shadow-sm w-100 py-4 rounded-3 d-flex flex-column align-items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135753.png" alt="Progreso" class="mb-3" style="width: 48px; height: 48px;">
              <span class="fw-bold">Ver progreso</span>
              <small class="text-muted">Mi evolución</small>
            </button>
          </div>
          <div class="col-md-3 col-sm-6">
            <button @click="showBreathingExercise" class="btn btn-white shadow-sm w-100 py-4 rounded-3 d-flex flex-column align-items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3237/3237477.png" alt="Respiración" class="mb-3" style="width: 48px; height: 48px;">
              <span class="fw-bold">Ejercicio respiración</span>
              <small class="text-muted">Calma inmediata</small>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import NotificationToggle from "../components/NotificationToggle.vue";

const router = useRouter();

// Sistema de notificaciones
const notifications = ref([]);
let notificationId = 0;

// Función para agregar notificaciones
const addNotification = (title, message, type = 'info', autoClose = true, icon = null) => {
  notificationId++;
  
  // Iconos predeterminados por tipo
  if (!icon) {
    switch(type) {
      case 'success':
        icon = 'https://cdn-icons-png.flaticon.com/512/190/190411.png';
        break;
      case 'warning':
        icon = 'https://cdn-icons-png.flaticon.com/512/1828/1828644.png';
        break;
      case 'error':
        icon = 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png';
        break;
      default:
        icon = 'https://cdn-icons-png.flaticon.com/512/1828/1828696.png';
    }
  }
  
  const notification = {
    id: notificationId,
    title,
    message,
    type,
    icon,
    autoClose,
    timer: null
  };
  
  notifications.value.unshift(notification);
  
  // Auto-remover después de 10 segundos si autoClose está activado
  if (autoClose) {
    notification.timer = setTimeout(() => {
      removeNotification(notification.id);
    }, 10000); // 10 segundos
  }
};

// Función para remover notificaciones
const removeNotification = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification && notification.timer) {
    clearTimeout(notification.timer);
  }
  notifications.value = notifications.value.filter(n => n.id !== id);
};

// Estado de ánimo
const moodOptions = ref([
  { id: 1, label: 'Excelente', icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069229.png' },
  { id: 2, label: 'Muy bien', icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069210.png' },
  { id: 3, label: 'Regular', icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069307.png' },
  { id: 4, label: 'Preocupado', icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069297.png' },
  { id: 5, label: 'Agobiado', icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069231.png' }
]);

const selectedMood = ref(null);

// Funciones de acción rápida
const selectMood = (mood) => {
  selectedMood.value = mood;
};

const saveMoodRecord = () => {
  if (selectedMood.value) {
    // Guardar en localStorage
    const today = new Date().toISOString().split('T')[0];
    const moodRecord = {
      date: today,
      mood: selectedMood.value.label,
      icon: selectedMood.value.icon
    };
    
    // Obtener registros existentes
    let moodRecords = JSON.parse(localStorage.getItem('mindu_mood_records') || '[]');
    
    // Reemplazar si ya existe registro para hoy
    moodRecords = moodRecords.filter(record => record.date !== today);
    moodRecords.push(moodRecord);
    
    // Guardar
    localStorage.setItem('mindu_mood_records', JSON.stringify(moodRecords));
    
    // Mostrar notificación de éxito
    addNotification(
      'Estado registrado',
      `Has registrado tu estado como: ${selectedMood.value.label}`,
      'success',
      true,
      selectedMood.value.icon
    );
    
    // Resetear selección
    setTimeout(() => {
      selectedMood.value = null;
    }, 2000);
  }
};

const startQuickMeditation = () => {
  addNotification(
    'Iniciando meditación',
    'Preparando tu sesión de relajación de 5 minutos...',
    'info',
    true,
    'https://cdn-icons-png.flaticon.com/512/2103/2103655.png'
  );
  router.push('/meditacion');
};

const goToTest = () => {
  router.push('/test-salud');
};

const viewProgress = () => {
  addNotification(
    'Tu progreso',
    '5 días consecutivos • 3 sesiones esta semana • Estado mayoritario: Muy bien',
    'info',
    true,
    'https://cdn-icons-png.flaticon.com/512/3135/3135753.png'
  );
};

const showBreathingExercise = () => {
  addNotification(
    'Ejercicio de respiración',
    'Inhala 4 segundos, mantén 4 segundos, exhala 6 segundos. Repite 5 veces.',
    'info',
    true,
    'https://cdn-icons-png.flaticon.com/512/3237/3237477.png'
  );
};

const toggleNotifications = async () => {
  if (Notification.permission === 'default' || Notification.permission === 'denied') {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        addNotification(
          'Notificaciones activadas',
          '¡Perfecto! Ahora recibirás recordatorios importantes sobre tus sesiones y progreso.',
          'success',
          true,
          'https://cdn-icons-png.flaticon.com/512/565/565422.png'
        );
        
        // Mostrar notificación del sistema de bienvenida
        setTimeout(() => {
          new Notification('🔔 ¡Bienvenido a MindU!', {
            body: 'Las notificaciones del sistema están activadas.',
            icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
          });
        }, 1000);
      } else {
        addNotification(
          'Notificaciones bloqueadas',
          'Has bloqueado las notificaciones del navegador. Puedes activarlas en la configuración.',
          'warning',
          true,
          'https://cdn-icons-png.flaticon.com/512/1828/1828644.png'
        );
      }
    } catch (error) {
      addNotification(
        'Error',
        'No se pudo solicitar permiso para notificaciones',
        'error',
        true,
        'https://cdn-icons-png.flaticon.com/512/1828/1828843.png'
      );
    }
  } else {
    addNotification(
      'Notificaciones ya activadas',
      'El sistema de notificaciones ya está funcionando correctamente.',
      'info',
      true,
      'https://cdn-icons-png.flaticon.com/512/565/565422.png'
    );
  }
};

const showNotificationInfo = () => {
  addNotification(
    'Cómo funcionan las notificaciones',
    'Recibirás recordatorios para sesiones, evaluaciones y seguimiento de tu progreso.',
    'info',
    true,
    'https://cdn-icons-png.flaticon.com/512/565/565422.png'
  );
};

// Logout
const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    addNotification(
      'Sesión cerrada',
      'Has cerrado sesión correctamente. ¡Esperamos verte pronto!',
      'info',
      false,
      'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'
    );
    
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  });
};

// Inicialización
onMounted(() => {
  console.log('🏠 HomeView montado');
  
  // Mostrar notificación de bienvenida si es primera vez
  const firstTime = localStorage.getItem('mindu_first_visit');
  if (!firstTime) {
    setTimeout(() => {
      addNotification(
        '¡Bienvenido a MindU!',
        'Tu espacio seguro para el bienestar mental. Comienza tu camino hacia una mente más saludable.',
        'success',
        true,
        'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      );
      localStorage.setItem('mindu_first_visit', 'true');
    }, 1000);
  }
  
  // Mostrar estado de notificaciones del navegador
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      addNotification(
        'Notificaciones activas',
        'Las notificaciones del navegador están habilitadas para MindU.',
        'success',
        true,
        'https://cdn-icons-png.flaticon.com/512/565/565422.png'
      );
    } else if (Notification.permission === 'denied') {
      addNotification(
        'Notificaciones bloqueadas',
        'Para recibir recordatorios, habilita las notificaciones en tu navegador.',
        'warning',
        true,
        'https://cdn-icons-png.flaticon.com/512/1828/1828644.png'
      );
    } else {
      addNotification(
        'Activa las notificaciones',
        'Habilita las notificaciones para recibir recordatorios importantes.',
        'info',
        true,
        'https://cdn-icons-png.flaticon.com/512/565/565422.png'
      );
    }
  }, 2000);
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 70vh;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
}

/* Feature Cards */
.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.feature-icon {
  height: 120px;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.05);
}

/* Quick Actions */
.btn-white {
  background: white;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.btn-white:hover {
  background: #f8f9fa;
  border-color: #0d6efd;
  transform: translateY(-2px);
}

/* Mood selection */
.btn.active {
  background-color: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

/* Progress stats */
.progress {
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  transition: width 0.6s ease;
}

/* SISTEMA DE NOTIFICACIONES */
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  width: 100%;
}

.notification {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideInRight 0.3s ease forwards;
  border-left: 4px solid #007bff;
}

.notification-success {
  border-left-color: #28a745;
}

.notification-warning {
  border-left-color: #ffc107;
}

.notification-error {
  border-left-color: #dc3545;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  position: relative;
}

.notification-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  flex-shrink: 0;
}

.notification-body {
  flex: 1;
  padding-right: 10px;
}

.notification-body strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #333;
}

.notification-body p {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

.notification-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.notification-close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

.notification-progress {
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
}

.notification-progress-bar {
  height: 100%;
  width: 100%;
  background: #007bff;
  animation: progressBar 10s linear forwards;
}

.notification-success .notification-progress-bar {
  background: #28a745;
}

.notification-warning .notification-progress-bar {
  background: #ffc107;
}

.notification-error .notification-progress-bar {
  background: #dc3545;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes progressBar {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    min-height: 60vh;
    padding: 60px 0;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
  
  .lead {
    font-size: 1.1rem;
  }
  
  .btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .feature-card {
    margin-bottom: 1.5rem;
  }
  
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}

/* Navbar improvements */
.navbar {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.nav-link {
  transition: all 0.3s ease;
  border-radius: 6px;
  padding: 0.5rem 1rem !important;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #0d6efd !important;
}

.nav-link.router-link-exact-active {
  background: #0d6efd;
  color: white !important;
}

/* Image consistency */
img {
  object-fit: contain;
}

/* Card styling */
.card {
  border: none;
  border-radius: 12px;
}

.shadow-sm {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.shadow-lg {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}

/* Alert styling */
.alert {
  border: none;
  border-radius: 8px;
}

/* Button styling */
.btn {
  font-weight: 500;
  border-radius: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
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
</style>