import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getAdverts = (state: RootState) => state.adverts;

export const getTags = (state: RootState): string[] => state.tags;
