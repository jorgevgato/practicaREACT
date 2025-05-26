import { client } from "../../api/client";
import type { Advert } from "./types";

const ADVERTS_URL = "/api/v1/adverts";

export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(ADVERTS_URL);
  return response.data;
};
