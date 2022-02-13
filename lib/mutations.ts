import fetcher from "./fetcher";

export const auth = (mode: string, body: object) => {
  return fetcher(`/${mode}`, body);
};

export const search = (path: string, body: object) => {
  return fetcher(path, body);
};

export const mutate = (path: string, body: object) => {
  return fetcher(path, body);
};
