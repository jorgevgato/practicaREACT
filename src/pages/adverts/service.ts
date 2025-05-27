import { client } from "../../api/client";
import type { Advert } from "./types";

const ADVERTS_URL = "/api/v1/adverts";
const ADVERT_DETAIL_URL = "/api/v1/adverts/{id}";

export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(ADVERTS_URL);
  return response.data;
};

/**revisar */
export const getAdvertDetail = async () => {
  const response = await client.get<Advert[]>(ADVERT_DETAIL_URL);
  return response;
};
