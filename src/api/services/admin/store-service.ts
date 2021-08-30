import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://612c823fab461c00178b5d22.mockapi.io/',
  // 5 minutes
  timeout: 300000,
  headers: {}
});

// import { instance } from '../../apiclient';

class StoreService {
  async get(id: string) {
    return instance.get(`items/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getAll() {
    return instance.get(`items`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async create(user: any) {
    return instance.post(`items`, user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async update(id: number, user: any) {
    return instance.put(`items/${id}`, user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async delete(id: string) {
    return instance.delete(`items/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
}

export const StoreServiceApi = new StoreService();
