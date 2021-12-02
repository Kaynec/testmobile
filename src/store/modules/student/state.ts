import { Token, UserDocuments, UserProfileName } from '@/@types';

export type State = {
  token: Token | null;
  user: UserDocuments | null;
  userProfileName: UserProfileName | null;
  CurrentIdOfExam: string | null;
  CurrentIdOfShop: string | null;
};

export const state: State = {
  token: null,
  user: null,
  userProfileName: null,
  CurrentIdOfExam: null,
  CurrentIdOfShop: null
};
