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
        'Content-Type': 'application/json'
      }
    });
  }

  async sendVerificationCode(code) {
    return instance.post('auth/verificationcode', code, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }

  async editStudent(student) {
    return instance.post('auth/student/profile', student, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
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
  async getStudentImage(name: string) {
    return instance.get(`student/getProfileImage/${name}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
      }
    });
  }
  async uploadProfile(formDataPicture) {
    return instance.post('student/uploadProfile', formDataPicture, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  logout() {
    console.log('logout');
  }
}

export const StudentAuthServiceApi = new StudentAuthService();
