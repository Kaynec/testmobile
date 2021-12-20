import { Token, UserDocuments, UserProfileName } from '@/@types';

export interface CurrentQuestionsListInterface {
  title: string;
  currentChunk: number | string;
  questions: any[];
}

export type State = {
  token: Token | null;
  user: UserDocuments | null;
  userProfileName: UserProfileName | null;
  CurrentShopInfo: any | null;
  BasketCount: number;
  CurrentSuppertPerson: string | null;
  CurrentQuestionsList: CurrentQuestionsListInterface | null;
};

export const state: State = {
  token: null,
  user: null,
  userProfileName: null,
  CurrentShopInfo: null,
  CurrentSuppertPerson: null,
  BasketCount: 0,
  CurrentQuestionsList: {
    title: '',
    currentChunk: 0,
    questions: []
  }
};
