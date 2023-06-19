import axios from 'axios';

import { store } from '@store';
import { getTokens } from '@store/auth/operations';
import { logout } from '@store/auth/slice';

export const instance = axios.create({
  baseURL: 'https://todo-app-backend-igep.onrender.com/api',
});

export const setAuthHeader = (token?: string) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

instance.interceptors.request.use(config => {
  const { auth } = store.getState();
  const accessToken = auth.token?.access;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const { status, data } = error.response;
    if (status === 401 && data.message === 'Token expired') {
      try {
        const res = await store.dispatch(getTokens());
        if (res.type == 'auth/refresh/fulfilled') {
          return instance(error.config);
        } else {
          store.dispatch(logout());
          return Promise.reject(error);
        }
      } catch (e) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
