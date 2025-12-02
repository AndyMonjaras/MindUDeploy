<template>
  <div class="container min-vh-100 d-flex align-items-center justify-content-center">
    <div class="text-center">
      <div style="font-size: 5rem;">🆘</div>
      <h1 class="display-4 fw-bold text-danger mb-4">Necesitamos que hables con alguien</h1>
      
      <p class="lead mb-5">
        Tus respuestas indican que estás pasando por un momento muy difícil. 
        Por tu seguridad, no podemos continuar con el estudio automatizado, 
        pero queremos asegurarnos de que recibas apoyo humano inmediato.
      </p>

      <div class="card shadow-lg border-danger mb-4">
        <div class="card-body p-4">
          <h3 class="mb-3">Líneas de Ayuda 24/7</h3>
          
          <div class="d-grid gap-3 col-md-8 mx-auto">
            <a href="tel:8009112000" class="btn btn-danger btn-lg py-3">
              📞 Línea de la Vida (800 911 2000)
            </a>
            <a href="tel:911" class="btn btn-outline-dark btn-lg py-3">
              🚑 Emergencias (911)
            </a>
          </div>
          
          <p class="text-muted mt-4 small">
            Un coordinador del proyecto ha sido notificado y tratará de contactarte 
            vía correo electrónico en las próximas 24 horas para ofrecerte orientación.
          </p>
        </div>
      </div>

      <router-link to="/login" class="text-muted">Volver al inicio de sesión</router-link>
    </div>
  </div>
</template>

<script setup>
// No requiere lógica compleja, es una página estática de emergencia.
</script>