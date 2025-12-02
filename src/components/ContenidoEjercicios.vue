<template>
  <div>
    <h3>Ejercicios Guiados</h3>
    <audio controls :src="audioSrc"></audio>
  </div>
</template>

<script>
export default {
  data(){ return { audioSrc: "/audios/ejercicio1.mp3" }; }
}
</script>
