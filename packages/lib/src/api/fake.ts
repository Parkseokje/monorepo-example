import { get } from "./service";

export const getFake = (endPoint: number) => {
  return get(`/${endPoint}`);
};
