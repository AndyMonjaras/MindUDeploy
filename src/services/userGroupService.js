import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

class UserGroupService {
  constructor() {
    // No inicializar aquí, usar getters
    this._db = null;
    this._auth = null;
  }

  // Getters que inicializan bajo demanda
  get db() {
    if (!this._db) {
      this._db = getFirestore();
    }
    return this._db;
  }

  get auth() {
    if (!this._auth) {
      this._auth = getAuth();
    }
    return this._auth;
  }

  // Asignar grupo basado en criterios
  async assignUserGroup(userData) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    // Determinar grupo basado en lógica de negocio
    const group = this.determineGroup(userData);
    
    const userProfile = {
      anonId: userData.anonId || `user_${user.uid.substring(0, 8)}`,
      edad: userData.edad,
      fechaInicio: new Date().toISOString(),
      gad7_pre: userData.gad7_pre || 0,
      phq9_pre: userData.phq9_pre || 0,
      grupo: group,
      semestre: userData.semestre || 1,
      modulosCompletados: [],
      userId: user.uid,
      notificationsEnabled: group.includes('A'), // Grupo A tiene notificaciones
      interactionType: group.includes('A') ? 'active' : 'passive', // A=activo, B=pasivo
      lastActivity: new Date()
    };

    // Guardar en Firestore
    await setDoc(doc(this.db, 'users', user.uid), userProfile);
    
    console.log(`✅ Usuario asignado al grupo: ${group}`);
    return userProfile;
  }

  // Determinar grupo según criterios
  determineGroup(userData) {
    // Lógica de asignación de grupos
    const groups = ['A-A', 'A-B', 'B-A', 'B-B']; // Notificaciones-Interacción
    
    // Ejemplo: Basado en puntuaciones iniciales
    const totalScore = (userData.gad7_pre || 0) + (userData.phq9_pre || 0);
    
    if (totalScore >= 20) {
      return 'A-A'; // Alto riesgo - Notificaciones activas + Interacción activa
    } else if (totalScore >= 15) {
      return 'A-B'; // Medio-alto - Notificaciones activas + Interacción pasiva
    } else if (totalScore >= 10) {
      return 'B-A'; // Medio - Sin notificaciones + Interacción activa
    } else {
      return 'B-B'; // Bajo - Sin notificaciones + Interacción pasiva
    }
  }

  // Obtener perfil de usuario
  async getUserProfile() {
    const user = this.auth.currentUser;
    if (!user) return null;

    try {
      const docRef = doc(this.db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('❌ Error obteniendo perfil:', error);
      return null;
    }
  }

  // Actualizar módulos completados
  async updateCompletedModules(moduleId) {
    const user = this.auth.currentUser;
    if (!user) return;

    try {
      const userProfile = await this.getUserProfile();
      if (!userProfile) return;

      const updatedModules = [...new Set([...userProfile.modulosCompletados, moduleId])];
      
      await updateDoc(doc(this.db, 'users', user.uid), {
        modulosCompletados: updatedModules,
        lastActivity: new Date()
      });

      console.log(`✅ Módulo ${moduleId} marcado como completado`);
    } catch (error) {
      console.error('❌ Error actualizando módulos:', error);
    }
  }

  // Verificar si usuario tiene notificaciones habilitadas
  async hasNotificationsEnabled() {
    const profile = await this.getUserProfile();
    return profile?.notificationsEnabled || false;
  }

  // Obtener tipo de interacción
  async getInteractionType() {
    const profile = await this.getUserProfile();
    return profile?.interactionType || 'passive';
  }

  // Obtener estadísticas de grupos
  async getGroupStatistics() {
    try {
      const groups = ['A-A', 'A-B', 'B-A', 'B-B'];
      const stats = {};

      for (const group of groups) {
        const q = query(collection(this.db, 'users'), where('grupo', '==', group));
        const snapshot = await getDocs(q);
        stats[group] = snapshot.size;
      }

      return stats;
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error);
      return {};
    }
  }
}

export default new UserGroupService();