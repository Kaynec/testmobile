import { Token, UserDocuments, UserProfileName } from '@/@types';

export type State = {
  token: Token | null;
  user: UserDocuments | null;
  userProfileName: UserProfileName | null;
  UserOrientationName: string | null;
  UserGradeName: string | null;
  CurrentIdOfExam: string | null;
};

export const state: State = {
  token: null,
  user: null,
  userProfileName: null,
  UserOrientationName: null,
  UserGradeName: null,
  CurrentIdOfExam: null
};
