import { useState } from "react";
import useSWR from "swr";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const useFacets = () => {
  const { data, error } = useSWR("/product/read/facets", fetcher);

  return {
    facets: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const useFacetsCount = () => {
  const { data, error } = useSWR("/product/read/facetsCount", fetcher);

  return {
    count: data || 0,
    isLoading: !data && !error,
    isError: error,
  };
};

export const useSearch = (path: string) => {
  const { data, error } = useSWR(path, fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const useLazyRequest = (path: string) => {
  const [response, setResponse] = useState<{ data?: any; error?: any }>({
    data: {},
    error: {},
  });
  const executeQuery = async (variables: object) => {
    const result = await fetcher(path, variables);
    setResponse(result);
    return result;
  };
  return { executeQuery, response };
};
