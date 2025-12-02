<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow p-4" style="width: 400px;">
      <h3 class="text-center mb-3">Iniciar Sesión</h3>

      <form @submit.prevent="login">
        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Correo institucional"
            required
          />
        </div>

        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Contraseña"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Ingresar</button>

        <p class="text-center mt-3">
          ¿No tienes cuenta?
          <router-link to="/registro" class="text-primary text-decoration-none">Regístrate aquí</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/home");
  } catch (error) {
    alert("Correo o contraseña incorrectos");
  }
};
</script>
