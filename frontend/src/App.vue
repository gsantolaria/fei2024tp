<template>
  <v-app>
    <LoginPage v-if="!authStore.loggedIn" />
    <div v-else>
      <MainMenu />
      <MainBar />
    </div>
    
    <v-main v-if="authStore.loggedIn">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import MainMenu from '@/components/MainMenu.vue';
import MainBar from '@/components/MainBar.vue'
import LoginPage from '@/components/LoginPage.vue';

export default {
  name: 'App',
  components: { MainMenu, MainBar, LoginPage },
  setup() {
    const authStore = useAuthStore();
    
    return { authStore };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>