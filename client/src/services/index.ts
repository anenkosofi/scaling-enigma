import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { store } from '@store';
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

instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      toast.error('Session expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);
