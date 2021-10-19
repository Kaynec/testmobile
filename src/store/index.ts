import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  store as users,
  DocumentsStore,
  State as UserState
} from '@/store/modules/admin';
import {
  store as students,
  StudentsStore,
  State as StudentState
} from '@/store/modules/student';

export type RootState = {
  users: UserState;
  students: StudentState;
};

export type AdminStore = DocumentsStore<Pick<RootState, 'users'>>;
export type StudentStore = StudentsStore<Pick<RootState, 'students'>>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

// Plug in session storage based persistence
plugins.push(createPersistedState({ storage: window.sessionStorage }));

export const store = createStore({
  plugins,
  modules: {
    users,
    students
  }
});

export function useAdminStore(): AdminStore {
  return store as AdminStore;
}

export function useStudentStore(): StudentStore {
  return store as StudentStore;
}
