import { studentInstance } from './student-api-client';
import { LoginDocuments, UserDocuments } from '@/@types';
class StudentAuthService {
  async signUp(user: UserDocuments) {
    return studentInstance.post('auth/student/signup', user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
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
