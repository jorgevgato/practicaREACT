import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import type { Advert } from "../adverts/types";
import type { Credentials, Login } from "./types";

const ADVERTS_URL = "/api/v1/adverts";

export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>("/api/auth/login", credentials);
  const { accessToken } = response.data;
  storage.set("auth", accessToken);
  setAuthorizationHeader(accessToken);
};

export const logout = async () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};

export const createAdvert = async (content: object) => {
  const response = await client.post<Advert>(ADVERTS_URL, { content });
  return response.data;
};
