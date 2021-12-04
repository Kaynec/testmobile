import { MutationTree } from 'vuex';

import { Token, UserDocuments } from '@/@types';

import { State } from './state';
import { StudentMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [StudentMutationTypes.SET_TOKEN](state: S, payload: Token | null): void;
  [StudentMutationTypes.SET_USER](
    state: S,
    payload: UserDocuments | null
  ): void;
  [StudentMutationTypes.SET_CURRENT_ID_OF_EXAM](
    state: S,
    payload: string | null
  ): void;
  [StudentMutationTypes.SET_CURRENT_ID_OF_SHOP](
    state: S,
    payload: string | null
  ): void;
  [StudentMutationTypes.SET_BASKET_COUNT](
    state: S,
    payload: number | null
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [StudentMutationTypes.SET_TOKEN](state: State, token: Token) {
    state.token = token;
  },
  [StudentMutationTypes.SET_USER](state: State, user: UserDocuments | null) {
    state.user = user;
  },
  [StudentMutationTypes.SET_CURRENT_ID_OF_EXAM](state: State, payload: string) {
    state.CurrentIdOfExam = payload;
  },
  [StudentMutationTypes.SET_CURRENT_ID_OF_SHOP](state: State, payload: string) {
    state.CurrentIdOfShop = payload;
  },
  [StudentMutationTypes.SET_BASKET_COUNT](state: State, payload: number) {
    state.BasketCount = payload;
  }
};
