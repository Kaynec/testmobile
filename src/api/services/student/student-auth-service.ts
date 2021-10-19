import { studentInstance } from './student-api-client';
import { LoginDocuments } from '@/@types';
class StudentAuthService {
  async login(user: LoginDocuments) {
    return studentInstance.post('auth/student/login', user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }

  async currentUser() {
    return studentInstance.get('auth/student/me', {
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
