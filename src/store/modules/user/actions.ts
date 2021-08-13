import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { State } from './state';
import { Mutations } from './mutations';
import { DocumentsActionTypes } from './action-types';
import { DocumentsMutationTypes } from './mutation-types';
import { AuthServiceApi } from '@/api/services/auth/auth-service';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [DocumentsActionTypes.AUTH_REQUEST](
    { commit }: AugmentedActionContext,
    payload: any // Obsolete in here but left as an example
  ): Promise<boolean>;
  [DocumentsActionTypes.LOG_OUT]({
    commit
  }: AugmentedActionContext): Promise<boolean>;
  [DocumentsActionTypes.CURRENT_USER]({
    commit
  }: AugmentedActionContext): Promise<boolean>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [DocumentsActionTypes.AUTH_REQUEST]({ commit }, payload: any) {
    const result = await AuthServiceApi.login(payload);
    if (result.data && result.data.token) {
      commit(DocumentsMutationTypes.SET_TOKEN, result.data.token);
      return true;
    } else {
      return false;
    }
  },
  async [DocumentsActionTypes.LOG_OUT]({ commit }) {
    // const result = await AuthServiceApi.logout();
    commit(DocumentsMutationTypes.SET_TOKEN, '');
    return true;
  },
  async [DocumentsActionTypes.CURRENT_USER]({ commit }) {
    const result = await AuthServiceApi.currentUser();
    if (result.data) {
      commit(DocumentsMutationTypes.SET_USER, result.data);
      return true;
    } else {
      return false;
    }
  }
};
