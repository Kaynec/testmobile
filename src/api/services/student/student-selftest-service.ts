import { studentInstance as instance } from '@/api/services/student/student-api-client';
class SelfTest {
  async AllCourses() {
    return instance.get('course/getCourses', {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async registerSelfTest(selftest) {
    return instance.post('self-test', selftest, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
  async selfTestResult(selftest) {
    return instance.post('self-test/getSessionResult', selftest, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });
  }
}

export const StudentSelfTestApi = new SelfTest();
