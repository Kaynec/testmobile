import { instance } from '../../apiclient';
import { UserDocuments } from '@/@types';
class QuestionService {
  async get(id: string) {
    return instance.get(`question/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async getAll(filter: any) {
    return instance.get(`question`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      },
      params: {
        filter: filter
      }
    });
  }
  async create(user: UserDocuments) {
    return instance.post(`question`, user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async update(id: string, user: Partial<UserDocuments>) {
    return instance.put(`question/${id}`, user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async delete(id: string) {
    return instance.delete(`question/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
}

export const QuestionServiceApi = new QuestionService();
