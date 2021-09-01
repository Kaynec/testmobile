import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://612c823fab461c00178b5d22.mockapi.io/',
  // 5 minutes
  timeout: 300000,
  headers: {}
});

// import { instance } from '../../apiclient';

class ExamService {
  async get(id: string) {
    return instance.get(`exam/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getAll() {
    return instance.get(`exam`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async create(exam: any) {
    return instance.post(`exam`, exam, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async update(id: number, exam: any) {
    return instance.put(`exam/${id}`, exam, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async delete(id: string) {
    return instance.delete(`exam/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
}

export const ExamServiceApi = new ExamService();
