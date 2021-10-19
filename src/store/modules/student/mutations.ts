import { MutationTree } from 'vuex';

import { Token, UserDocuments } from '@/@types';

import { State } from './state';
import { StudentMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [StudentMutationTypes.SET_TOKEN](state: S, payload: Token | null): void;
  [StudentMutationTypes.SET_USER](state: S, payload: UserDocuments): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [StudentMutationTypes.SET_TOKEN](state: State, token: Token) {
    state.token = token;
  },
  [StudentMutationTypes.SET_USER](state: State, user: UserDocuments) {
    state.user = user;
  }
};
