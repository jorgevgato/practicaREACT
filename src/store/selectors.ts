import type { RootState } from ".";
import type { Advert } from "../pages/adverts/types";

export const getIsLogged = (state: RootState) => state.auth;

export const getAdverts = (state: RootState) => state.adverts;

export const getTags = (state: RootState): string[] => state.tags;

export const getDetail = (state: RootState): Advert | null => state.detail;
