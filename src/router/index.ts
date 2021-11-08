import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Main from '@/modules/main/main.vue';
import StudentMain from '@/modules/student-main/student-main.vue';
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

import Store from '@/pages/admin/store/store.vue';
import StoreEdit from '@/pages/admin/store/store-edit.vue';

import Announcement from '@/pages/admin/announcement/announcement.vue';
import AnnouncementEdit from '@/pages/admin/announcement/announcement-edit.vue';

import Notification from '@/pages/admin/notification/notification.vue';
import NotificationEdit from '@/pages/admin/notification/notification-edit.vue';

import Exam from '@/pages/admin/exam/exam.vue';
import ExamEdit from '@/pages/admin/exam/exam-edit.vue';

// student page import

import StudentLogin from '@/pages/student/login/login.vue';
import Home from '@/pages/student/home/home.vue';
import StudentSignup from '@/pages/student/signup/signup.vue';
import StudentPasswordRecover from '@/pages/student/password-recover/password-recover.vue';
import StudentAuthentication from '@/pages/student/authentication/StudentAuthentication.vue';
import StudentSetting from '@/pages/student/setting/setting.vue';

import StudentShop from '@/pages/student/shop/shop.vue';
import ShopBookList from '@/pages/student/shop/shop-book-list.vue';

import StudentGroupPage from '@/pages/student/group/group.vue';
import SelfTest from '@/pages/student/azmoon/self-test.vue';
import CompTest from '@/pages/student/azmoon/comp-test.vue';
import ContactUs from '@/pages/student/contact-us/contact-us.vue';

import { useAdminStore, useStudentStore } from '@/store';
const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!useAdminStore().getters.getUserToken) {
    next();
    return;
  }
  next('/');
};
const ifAuthenticated = (to: any, from: any, next: any) => {
  if (useAdminStore().getters.getUserToken) {
    next();
    return;
  }
  next('/admin/login');
};
const ifStudentNotAuthenticated = (to: any, from: any, next: any) => {
  if (!useStudentStore().getters.getStudentToken) {
    next();
    return;
  }
  next('/student/home');
};
const ifStudentAuthenticated = (to: any, from: any, next: any) => {
  if (useStudentStore().getters.getStudentToken) {
    next();
    return;
  }
  next('/student/login');
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
        props: true,
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
        props: true,
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
        props: true,
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

      {
        path: 'store',
        name: 'store',
        component: Store
      },
      {
        path: 'store-create',
        name: 'store-create',
        props: true,
        component: StoreEdit
      },
      {
        path: 'store-edit',
        name: 'store-edit',
        props: true,
        component: StoreEdit
      },

      {
        path: 'announcement',
        name: 'announcement',
        props: true,
        component: Announcement
      },
      {
        path: 'announcement-create',
        name: 'announcement-create',
        props: true,
        component: AnnouncementEdit
      },
      {
        path: 'announcement-edit',
        name: 'announcement-edit',
        props: true,
        component: AnnouncementEdit
      },

      {
        path: 'notification',
        name: 'notification',
        props: true,
        component: Notification
      },
      {
        path: 'notification-create',
        name: 'notification-create',
        props: true,
        component: NotificationEdit
      },
      {
        path: 'notification-edit',
        name: 'notification-edit',
        props: true,
        component: NotificationEdit
      },

      {
        path: 'exam',
        name: 'exam',
        props: true,
        component: Exam
      },
      {
        path: 'exam-create',
        name: 'exam-create',
        props: true,
        component: ExamEdit
      },
      {
        path: 'exam-edit',
        name: 'exam-edit',
        props: true,
        component: ExamEdit
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
    path: '/student',
    name: 'Student',
    component: StudentMain,
    children: [
      {
        path: 'login',
        name: 'StudentLogin',
        component: StudentLogin,
        beforeEnter: ifStudentNotAuthenticated
      },

      {
        path: 'password-recover',
        name: 'StudentPasswordRecover',
        component: StudentPasswordRecover,
        props: true,
        beforeEnter: ifStudentNotAuthenticated
      },
      {
        path: 'Authentication',
        name: 'StudentAuthentication',
        component: StudentAuthentication,
        props: true,
        beforeEnter: ifStudentNotAuthenticated
      },

      {
        path: 'signup',
        name: 'StudentSignup',
        component: StudentSignup,
        beforeEnter: ifStudentNotAuthenticated
      },
      {
        path: 'home',
        name: 'Home',
        component: Home
        // beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'setting',
        name: 'StudentSetting',
        component: StudentSetting
      },
      {
        path: 'shop',
        name: 'studentShop',
        component: StudentShop
        // beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'group',
        name: 'StudentGroupPage',
        component: StudentGroupPage
      },
      {
        path: 'self-test',
        name: 'SelfTest',
        component: SelfTest
      },
      {
        path: 'comp-test',
        name: 'compTest',
        component: CompTest
      },
      {
        path: 'contact-us',
        name: 'contactUs',
        component: ContactUs
      },
      {
        path: 'shop-book-list',
        name: 'ShopBookList',
        component: ShopBookList,
        props: true
      }
    ]
  },
  {
    path: '/admin/login',
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
