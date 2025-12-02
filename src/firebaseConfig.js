import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBti3-fgWE0hupZ4Jqy0_ZMOQWgF--df2M",
  authDomain: "mindu-91138.firebaseapp.com",
  projectId: "mindu-91138",
  storageBucket: "mindu-91138.firebasestorage.app",
  messagingSenderId: "154559506405",
  appId: "1:154559506405:web:31ee16fc3ef71f22c0310c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

// Tu clave VAPID pública
export const VAPID_KEY = "BAnLvhmd48daic3RthPQ9ME88z7Ac0jsgDvWbJH4Vm2aaGCM8-_Ze1dizhto0X53pmIrmCQtkrz6fCgGRc7957Q";

// Exportar la app por si acaso
export default app;