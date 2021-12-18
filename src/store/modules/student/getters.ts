import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { State } from './state';
import { UserDocuments } from '@/@types';

export type Getters = {
  getStudentToken(state: State): string | null;
  getCurrentStudent(state: State): UserDocuments | null;
  getBasketCount(state: State): number | null;
  getCurrentShopInfo(state: State): any | null;
  getProfilePicture(state: State): string | null;
  getCurrentSupportPerson: (state) => string | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getStudentToken: (state) => {
    return state.token;
  },
  getCurrentStudent: (state) => {
    return state.user;
  },
  getBasketCount: (state) => {
    return state.BasketCount;
  },
  getCurrentShopInfo: (state) => {
    return state.CurrentShopInfo;
  },
  getProfilePicture: (state) => {
    return state.ProfilePicture;
  },
  getCurrentSupportPerson: (state) => {
    return state.CurrentSuppertPerson;
  }
};
