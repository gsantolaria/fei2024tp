import { createStore } from 'vuex';
import api from '@/api/api';
import router from '@/router';

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    isAuthenticated: !!localStorage.getItem('accessToken')
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
      localStorage.setItem('accessToken', token);
      state.isAuthenticated = true;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
      localStorage.setItem('refreshToken', token);
    },
    clearAuthData(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await api.login(credentials);
      commit('setAccessToken', response.data.access);
      commit('setRefreshToken', response.data.refresh);
      api.setAuthToken(response.data.access);
      router.push('/');
    },
    async logout({ commit }) {
      commit('clearAuthData');
      api.setAuthToken('');
      router.push('/login');
    },
    async refreshToken({ commit, state }) {
      const response = await api.refreshToken(state.refreshToken);
      commit('setAccessToken', response.data.access);
      api.setAuthToken(response.data.access);
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated
  }
});