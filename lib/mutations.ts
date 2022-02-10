import fetcher from "./fetcher";

export const auth = (mode: string, body: object) => {
  return fetcher(`/${mode}`, body);
};
