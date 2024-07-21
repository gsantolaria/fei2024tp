import axios from 'axios';
import router from '@/router';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const useAuthStore = require('@/store/auth').useAuthStore;
    const authStore = useAuthStore();

    if (error.response.status === 401 && !error.config.__isRetryRequest) {
      try {
        error.config.__isRetryRequest = true;
        await authStore.refreshToken();
        const newToken = authStore.accessToken;
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(error.config);
      } catch (refreshError) {
        router.push({ name: 'Login' });
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
}

export default {
  setAuthToken,

  login(credentials) {
    return apiClient.post('/token/', {
      username: credentials.username,
      password: credentials.password,
    });
  },
  refreshToken(refresh) {
    return apiClient.post('/token/refresh/', { refresh });
  },
};
