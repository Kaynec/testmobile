import { MutationTree } from 'vuex';

import { Token, UserDocuments } from '@/@types';

import { State } from './state';
import { DocumentsMutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [DocumentsMutationTypes.SET_TOKEN](state: S, payload: Token): void;
  [DocumentsMutationTypes.SET_USER](state: S, payload: UserDocuments): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [DocumentsMutationTypes.SET_TOKEN](state: State, token: Token) {
    state.token = token;
  },
  [DocumentsMutationTypes.SET_USER](state: State, user: UserDocuments) {
    state.user = user;
  }
};
