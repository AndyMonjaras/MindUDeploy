<template>
  <div>
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div class="container">
        <router-link class="navbar-brand fw-bold text-primary" to="/home">MindU</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><router-link class="nav-link" to="/home">Inicio</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/test-salud">📝 Test de Salud</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/meditacion">🎧 Meditación</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/planes">📆 Planes</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/especialistas">🤝 Especialistas</router-link></li>
          </ul>

          <div class="d-flex align-items-center gap-3">
            <!-- CAMPANITA DE NOTIFICACIONES -->
            <NotificationBell />
            
            <!-- MENÚ USUARIO -->
            <div class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown">
                👤 Mi Cuenta
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item text-danger" @click="logout">Cerrar sesión</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero text-center text-white">
      <h1 class="display-4 fw-bold">Bienvenido a MindU</h1>
      <p class="lead">Tu espacio seguro. ¿Cómo te sientes hoy?</p>
      <router-link to="/test-salud" class="btn btn-light btn-lg mt-3 fw-bold text-primary">
        Realizar chequeo emocional
      </router-link>
    </section>

    <!-- CARDS -->
    <section class="container my-5">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 text-center p-4 hover-card">
            <div class="display-4 mb-3">🧘</div>
            <h3>Zona Zen</h3>
            <p class="text-muted">Audios guiados para reducir el estrés en minutos.</p>
            <router-link to="/meditacion" class="btn btn-outline-primary stretched-link">Ir a Meditación</router-link>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 text-center p-4 hover-card">
            <div class="display-4 mb-3">📊</div>
            <h3>Evaluación</h3>
            <p class="text-muted">Mide tu nivel de ansiedad y obtén recomendaciones.</p>
            <router-link to="/test-salud" class="btn btn-outline-success stretched-link">Hacer Test</router-link>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 text-center p-4 hover-card">
            <div class="display-4 mb-3">👩‍⚕️</div>
            <h3>Ayuda Profesional</h3>
            <p class="text-muted">Contacta con especialistas certificados.</p>
            <router-link to="/especialistas" class="btn btn-outline-danger stretched-link">Ver Directorio</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN DE PRUEBAS GLOBAL -->
    <section class="container my-5">
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center">
          <h4 class="card-title mb-4">🔧 Panel de Pruebas GLOBAL</h4>
          <p class="text-muted mb-4">Las notificaciones funcionan en TODAS las vistas de la aplicación</p>
          
          <div class="row justify-content-center">
            <div class="col-md-3 mb-3">
              <button class="btn btn-primary btn-lg w-100" @click="probarNotificacion">
                🧪 Notificación Simple
              </button>
            </div>
            <div class="col-md-3 mb-3">
              <button class="btn btn-warning btn-lg w-100" @click="probarRecordatorio">
                🧠 Recordatorio Sesión
              </button>
            </div>
            <div class="col-md-3 mb-3">
              <button class="btn btn-info btn-lg w-100" @click="probarMultiples">
                🔄 Múltiples Notis
              </button>
            </div>
            <div class="col-md-3 mb-3">
              <button class="btn btn-success btn-lg w-100" @click="verEstado">
                📊 Estado Sistema
              </button>
            </div>
          </div>

          <div class="row justify-content-center mt-2">
            <div class="col-md-3 mb-3">
              <button class="btn btn-secondary btn-lg w-100" @click="probarFirebase">
                🔥 Probar Firebase
              </button>
            </div>
            <div class="col-md-3 mb-3">
              <button class="btn btn-dark btn-lg w-100" @click="solicitarPermisosMovil">
                📱 Permisos Móvil
              </button>
            </div>
            <div class="col-md-3 mb-3">
              <button class="btn btn-outline-primary btn-lg w-100" @click="navegarOtraVista">
                🧭 Navegar a Test
              </button>
            </div>
            <div class="col-md-3 mb-3">
              <button class="btn btn-outline-danger btn-lg w-100" @click="limpiarNotificaciones">
                🗑️ Limpiar Todo
              </button>
            </div>
          </div>

          <!-- Estado del sistema -->
          <div class="mt-4 p-3 bg-light rounded">
            <h6>Estado del Sistema GLOBAL</h6>
            <div class="row text-start">
              <div class="col-md-3">
                <small><strong>Notificaciones:</strong> {{ notificationStatus }}</small>
              </div>
              <div class="col-md-3">
                <small><strong>Plataforma:</strong> {{ platform }}</small>
              </div>
              <div class="col-md-3">
                <small><strong>Contenedor:</strong> {{ containerStatus }}</small>
              </div>
              <div class="col-md-3">
                <small><strong>Activas:</strong> {{ activeNotifications }}</small>
              </div>
            </div>
          </div>

          <!-- Información del sistema -->
          <div class="mt-3 p-3 bg-info text-white rounded">
            <h6>💡 Información Importante</h6>
            <small>
              <strong>Las notificaciones son GLOBALES:</strong> Se muestran en todas las vistas (Home, Test, Meditación, etc.)
              <br>
              <strong>Funcionan con:</strong> Navegación entre vistas • Recarga de página • Múltiples sesiones activas
            </small>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN DE DEMOSTRACIÓN -->
    <section class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">🎯 Cómo Funciona</h5>
              <ul class="list-unstyled">
                <li class="mb-2">✅ <strong>Contenedor Global:</strong> Único para toda la app</li>
                <li class="mb-2">✅ <strong>Persistente:</strong> Sobrevive a navegación entre vistas</li>
                <li class="mb-2">✅ <strong>Multi-vista:</strong> Visible en Home, Test, Meditación, etc.</li>
                <li class="mb-2">✅ <strong>Auto-reparación:</strong> Se recrea si se pierde</li>
                <li class="mb-2">✅ <strong>Estado compartido:</strong> Mismas notificaciones en todas partes</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">🚀 Para Probar</h5>
              <ol>
                <li class="mb-2">Haz clic en "🧪 Notificación Simple"</li>
                <li class="mb-2">Navega a "📝 Test de Salud" usando el menú</li>
                <li class="mb-2">¡La notificación seguirá visible!</li>
                <li class="mb-2">Regresa a Home y prueba más notificaciones</li>
                <li class="mb-2">Usa "📊 Estado Sistema" para diagnosticar</li>
              </ol>
            </div>
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
import { crearUsuario } from "../services/usuariosService";
import notificationManager from "../services/notifications";
import NotificationBell from "../components/NotificationBell.vue";

const router = useRouter();

// Estado reactivo
const notificationStatus = ref('Cargando...');
const platform = ref('');
const containerStatus = ref('Verificando...');
const activeNotifications = ref('0');

// Funciones de prueba
const probarNotificacion = () => {
  if (typeof notificationManager !== 'undefined') {
    notificationManager.showNotification(
      "🧪 Notificación de Prueba GLOBAL", 
      "Esta notificación se ve en TODAS las vistas de la aplicación",
      "success",
      6000
    );
    updateStatus();
  } else {
    alert("Sistema de notificaciones no disponible");
  }
};

const probarRecordatorio = () => {
  if (typeof notificationManager !== 'undefined') {
    notificationManager.testSessionReminder();
    updateStatus();
  } else {
    alert("Sistema de notificaciones no disponible");
  }
};

const probarMultiples = () => {
  if (typeof notificationManager !== 'undefined') {
    notificationManager.testMultipleNotifications();
    updateStatus();
  } else {
    alert("Sistema de notificaciones no disponible");
  }
};

const verEstado = () => {
  if (typeof notificationManager !== 'undefined') {
    const status = notificationManager.getSystemStatus();
    console.log('📊 Estado completo del sistema:', status);
    
    notificationManager.showNotification(
      "📊 Estado del Sistema GLOBAL",
      `Contenedor: ${status.containerReady ? '✅ Listo' : '❌ Problema'}\nNotificaciones activas: ${status.coreStatus.notificationsCount}\nSistema: ${status.coreStatus.isInitialized ? '✅ Inicializado' : '❌ No inicializado'}`,
      "info",
      7000
    );
    
    updateStatus();
  }
};

const solicitarPermisosMovil = async () => {
  if (typeof notificationManager !== 'undefined') {
    const resultado = await notificationManager.requestMobilePermissions();
    console.log('📱 Resultado permisos:', resultado);
    updateStatus();
  } else {
    alert("Sistema de notificaciones no disponible");
  }
};

const navegarOtraVista = () => {
  // Navegar a otra vista para demostrar que las notificaciones son globales
  router.push('/test-salud');
  
  // Mostrar notificación que seguirá visible en la nueva vista
  setTimeout(() => {
    if (typeof notificationManager !== 'undefined') {
      notificationManager.showNotification(
        "🧭 Navegación Exitosa",
        "Esta notificación se ve en la vista de Test y seguirá visible cuando regreses a Home",
        "info",
        8000
      );
    }
  }, 1000);
};

const limpiarNotificaciones = () => {
  if (typeof notificationManager !== 'undefined') {
    notificationManager.clearAllNotifications();
    notificationManager.showNotification(
      "🗑️ Notificaciones Limpiadas",
      "Todas las notificaciones han sido removidas",
      "success",
      3000
    );
    updateStatus();
  }
};

// Logout
const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href = "/login";
  });
};

// Probar Firebase
const probarFirebase = async () => {
  try {
    await crearUsuario({
      nombre: "Usuario Test Home",
      creado: new Date(),
      tipo: "prueba_desde_home_global",
      vista: "HomeView"
    });
    
    if (typeof notificationManager !== 'undefined') {
      notificationManager.showNotification(
        "✅ Firebase Conectado GLOBAL", 
        "Conexión a base de datos exitosa desde Home",
        "success",
        5000
      );
    }
  } catch (error) {
    console.error("Error en Firebase:", error);
    if (typeof notificationManager !== 'undefined') {
      notificationManager.showNotification(
        "❌ Error Firebase", 
        "No se pudo conectar con la base de datos",
        "error",
        5000
      );
    }
  }
};

// Actualizar estado mejorado
const updateStatus = () => {
  if (typeof notificationManager !== 'undefined') {
    notificationStatus.value = notificationManager.isNotificationsEnabled() ? 'Activadas ✅' : 'Desactivadas ❌';
    platform.value = notificationManager.isMobile() ? 'Móvil 📱' : 'Escritorio 💻';
    
    const status = notificationManager.getSystemStatus();
    containerStatus.value = status.containerReady ? '✅ Listo' : '❌ Problema';
    activeNotifications.value = `${status.coreStatus.notificationsCount} activas`;
  } else {
    notificationStatus.value = 'Sistema no disponible';
    platform.value = 'No detectado';
    containerStatus.value = 'No disponible';
    activeNotifications.value = '0';
  }
};

// Inicialización
onMounted(() => {
  console.log('🏠 HomeView montado - Sistema global activo');
  
  // Actualizar estado inicial
  updateStatus();
  
  // Verificar y asegurar el contenedor global
  if (typeof notificationManager !== 'undefined') {
    notificationManager.ensureContainer();
  }
  
  // Notificación de bienvenida global
  setTimeout(() => {
    if (typeof notificationManager !== 'undefined' && notificationManager.isNotificationsEnabled()) {
      notificationManager.showNotification(
        "👋 ¡Bienvenido a MindU!",
        "Sistema de notificaciones GLOBAL activo. Funciona en todas las vistas.",
        "info",
        6000
      );
      updateStatus();
    }
  }, 1500);

  // Actualizar estado periódicamente
  setInterval(updateStatus, 2000);
});

// Exponer funciones globalmente para debugging
window.debugNotifications = () => {
  if (typeof notificationManager !== 'undefined') {
    const status = notificationManager.getSystemStatus();
    console.log('🐛 Debug Notificaciones:', status);
    
    // Probar notificación de debug
    notificationManager.showNotification(
      "🐛 Debug Activado",
      `Contenedor: ${status.containerReady ? 'OK' : 'ERROR'}\nNotis: ${status.coreStatus.notificationsCount}\nInicializado: ${status.coreStatus.isInitialized}`,
      status.containerReady ? 'success' : 'error',
      5000
    );
    
    updateStatus();
  }
};
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
}
.hover-card {
  transition: transform 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-5px);
}

/* Estilos para las tarjetas de información */
.card {
  border: none;
}

.card-title {
  color: #333;
  font-weight: 600;
}

.bg-info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* Mejoras visuales para los botones */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 60px 20px;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
}
</style>

// Script para generar iconos PWA (ejecutar con Node.js)
const fs = require('fs');
const path = require('path');

// Icono base (debes tener un icono-base.png de 512x512 en la raíz)
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 Generando iconos PWA para MindU...');

// Este es un script de ejemplo - necesitarías una librería como sharp para procesar imágenes
iconSizes.forEach(size => {
  console.log(`✅ Icono ${size}x${size} (debes generarlo manualmente)`);
});

console.log(`
📋 Pasos para generar iconos:

1. Consigue un icono de 512x512 pixels (icono-base.png)
2. Usa una herramienta como:
   - https://www.pwabuilder.com/imageGenerator
   - https://realfavicongenerator.net/
   - https://appicon.co/

3. Coloca los iconos generados en: public/icons/

4. Los archivos deben llamarse:
   - icon-72x72.png
   - icon-96x96.png
   - icon-128x128.png
   - icon-144x144.png
   - icon-152x152.png
   - icon-192x192.png
   - icon-384x384.png
   - icon-512x512.png

5. También genera:
   - badge-72x72.png (para notificaciones)
   - shortcut-test.png (96x96)
   - shortcut-meditation.png (96x96)
   - shortcut-doctors.png (96x96)
`);