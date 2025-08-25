import type { Advert } from "../pages/adverts/types";

type AuthLogin = {
  type: "auth/login";
};

type AuthLogout = {
  type: "auth/logout";
};

type AdvertsLoaded = {
  type: "adverts/loaded";
  payload: Advert[];
};

type AdvertsCreated = {
  type: "adverts/created";
  payload: Advert;
};

type DetailLoaded = {
  type: "detail/loaded";
  payload: Advert;
};

type TagsLoaded = {
  type: "tags/loaded";
  payload: string[];
};

export const authLogin = (): AuthLogin => ({
  type: "auth/login",
});

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export const advertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
});

export const advertsCreated = (advert: Advert): AdvertsCreated => ({
  type: "adverts/created",
  payload: advert,
});

export const detailLoaded = (advert: Advert): DetailLoaded => ({
  type: "detail/loaded",
  payload: advert,
});

export const tagsLoaded = (tags: string[]): TagsLoaded => ({
  type: "tags/loaded",
  payload: tags,
});

export type Actions =
  | AuthLogin
  | AuthLogout
  | AdvertsLoaded
  | AdvertsCreated
  | DetailLoaded
  | TagsLoaded;
