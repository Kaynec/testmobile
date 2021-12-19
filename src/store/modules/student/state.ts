import { Token, UserDocuments, UserProfileName } from '@/@types';

export type State = {
  token: Token | null;
  user: UserDocuments | null;
  userProfileName: UserProfileName | null;
  CurrentShopInfo: any | null;
  BasketCount: number;
  CurrentSuppertPerson: string | null;
};

export const state: State = {
  token: null,
  user: null,
  userProfileName: null,
  CurrentShopInfo: null,
  CurrentSuppertPerson: null,
  BasketCount: 0
};
