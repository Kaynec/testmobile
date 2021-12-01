import { studentInstance as instance } from './student-api-client';
import { LoginDocuments, UserDocuments } from '@/@types';
class StudentAuthService {
  async signUp(user: UserDocuments) {
    return instance.post('auth/student/signup', user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async login(user: LoginDocuments) {
    return instance.post('auth/student/login', user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        // 'Content-Type': 'application/json'
      }
    });
  }

  async currentUser() {
    return instance.get('auth/student/me', {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  logout() {
    console.log('logout');
  }
}

export const StudentAuthServiceApi = new StudentAuthService();
