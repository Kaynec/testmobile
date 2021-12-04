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
import SingleBookInfo from '@/pages/student/shop/shop-book-info.vue';
import ShopSuccess from '@/pages/student/shop/shop-order-success.vue';
import ShopFailure from '@/pages/student/shop/shop-order-fail.vue';
import ShopBasket from '@/pages/student/shop/shop-basket.vue';
import ShopAddress from '@/pages/student/shop/shop-address.vue';
import ShopMessage from '@/pages/student/shop/shop-message.vue';

import StudentGroupPage from '@/pages/student/group/group.vue';

import RoadMap from '@/pages/student/roadmap/roadmap.vue';

import Hamnavard from '@/pages/student/hamnavard/hamnavard.vue';

import SelfTest from '@/pages/student/azmoon/self-test.vue';
import SelfTestQuestions from '@/pages/student/azmoon/self-test-questions.vue';
import SelfTestQuestionsMain from '@/pages/student/azmoon/self-test-questions-main.vue';
import SelfTestQuestionsChoosen from '@/pages/student/azmoon/self-test-choosen-questions.vue';
import SelfTestQuestionsAnswers from '@/pages/student/azmoon/self-test-answers.vue';
import QuestionsChoosenNumbers from '@/pages/student/azmoon/self-test-choosen-questions-number.vue';
import ListOfExams from '@/pages/student/azmoon/list-of-exams.vue';

import CompTest from '@/pages/student/azmoon/comp-test.vue';
import CompTestQuestions from '@/pages/student/azmoon/comp-test-questions.vue';
import CompTestStart from '@/pages/student/azmoon/comp-test-startTest.vue';
import ReportCard from '@/pages/student/azmoon/report-card.vue';

import Duel from '@/pages/student/duel/duel.vue';
import DuelStart from '@/pages/student/duel/duel-start.vue';
import DuelReportCard from '@/pages/student/duel/duel-report-card.vue';
import DuelAll from '@/pages/student/duel/duel-all.vue';

import ContactUs from '@/pages/student/contact-us/contact-us.vue';
import ContactBackup from '@/pages/student/contact-backup/contact-backup.vue';
import ContactBackupInfo from '@/pages/student/contact-backup/contact-backup-info.vue';
import ContactBackupChat from '@/pages/student/contact-backup/contact-backup-chat.vue';

import ClassRoom from '@/pages/student/class/class-room.vue';
import ClassRoomNote from '@/pages/student/class/class-room-note.vue';
import ClassAdobe from '@/pages/student/class/class-adobe.vue';

import MyProfile from '@/pages/student/profile/my-profile.vue';
import ProfilePoints from '@/pages/student/profile/points.vue';
import Inbox from '@/pages/student/profile/inbox.vue';
import PurchaseHistory from '@/pages/student/profile/history.vue';
import EditProfile from '@/pages/student/profile/edit-profile.vue';
import InviteFriends from '@/pages/student/profile/invite.vue';

import Calendar from '@/pages/student/calendar/calendar.vue';

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
        component: Home,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'setting',
        name: 'StudentSetting',
        component: StudentSetting,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'shop',
        name: 'studentShop',
        component: StudentShop,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'group',
        name: 'StudentGroupPage',
        component: StudentGroupPage,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'self-test',
        name: 'SelfTest',
        component: SelfTest,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'self-test-questions',
        name: 'SelfTestQuestions',
        component: SelfTestQuestions,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'self-test-questions-main',
        name: 'SelfTestQuestionsMain',
        component: SelfTestQuestionsMain,
        props: true,
        beforeEnter: ifStudentAuthenticated
      },

      {
        path: 'self-test-questions-choosen',
        name: 'SelfTestQuestionsChoosen',
        component: SelfTestQuestionsChoosen,
        props: true,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'choosen-number',
        name: 'QuestionsChoosenNumbers',
        component: QuestionsChoosenNumbers,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'self-test-answers',
        name: 'SelfTestQuestionsAnswers',
        component: SelfTestQuestionsAnswers,
        props: true,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'list-of-exams',
        name: 'ListOfExams',
        component: ListOfExams,
        props: true,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'comp-test',
        name: 'compTest',
        component: CompTest,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'comp-test-start',
        name: 'compTestStart',
        props: true,
        component: CompTestStart,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'comp-test-questions',
        name: 'CompTestQuestions',
        props: true,
        component: CompTestQuestions,
        beforeEnter: ifStudentAuthenticated
      },

      {
        path: 'duel',
        name: 'Duel',
        component: Duel,
        beforeEnter: ifStudentAuthenticated
      },

      {
        path: 'duel-start',
        name: 'DuelStart',
        component: DuelStart,
        beforeEnter: ifStudentAuthenticated
      },

      {
        path: 'duel-report-card',
        name: 'DuelReportCard',
        beforeEnter: ifStudentAuthenticated,
        component: DuelReportCard
      },

      {
        path: 'duel-all',
        name: 'DuelAll',
        component: DuelAll,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'report-card',
        name: 'ReportCard',
        component: ReportCard,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'hamnavard',
        name: 'Hamnavard',
        component: Hamnavard,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'contact-us',
        name: 'contactUs',
        component: ContactUs,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'shop-basket',
        name: 'ShopBasket',
        component: ShopBasket,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'shop-book-list',
        name: 'ShopBookList',
        component: ShopBookList,
        props: true,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'shop-single-book',
        name: 'SingleBookInfo',
        component: SingleBookInfo,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'shop-failure',
        name: 'ShopFailure',
        component: ShopFailure,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'shop-success',
        name: 'ShopSuccess',
        component: ShopSuccess,
        props: true,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'shop-address',
        name: 'ShopAddress',
        component: ShopAddress,
        props: true,
        beforeEnter: ifStudentAuthenticated
      },
      {
        path: 'shop-message',
        name: 'ShopMessage',
        component: ShopMessage,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'contact-backup',
        name: 'ContactBackup',
        component: ContactBackup,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'contact-backup-info',
        name: 'ContactBackupInfo',
        component: ContactBackupInfo,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'contact-backup-chat',
        name: 'ContactBackupChat',
        component: ContactBackupChat,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'class-room',
        name: 'ClassRoom',
        component: ClassRoom,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'class-adobe',
        name: 'ClassAdobe',
        component: ClassAdobe,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'class-room-note',
        name: 'ClassRoomNote',
        component: ClassRoomNote,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'roadmap',
        name: 'RoadMap',
        component: RoadMap,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'my-profile',
        name: 'MyProfile',
        component: MyProfile,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'profile-points',
        name: 'ProfilePoints',
        component: ProfilePoints,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'profile-inbox',
        name: 'Inbox',
        component: Inbox,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'purchase-history',
        name: 'PurchaseHistory',
        component: PurchaseHistory,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'edit-profile',
        name: 'EditProfile',
        component: EditProfile,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'profile-invite',
        name: 'InviteFriends',
        component: InviteFriends,
        beforeEnter: ifStudentAuthenticated,
        props: true
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar,
        beforeEnter: ifStudentAuthenticated,
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
