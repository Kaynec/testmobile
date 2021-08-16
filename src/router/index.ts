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
