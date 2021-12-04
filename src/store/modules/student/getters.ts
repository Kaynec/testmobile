import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { State } from './state';
import { UserDocuments } from '@/@types';

export type Getters = {
  getStudentToken(state: State): string | null;
  getCurrentStudent(state: State): UserDocuments | null;
  getCurrentIdOfExam(state: State): string | null;
  getCurrentIdOfShop(state: State): string | null;
  getBasketCount(state: State): number | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getStudentToken: (state) => {
    return state.token;
  },
  getCurrentStudent: (state) => {
    return state.user;
  },
  getCurrentIdOfExam: (state) => {
    return state.CurrentIdOfExam;
  },
  getCurrentIdOfShop: (state) => {
    return state.CurrentIdOfShop;
  },
  getBasketCount: (state) => {
    return state.BasketCount;
  }
};
