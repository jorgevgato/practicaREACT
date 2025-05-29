import { client } from "../../api/client";
import type { Advert } from "./types";

const ADVERTS_URL = "/api/v1/adverts";

export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(ADVERTS_URL);
  return response.data;
};

export const getAdvertDetail = async (advertId: string) => {
  const url = `${ADVERTS_URL}/${advertId}`;
  const response = await client.get<Advert>(url);
  return response.data;
};

export const createAdvert = async (payload: FormData) => {
  const response = await client.post<Advert>(ADVERTS_URL, payload);
  return response.data;
};
