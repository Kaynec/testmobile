import { Token, UserDocuments } from '@/@types';

export type State = {
  token: Token | null;
  user: UserDocuments | null;
};

export const state: State = {
  token: null,
  user: null
};
