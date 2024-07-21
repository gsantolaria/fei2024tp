<template>
  <v-container>
    <v-app-bar app elevation="2">
      <v-spacer></v-spacer>
      <v-btn small @click="logout" v-tooltip="'Cerrar sesion'">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/store/auth';

export default {
  name: 'MainBar',
  components: {

   },
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout();
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  background-color: #ffffff;
}
</style>
