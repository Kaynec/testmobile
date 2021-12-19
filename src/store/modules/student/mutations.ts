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
  [StudentMutationTypes.SET_BASKET_COUNT](
    state: S,
    payload: number | null
  ): void;
  [StudentMutationTypes.SET_CURRENT_SHOP_INFO](
    state: S,
    payload: any | null
  ): void;
  [StudentMutationTypes.SET_CURRENT_SUPPORT_PERSON](
    state: S,
    payload: string | null
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [StudentMutationTypes.SET_TOKEN](state: State, token: Token) {
    state.token = token;
  },
  [StudentMutationTypes.SET_USER](state: State, user: UserDocuments | null) {
    state.user = user;
  },
  [StudentMutationTypes.SET_BASKET_COUNT](state: State, payload: number) {
    if (payload >= 0) state.BasketCount = payload;
  },
  [StudentMutationTypes.SET_CURRENT_SHOP_INFO](state: State, payload: any) {
    state.CurrentShopInfo = payload;
  },
  [StudentMutationTypes.SET_CURRENT_SUPPORT_PERSON](
    state: State,
    payload: string
  ) {
    state.CurrentSuppertPerson = payload;
  }
};
