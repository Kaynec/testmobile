import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import Dashboard from '@/pages/dashboard/dashboard.vue';
import Student from '@/pages/admin/student/student.vue';
import StudentEdit from '@/pages/admin/student/student-edit.vue';
import Profile from '@/pages/profile/profile.vue';
import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';
import Mentor from '@/pages/admin/mentor/mentor.vue';
import MentorEdit from '@/pages/admin/mentor/mentor-edit.vue';
// import Admin from '@/pages/admin/admin/admin.vue';
// import AdminEdit from '@/pages/admin/admin/admin-edit.vue';
import Course from '@/pages/admin/course/course.vue';
import CourseEdit from '@/pages/admin/course/course-edit.vue';
import Session from '@/pages/admin/session/session.vue';
import SessionEdit from '@/pages/admin/session/session-edit.vue';
import Question from '@/pages/admin/question/question.vue';
import QuestionEdit from '@/pages/admin/question/question-edit.vue';

import { useStore } from '@/store';
const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!useStore().getters.getUserToken) {
    next();
    return;
  }
  next('/');
};
const ifAuthenticated = (to: any, from: any, next: any) => {
  if (useStore().getters.getUserToken) {
    next();
    return;
  }
  next('/login');
};
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      }
    ],
    beforeEnter: ifAuthenticated
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Main,
    children: [
      {
        path: 'student',
        name: 'student',
        component: Student
      },
      {
        path: 'student-create',
        name: 'student-create',
        props: true,
        component: StudentEdit
      },
      {
        path: 'student-edit',
        name: 'student-edit',
        props: true,
        component: StudentEdit
      },
      {
        path: 'mentor',
        name: 'mentor',
        component: Mentor
      },
      {
        path: 'mentor-create',
        name: 'mentor-create',
        props: true,
        component: MentorEdit
      },
      {
        path: 'mentor-edit',
        name: 'mentor-edit',
        props: true,
        component: MentorEdit
      },

      {
        path: 'course',
        name: 'course',
        component: Course
      },
      {
        path: 'course-create',
        name: 'course-create',
        props: true,
        component: CourseEdit
      },
      {
        path: 'course-edit',
        name: 'course-edit',
        props: true,
        component: CourseEdit
      },
      {
        path: 'session',
        name: 'session',
        component: Session
      },
      {
        path: 'session-create',
        name: 'session-create',
        props: true,
        component: SessionEdit
      },
      {
        path: 'session-edit',
        name: 'session-edit',
        props: true,
        component: SessionEdit
      },

      {
        path: 'question',
        name: 'question',
        component: Question
      },
      {
        path: 'question-create',
        name: 'question-create',
        props: true,
        component: QuestionEdit
      },
      {
        path: 'question-edit',
        name: 'question-edit',
        props: true,
        component: QuestionEdit
      },

      // {
      //   path: 'admin',
      //   name: 'admin',
      //   component: Admin
      // },
      // {
      //   path: 'admin-create',
      //   name: 'admin-create',
      //   props: true,
      //   component: AdminEdit
      // },
      // {
      //   path: 'admin/updateProfile',
      //   name: 'admin/updateProfile',
      //   props: true,
      //   component: AdminEdit
      // },

      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ],
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/ ',
    name: 'ForgotPassword',
    component: ForgotPassword,
    beforeEnter: ifNotAuthenticated
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
