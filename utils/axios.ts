import baseAxios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
if (baseURL === undefined) {
  throw new Error("base url obligatoire");
}
export const axios = baseAxios.create({ baseURL: baseURL });
