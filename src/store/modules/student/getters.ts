import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { State } from './state';
import { UserDocuments } from '@/@types';

export type Getters = {
  getStudentToken(state: State): string | null;
  getCurrentStudent(state: State): UserDocuments | null;
  getStudentOriantationName(state: State): string | null;
  getStudentGradeName(state: State): string | null;
  getCurrentIdOfExam(state: State): string | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getStudentToken: (state) => {
    return state.token;
  },
  getCurrentStudent: (state) => {
    return state.user;
  },
  getStudentOriantationName: (state) => {
    return state.UserOrientationName;
  },
  getStudentGradeName: (state) => {
    return state.UserGradeName;
  },
  getCurrentIdOfExam: (state) => {
    return state.CurrentIdOfExam;
  }
};
