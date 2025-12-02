<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow p-4" style="width: 400px;">
      <h3 class="text-center mb-3">Registro</h3>

      <form @submit.prevent="register">
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

        <button type="submit" class="btn btn-success w-100">Crear cuenta</button>

        <p class="text-center mt-3">
          ¿Ya tienes cuenta?
          <router-link to="/" class="text-primary text-decoration-none">Inicia sesión</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email.value,
    });
    alert("Usuario registrado correctamente");
  } catch (error) {
    alert("Error en el registro: " + error.message);
  }
};
</script>
