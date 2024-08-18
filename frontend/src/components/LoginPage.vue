<template>
  
    <v-form ref="form" v-model="valid" @submit.prevent class="login-form">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            label="Usuario"
            required
            :rules="usernameRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            required
            :rules="passwordRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            @keyup.enter="login"
          ></v-text-field>

          <v-btn color="primary" @click="login" :disabled="!valid">Ingresar</v-btn>
        </v-card-text>
      </v-card>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="red darken-2">
      {{ snackbarText }}
    </v-snackbar>

</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

export default {
  name: 'LoginPage',
  setup() {
    const authStore = useAuthStore();
    const valid = ref(false);
    const username = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const snackbar = ref(false);
    const snackbarText = ref('');
    const timeout = 3000;

    const usernameRules = [(v) => !!v || 'El usuario es obligatorio'];
    const passwordRules = [(v) => !!v || 'La contraseña es obligatoria'];

    const login = async () => {
      try {
        //console.log("Attempting to log in...");
        await authStore.login({ username: username.value, password: password.value });
      } catch (error) {
          //console.log("Login failed, entering catch block", error);
          snackbarText.value = error.response?.status === 401
            ? 'Credenciales incorrectas'
            : 'Ocurrió un error';
          snackbar.value = true;
    }
  };

    return {
      valid,
      username,
      password,
      showPassword,
      usernameRules,
      passwordRules,
      snackbar,
      snackbarText,
      timeout,
      login,
    };
  },
};
</script>

<style scoped>
.v-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.v-card {
  min-width: 400px;
}
.v-card-title {
  color: rgb(12, 54, 193);
}
</style>
