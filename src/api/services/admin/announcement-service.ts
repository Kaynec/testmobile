// import { instance } from '../../apiclient';
const alertify = require('../../../assets/alertifyjs/alertify');
import { useStore } from '@/store';

import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://612c823fab461c00178b5d22.mockapi.io/',
  // 5 minutes
  timeout: 300000,
  headers: {}
});

instance.interceptors.request.use((config) => {
  const token = useStore().getters.getUserToken;
  if (token) {
    config.headers.token = `${token}`;
  }
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.data && error.response.data.message) {
      alertify.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

// import { UserDocuments } from '@/@types';
class AnnouncementService {
  async get(id: string) {
    return instance.get(`announcement/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getAll() {
    return instance.get(`announcement`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async create(notification: any) {
    return instance.post(`announcement`, notification, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async update(id: number, notification: any) {
    return instance.put(`announcement/${id}`, notification, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async delete(id: string) {
    return instance.delete(`announcement/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
}

export const AnnouncementServiceApi = new AnnouncementService();
