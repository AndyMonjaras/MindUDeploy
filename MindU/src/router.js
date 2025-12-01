import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importaciones de vistas que SÍ existen
import LoginView from './views/LoginView.vue'
import RegistroView from './views/RegistroView.vue'
import HomeView from './views/HomeView.vue'
import MeditacionView from './views/MeditacionView.vue'
import TestSaludView from './views/TestSaludView.vue'
import PlanesView from './views/PlanesView.vue'
import EspecialistasView from './views/EspecialistasView.vue'

// Importaciones de vistas adicionales (si existen)
import PreTestView from './views/PreTestView.vue'
import DashboardView from './views/DashboardView.vue'
import ModuloView from './views/ModuloView.vue'
import PostTestView from './views/PostTestView.vue'
import ResultadosView from './views/ResultadosView.vue'
import AlertaCrisisView from './views/AlertaCrisisView.vue'
import AdminBotView from './views/AdminBotView.vue'

const routes = [
  // Redirección principal
  {
    path: '/',
    redirect: '/login'
  },
  
  // Rutas públicas
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegistroView
  },
  
  // Rutas protegidas - App principal
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/meditacion',
    name: 'Meditacion',
    component: MeditacionView,
    meta: { requiresAuth: true }
  },
  {
    path: '/test-salud',
    name: 'TestSalud',
    component: TestSaludView,
    meta: { requiresAuth: true }
  },
  {
    path: '/planes',
    name: 'Planes',
    component: PlanesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/especialistas',
    name: 'Especialistas',
    component: EspecialistasView,
    meta: { requiresAuth: true }
  },
  
  // Rutas protegidas - Sistema de evaluación
  {
    path: '/pre-test',
    name: 'PreTest',
    component: PreTestView,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/modulo/:id',
    name: 'Modulo',
    component: ModuloView,
    props: true,
    meta: { requiresAuth: true }
  },
  
  // Rutas protegidas - Funcionalidades adicionales
  {
    path: '/post-test',
    name: 'PostTest',
    component: PostTestView,
    meta: { requiresAuth: true }
  },
  {
    path: '/resultados',
    name: 'Resultados',
    component: ResultadosView,
    meta: { requiresAuth: true }
  },
  
  // Rutas públicas de emergencia
  {
    path: '/alerta-crisis',
    name: 'AlertaCrisis',
    component: AlertaCrisisView
    // No requiere auth para acceso rápido
  },
  
  // Ruta protegida - Administración
  {
    path: '/admin-bots',
    name: 'AdminBot',
    component: AdminBotView,
    meta: { requiresAuth: true }
  },
  
  // Ruta de fallback para 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia de navegación mejorada
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Verificar estado de autenticación
  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      // Si requiere auth y no hay usuario, redirigir a login
      next('/login')
    } else if ((to.path === '/login' || to.path === '/registro') && user) {
      // Si ya está autenticado y trata de ir a login/registro, redirigir a home
      next('/home')
    } else {
      // En cualquier otro caso, permitir navegación
      next()
    }
  })
})

export default router