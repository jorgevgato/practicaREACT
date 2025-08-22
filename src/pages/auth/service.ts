import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import type { Credentials, Login } from "./types";

export const login = async (
  credentials: Credentials,
  rememberMe: boolean = false,
) => {
  const response = await client.post<Login>("/api/auth/login", credentials);
  const { accessToken } = response.data;

  if (rememberMe) {
    storage.local.set("auth", accessToken);
  } else {
    storage.session.set("auth", accessToken);
  }
  setAuthorizationHeader(accessToken);
};

export const logout = async () => {
  storage.local.remove("auth");
  storage.session.remove("auth");
  removeAuthorizationHeader();
};
