import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  store as users,
  DocumentsStore,
  State as UserState
} from '@/store/modules/user';

export type RootState = {
  users: UserState;
};

export type Store = DocumentsStore<Pick<RootState, 'users'>>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

// Plug in session storage based persistence
plugins.push(createPersistedState({ storage: window.sessionStorage }));

export const store = createStore({
  plugins,
  modules: {
    users
  }
});

export function useStore(): Store {
  return store as Store;
}
