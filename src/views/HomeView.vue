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
    <section class="hero-section text-white position-relative overflow-hidden">
      <div class="container position-relative z-1">
        <div class="row align-items-center min-vh-80">
          <div class="col-lg-6">
            <div class="hero-content animate-on-scroll">
              <h1 class="display-3 fw-bold mb-4">
                Tu bienestar mental 
                <span class="text-gradient">es nuestra prioridad</span>
              </h1>
              <p class="lead mb-5 fs-5">
                MindU es tu compañero digital para el cuidado emocional. Con herramientas validadas científicamente y profesionales certificados, te acompañamos en cada paso de tu camino hacia una mente más saludable.
              </p>
              <div class="d-flex flex-wrap gap-3">
                <router-link to="/pre-test" class="btn btn-light btn-lg px-4 py-3 fw-bold text-primary shadow-lg pulse-animation">
                  <i class="fas fa-play-circle me-2"></i>
                  Comenzar ahora
                </router-link>
                <button @click="startQuickMeditation" class="btn btn-outline-light btn-lg px-4 py-3 fw-bold border-2 shadow-sm">
                  <i class="fas fa-headphones me-2"></i>
                  Meditación guiada
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image animate-on-scroll" data-delay="200">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Persona meditando" 
                   class="img-fluid rounded-4 shadow-lg">
              <div class="floating-element floating-element-1">
                <i class="fas fa-heart"></i>
              </div>
              <div class="floating-element floating-element-2">
                <i class="fas fa-brain"></i>
              </div>
              <div class="floating-element floating-element-3">
                <i class="fas fa-balance-scale"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 320">
          <path fill="#ffffff" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section class="stats-section py-5 bg-light">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-3 col-sm-6">
            <div class="stat-card text-center p-4 rounded-4 shadow-sm bg-white">
              <div class="stat-icon mb-3">
                <i class="fas fa-users text-primary"></i>
              </div>
              <h3 class="fw-bold display-6 mb-2">100+</h3>
              <p class="text-muted mb-0">Usuarios activos</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="stat-card text-center p-4 rounded-4 shadow-sm bg-white">
              <div class="stat-icon mb-3">
                <i class="fas fa-clock text-success"></i>
              </div>
              <h3 class="fw-bold display-6 mb-2">500+</h3>
              <p class="text-muted mb-0">Horas de meditación</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="stat-card text-center p-4 rounded-4 shadow-sm bg-white">
              <div class="stat-icon mb-3">
                <i class="fas fa-user-md text-info"></i>
              </div>
              <h3 class="fw-bold display-6 mb-2">10+</h3>
              <p class="text-muted mb-0">Especialistas</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="stat-card text-center p-4 rounded-4 shadow-sm bg-white">
              <div class="stat-icon mb-3">
                <i class="fas fa-chart-line text-warning"></i>
              </div>
              <h3 class="fw-bold display-6 mb-2">90%</h3>
              <p class="text-muted mb-0">Mejora reportada</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MEDITATION SESSION PREVIEW -->
    <section class="meditation-preview py-5 bg-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="preview-content animate-on-scroll">
              <h2 class="display-5 fw-bold text-primary mb-4">
                <i class="fas fa-spa me-3"></i>
                Experiencia de Meditación Inmersiva
              </h2>
              <p class="lead text-muted mb-4">
                Sumérgete en una sesión guiada diseñada para reducir el estrés y mejorar tu concentración. Nuestras meditaciones combinan sonidos binaurales, música relajante y guías expertas.
              </p>
              <div class="session-details mb-4">
                <div class="row">
                  <div class="col-md-6">
                    <div class="detail-item mb-3">
                      <i class="fas fa-check-circle text-success me-2"></i>
                      <span>Guías en español</span>
                    </div>
                    <div class="detail-item mb-3">
                      <i class="fas fa-check-circle text-success me-2"></i>
                      <span>Sonidos binaurales</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="detail-item mb-3">
                      <i class="fas fa-check-circle text-success me-2"></i>
                      <span>Desde 5 minutos</span>
                    </div>
                    <div class="detail-item mb-3">
                      <i class="fas fa-check-circle text-success me-2"></i>
                      <span>Temáticas variadas</span>
                    </div>
                  </div>
                </div>
              </div>
              <button @click="startFullMeditation" class="btn btn-primary btn-lg px-4 py-3 fw-bold shadow-lg">
                <i class="fas fa-play me-2"></i>
                Probar sesión completa
              </button>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="preview-media position-relative animate-on-scroll" data-delay="300">
              <div class="gif-container rounded-4 shadow-lg overflow-hidden">
                <img src="https://i.pinimg.com/originals/8f/f0/66/8ff0663606976747dc8019988bb6539f.gif" 
                     alt="Animación de meditación" 
                     class="img-fluid w-100 meditation-gif">
                <div class="gif-overlay d-flex align-items-center justify-content-center">
                  <button class="btn btn-light btn-lg rounded-circle play-button" @click="playMeditationAudio">
                    <i class="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div class="session-info mt-4">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 class="fw-bold mb-1">Meditación de Calma</h5>
                    <div class="text-muted">15 min • Nivel Principiante</div>
                  </div>
                  <div class="d-flex gap-2">
                    <span class="badge bg-success">Relajación</span>
                    <span class="badge bg-info">Respiración</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="features-section py-5 bg-gradient-light">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold text-primary mb-3">Nuestras Herramientas</h2>
            <p class="lead text-muted">Tecnología y psicología unidas para tu bienestar</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card h-100 shadow-lg border-0 rounded-4 overflow-hidden animate-on-scroll">
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Mujer meditando" 
                     class="img-fluid">
                <div class="feature-overlay"></div>
              </div>
              <div class="p-4">
                <div class="feature-icon mb-3">
                  <i class="fas fa-brain"></i>
                </div>
                <h4 class="fw-bold mb-3">Mindfulness Avanzado</h4>
                <p class="text-muted mb-4">Sesiones progresivas que te llevan desde la atención plena básica hasta técnicas avanzadas de concentración y autoconocimiento.</p>
                <router-link to="/meditacion" class="btn btn-outline-primary w-100">
                  <i class="fas fa-arrow-right me-2"></i>
                  Explorar programa
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card h-100 shadow-lg border-0 rounded-4 overflow-hidden animate-on-scroll" data-delay="100">
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Persona completando test" 
                     class="img-fluid">
                <div class="feature-overlay"></div>
              </div>
              <div class="p-4">
                <div class="feature-icon mb-3">
                  <i class="fas fa-chart-bar"></i>
                </div>
                <h4 class="fw-bold mb-3">Evaluación Inteligente</h4>
                <p class="text-muted mb-4">Tests validados científicamente que analizan tu estado emocional y generan recomendaciones personalizadas basadas en IA.</p>
                <router-link to="/pre-test" class="btn btn-outline-success w-100">
                  <i class="fas fa-arrow-right me-2"></i>
                  Realizar evaluación
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="feature-card h-100 shadow-lg border-0 rounded-4 overflow-hidden animate-on-scroll" data-delay="200">
              <div class="feature-image">
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Terapia psicológica" 
                     class="img-fluid">
                <div class="feature-overlay"></div>
              </div>
              <div class="p-4">
                <div class="feature-icon mb-3">
                  <i class="fas fa-hands-helping"></i>
                </div>
                <h4 class="fw-bold mb-3">Soporte 24/7</h4>
                <p class="text-muted mb-4">Conecta con especialistas certificados, agenda sesiones virtuales y accede a grupos de apoyo comunitario.</p>
                <router-link to="/especialistas" class="btn btn-outline-info w-100">
                  <i class="fas fa-arrow-right me-2"></i>
                  Contactar especialista
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DAILY CHECK-IN SECTION - CORREGIDA -->
    <section class="checkin-section py-5 bg-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="checkin-content p-4 p-lg-5 rounded-4 shadow-sm animate-on-scroll">
              <!-- Cambiado: Texto en color oscuro -->
              <h2 class="display-5 fw-bold mb-4 text-dark">
                <i class="fas fa-calendar-day me-3 text-primary"></i>
                Registro Diario
              </h2>
              <p class="lead mb-4 text-dark">
                Comparte cómo te sientes hoy y observa tu progreso emocional con el tiempo.
              </p>
              
              <div class="mb-5">
                <!-- Cambiado: Texto en color oscuro -->
                <h5 class="fw-bold mb-3 text-dark">¿Cuál es tu estado de ánimo hoy?</h5>
                <div class="mood-selector bg-light p-4 rounded-4">
                  <div class="mood-options d-flex justify-content-between">
                    <button 
                      v-for="mood in moodOptions" 
                      :key="mood.id"
                      @click="selectMood(mood)"
                      class="mood-option"
                      :class="{ 'active': selectedMood?.id === mood.id }"
                    >
                      <div class="mood-icon">
                        <img :src="mood.icon" :alt="mood.label">
                      </div>
                      <span class="mood-label text-dark">{{ mood.label }}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedMood" class="selected-mood-alert bg-primary text-white rounded-3 p-3 mb-4">
                <div class="d-flex align-items-center">
                  <div class="selected-mood-icon me-3">
                    <img :src="selectedMood.icon" :alt="selectedMood.label">
                  </div>
                  <div>
                    <strong>{{ selectedMood.label }}</strong>
                    <div class="small opacity-75">¡Gracias por compartir cómo te sientes!</div>
                  </div>
                </div>
              </div>
              
              <button @click="saveMoodRecord" class="btn btn-primary btn-lg fw-bold w-100" :disabled="!selectedMood">
                <i class="fas fa-save me-2"></i>
                Guardar registro diario
              </button>
            </div>
          </div>
          
          <div class="col-lg-6">
            <div class="progress-visualization animate-on-scroll" data-delay="200">
              <div class="card border-0 shadow-lg h-100">
                <div class="card-body p-4 p-lg-5">
                  <h3 class="fw-bold text-primary mb-4">Tu Progreso Semanal</h3>
                  
                  <div class="progress-chart mb-5">
                    <div class="chart-header d-flex justify-content-between mb-3">
                      <h6 class="fw-bold mb-0 text-dark">Estado de ánimo promedio</h6>
                      <span class="badge bg-success">Mejorando ↑</span>
                    </div>
                    <div class="chart-bars">
                      <div v-for="day in moodProgress" :key="day.day" class="chart-bar mb-3">
                        <div class="d-flex justify-content-between mb-1">
                          <small class="text-muted">{{ day.day }}</small>
                          <small class="fw-bold text-dark">{{ day.mood }}</small>
                        </div>
                        <div class="progress" style="height: 8px;">
                          <div class="progress-bar bg-gradient-primary" :style="{ width: day.percentage + '%' }"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="stats-grid">
                    <div class="stat-item text-center p-3">
                      <div class="stat-value display-6 fw-bold text-primary">5</div>
                      <div class="stat-label text-muted">Días consecutivos</div>
                    </div>
                    <div class="stat-item text-center p-3">
                      <div class="stat-value display-6 fw-bold text-success">7</div>
                      <div class="stat-label text-muted">Sesiones esta semana</div>
                    </div>
                    <div class="stat-item text-center p-3">
                      <div class="stat-value">
                        <i class="fas fa-fire text-warning fs-2"></i>
                      </div>
                      <div class="stat-label text-muted">Racha activa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="testimonials py-5 bg-light">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold text-primary mb-3">Historias de Éxito</h2>
            <p class="lead text-muted">Lo que dicen nuestros usuarios sobre su experiencia</p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="testimonial-card p-4 rounded-4 bg-white shadow-sm h-100">
              <div class="testimonial-header d-flex align-items-center mb-4">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b786d4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                     alt="Usuario" 
                     class="rounded-circle me-3" 
                     style="width: 60px; height: 60px; object-fit: cover;">
                <div>
                  <h6 class="fw-bold mb-0 text-dark">Ana Martínez</h6>
                  <small class="text-muted">Usuaria desde 2025</small>
                </div>
              </div>
              <p class="text-muted mb-0">
                "MindU me ayudó a manejar mi ansiedad de manera increíble. Las meditaciones guiadas y el seguimiento diario cambiaron completamente mi perspectiva."
              </p>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="testimonial-card p-4 rounded-4 bg-white shadow-sm h-100">
              <div class="testimonial-header d-flex align-items-center mb-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                     alt="Usuario" 
                     class="rounded-circle me-3" 
                     style="width: 60px; height: 60px; object-fit: cover;">
                <div>
                  <h6 class="fw-bold mb-0 text-dark">Carlos Rodríguez</h6>
                  <small class="text-muted">Usuario desde 2025</small>
                </div>
              </div>
              <p class="text-muted mb-0">
                "El test de evaluación me dio insights valiosos sobre mi estado emocional. Las recomendaciones personalizadas han sido muy acertadas."
              </p>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="testimonial-card p-4 rounded-4 bg-white shadow-sm h-100">
              <div class="testimonial-header d-flex align-items-center mb-4">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                     alt="Usuario" 
                     class="rounded-circle me-3" 
                     style="width: 60px; height: 60px; object-fit: cover;">
                <div>
                  <h6 class="fw-bold mb-0 text-dark">Laura González</h6>
                  <small class="text-muted">Usuaria desde 2025</small>
                </div>
              </div>
              <p class="text-muted mb-0">
                "La conexión con especialistas me cambió la vida. Pude encontrar apoyo profesional justo cuando más lo necesitaba."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta-section py-5 text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="display-5 fw-bold mb-4">Comienza tu viaje hacia el bienestar mental hoy</h2>
            <p class="lead mb-5">Únete a miles de personas que están transformando su relación con su salud mental.</p>
            <div class="d-flex flex-wrap justify-content-center gap-3">
              <router-link to="/pre-test" class="btn btn-light btn-lg px-5 py-3 fw-bold shadow-lg">
                <i class="fas fa-rocket me-2"></i>
                Comenzar gratis
              </router-link>
              <button @click="startDemo" class="btn btn-outline-light btn-lg px-5 py-3 fw-bold border-2">
                <i class="fas fa-play-circle me-2"></i>
                Ver demostración
              </button>
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
    }, 10000);
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

// Estado de ánimo mejorado
const moodOptions = ref([
  { 
    id: 1, 
    label: 'Excelente', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069229.png',
    color: '#4ade80'
  },
  { 
    id: 2, 
    label: 'Muy bien', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069210.png',
    color: '#22c55e'
  },
  { 
    id: 3, 
    label: 'Regular', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069307.png',
    color: '#eab308'
  },
  { 
    id: 4, 
    label: 'Preocupado', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069297.png',
    color: '#f97316'
  },
  { 
    id: 5, 
    label: 'Agobiado', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3069/3069231.png',
    color: '#ef4444'
  }
]);

// Progreso de ánimo semanal
const moodProgress = ref([
  { day: 'Lun', mood: 'Muy bien', percentage: 85 },
  { day: 'Mar', mood: 'Excelente', percentage: 95 },
  { day: 'Mié', mood: 'Regular', percentage: 65 },
  { day: 'Jue', mood: 'Muy bien', percentage: 80 },
  { day: 'Vie', mood: 'Excelente', percentage: 90 },
  { day: 'Sáb', mood: 'Muy bien', percentage: 85 },
  { day: 'Dom', mood: 'Excelente', percentage: 95 }
]);

const selectedMood = ref(null);

// Funciones principales
const selectMood = (mood) => {
  selectedMood.value = mood;
};

const saveMoodRecord = () => {
  if (selectedMood.value) {
    const today = new Date().toISOString().split('T')[0];
    const moodRecord = {
      date: today,
      mood: selectedMood.value.label,
      icon: selectedMood.value.icon,
      color: selectedMood.value.color
    };
    
    let moodRecords = JSON.parse(localStorage.getItem('mindu_mood_records') || '[]');
    moodRecords = moodRecords.filter(record => record.date !== today);
    moodRecords.push(moodRecord);
    
    localStorage.setItem('mindu_mood_records', JSON.stringify(moodRecords));
    
    addNotification(
      'Registro guardado',
      `Has registrado tu estado como: ${selectedMood.value.label}`,
      'success',
      true,
      selectedMood.value.icon
    );
    
    setTimeout(() => {
      selectedMood.value = null;
    }, 2000);
  }
};

const startQuickMeditation = () => {
  addNotification(
    'Meditación rápida',
    'Iniciando sesión de relajación de 5 minutos...',
    'info',
    true,
    'https://cdn-icons-png.flaticon.com/512/2103/2103655.png'
  );
  router.push('/meditacion');
};

const startFullMeditation = () => {
  addNotification(
    'Sesión completa',
    'Cargando meditación guiada de 15 minutos...',
    'info',
    true,
    'https://cdn-icons-png.flaticon.com/512/2103/2103655.png'
  );
  router.push('/meditacion');
};

const playMeditationAudio = () => {
  addNotification(
    'Reproduciendo audio',
    'Audio de meditación: "Calma Interior"',
    'info',
    true,
    'https://cdn-icons-png.flaticon.com/512/2103/2103655.png'
  );
  
  // Simular reproducción de audio
  const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  audio.play().catch(() => {
    addNotification(
      'Audio no disponible',
      'El audio de demostración no está disponible en este momento',
      'warning'
    );
  });
};

const startDemo = () => {
  addNotification(
    'Iniciando demostración',
    'Mostrando recorrido guiado por las funcionalidades principales...',
    'info'
  );
  
  // Simular demostración
  setTimeout(() => {
    addNotification(
      'Funcionalidades principales',
      '1. Meditaciones guiadas 2. Tests de evaluación 3. Registro de ánimo',
      'info'
    );
  }, 2000);
};

// Logout
const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    addNotification(
      'Sesión cerrada',
      'Has cerrado sesión correctamente. ¡Esperamos verte pronto!',
      'info',
      false
    );
    
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  });
};

// Animación al hacer scroll
const setupScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
};

// Inicialización
onMounted(() => {
  console.log('🏠 HomeView montado');
  
  // Añadir Font Awesome si no está presente
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(link);
  }
  
  // Mostrar notificación de bienvenida
  setTimeout(() => {
    addNotification(
      '¡Bienvenido a MindU!',
      'Tu espacio seguro para el bienestar mental. Comienza tu camino hacia una mente más saludable.',
      'success',
      true
    );
  }, 1000);
  
  // Configurar animaciones de scroll
  setupScrollAnimations();
});
</script>

<style scoped>
/* Variables CSS */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --success-gradient: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  --warning-gradient: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

/* CORRECCIONES ESPECÍFICAS PARA VISIBILIDAD */

/* 1. LOGO - Asegurar visibilidad */
.brand-name {
  font-size: 28px;
  /* Cambiado: Usar color primario sólido en lugar de gradiente */
  color: #667eea !important;
  font-weight: 700;
}

/* 2. NAVBAR - Enlaces visibles */
.navbar-brand {
  color: #667eea !important;
}

.nav-link span {
  color: #495057 !important; /* Color oscuro para mejor visibilidad */
}

.nav-link i {
  color: #667eea !important;
}

.nav-link:hover span {
  color: #667eea !important;
}

.nav-link.router-link-exact-active span {
  color: white !important; /* Texto blanco cuando está activo */
}

/* 3. SECCIÓN CHECK-IN - Textos visibles */
.checkin-content {
  background: #ffffff !important; /* Fondo blanco sólido */
  border: 1px solid #e9ecef !important;
}

.checkin-content h2,
.checkin-content .lead,
.checkin-content h5 {
  color: #212529 !important; /* Color oscuro para mejor visibilidad */
}

.mood-selector {
  background: #f8f9fa !important; /* Fondo claro para contraste */
  border: 1px solid #dee2e6 !important;
}

.mood-label {
  color: #495057 !important; /* Color oscuro para las etiquetas */
}

.mood-option.active .mood-label {
  color: #667eea !important; /* Color primario cuando está activo */
  font-weight: 600;
}

/* Hero Section Mejorada */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 80vh;
  position: relative;
  overflow: hidden;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.hero-wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 120px;
}

.hero-content {
  animation: fadeInUp 1s ease-out;
}

.hero-image {
  position: relative;
  animation: fadeInRight 1s ease-out;
}

.hero-image img {
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.floating-element {
  position: absolute;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
}

.floating-element i {
  font-size: 24px;
  color: #667eea; /* Color sólido en lugar de gradiente */
}

.floating-element-1 {
  top: -20px;
  left: -20px;
  animation-delay: 0s;
}

.floating-element-2 {
  top: 50%;
  right: -20px;
  animation-delay: 2s;
}

.floating-element-3 {
  bottom: -20px;
  left: 30%;
  animation-delay: 4s;
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Stats Section */
.stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.stat-icon {
  font-size: 40px;
}

/* Meditation Preview */
.gif-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.meditation-gif {
  height: 100%;
  object-fit: cover;
}

.gif-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gif-container:hover .gif-overlay {
  opacity: 1;
}

.play-button {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
}

.play-button i {
  color: #667eea;
  font-size: 24px;
  margin-left: 5px;
}

/* Feature Cards Mejoradas */
.feature-card {
  transition: all 0.4s ease;
  border: none;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

.feature-image {
  height: 200px;
  overflow: hidden;
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.feature-card:hover .feature-image img {
  transform: scale(1.1);
}

.feature-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7));
}

.feature-icon {
  font-size: 40px;
  color: #667eea; /* Color sólido en lugar de gradiente */
}

/* Daily Check-in Mejorado - CORREGIDO */
.mood-option {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.mood-option:hover {
  background: rgba(102, 126, 234, 0.1);
}

.mood-option.active {
  background: rgba(102, 126, 234, 0.15);
  transform: scale(1.1);
  border: 2px solid #667eea;
}

.mood-icon {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.mood-icon img {
  width: 40px;
  height: 40px;
}

.selected-mood-alert {
  border-left: 4px solid #4ade80;
}

.selected-mood-icon img {
  width: 40px;
  height: 40px;
}

.progress-chart {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
}

.chart-bar .progress-bar {
  border-radius: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
}

.stat-item {
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

/* Testimonials */
.testimonial-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
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

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Navbar Mejorada */
.navbar {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-link {
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 0.5rem 1rem !important;
  margin: 0 2px;
}

.nav-link:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea !important;
  transform: translateY(-2px);
}

.nav-link.router-link-exact-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.avatar-placeholder {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Botones Mejorados */
.btn {
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::after {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-light {
  background: white;
  color: #667eea;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-light:hover {
  background: #f8f9fa;
  color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn-outline-light {
  border: 2px solid white;
  background: transparent;
}

.btn-outline-light:hover {
  background: white;
  color: #667eea;
  transform: translateY(-3px);
}

/* Progress Bar Mejorado */
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  border-left: 5px solid #667eea;
  backdrop-filter: blur(10px);
}

.notification-success {
  border-left-color: #4ade80;
}

.notification-warning {
  border-left-color: #fbbf24;
}

.notification-error {
  border-left-color: #f87171;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  position: relative;
}

.notification-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  flex-shrink: 0;
}

.notification-body {
  flex: 1;
  padding-right: 10px;
}

.notification-body strong {
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
  color: #1f2937;
}

.notification-body p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.notification-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  font-size: 18px;
  color: #9ca3af;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.notification-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #374151;
}

.notification-progress {
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
}

.notification-progress-bar {
  height: 100%;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: progressBar 10s linear forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%) rotate(5deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0);
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

/* Responsive Design */
@media (max-width: 992px) {
  .hero-section {
    min-height: auto;
    padding: 80px 0;
  }
  
  .display-3 {
    font-size: 2.5rem;
  }
  
  .display-5 {
    font-size: 2rem;
  }
  
  .mood-options {
    flex-wrap: wrap;
    justify-content: center !important;
    gap: 10px;
  }
  
  .mood-option {
    flex: 0 0 calc(33.333% - 10px);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .display-3 {
    font-size: 2rem;
  }
  
  .lead {
    font-size: 1.1rem;
  }
  
  .floating-element {
    display: none;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  /* Corrección para móviles */
  .checkin-content {
    padding: 1.5rem !important;
  }
  
  .mood-options {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .mood-option {
    flex: 0 0 calc(50% - 8px);
    margin-bottom: 8px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 40px 0;
  }
  
  .display-3 {
    font-size: 1.75rem;
  }
  
  .btn-lg {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 10px;
  }
  
  .mood-option {
    flex: 0 0 calc(50% - 8px);
  }
  
  .brand-name {
    font-size: 24px;
  }
}

/* Utilidades Adicionales */
.border-2 {
  border-width: 2px !important;
}

.shadow-lg {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
}

.rounded-4 {
  border-radius: 20px !important;
}

.bg-gradient-light {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a419a 100%);
}

/* Corrección adicional para texto oscuro */
.text-dark {
  color: #212529 !important;
}

.text-primary {
  color: #667eea !important;
}

/* Asegurar contraste en todos los elementos */
h1, h2, h3, h4, h5, h6 {
  color: #212529 !important;
}

p, span {
  color: #495057 !important;
}

/* Excepciones para secciones con fondo oscuro */
.hero-section h1,
.hero-section p,
.cta-section h2,
.cta-section p {
  color: white !important;
}

.selected-mood-alert strong,
.selected-mood-alert .small {
  color: white !important;
}
</style>