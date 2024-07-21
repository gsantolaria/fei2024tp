import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    loggedIn: false,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:8000/api/token/', credentials);
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;
        this.loggedIn = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        router.push('/aulas');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async refreshToken() {
      try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: this.refreshToken });
        this.accessToken = response.data.access;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.logout();
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.loggedIn = false;
      delete axios.defaults.headers.common['Authorization'];
      router.push('/');
    },
  },
});
