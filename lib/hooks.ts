import { useToast } from "@chakra-ui/react";
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
  const { data, error, mutate } = useSWR("/product/read/facets", fetcher);

  return {
    facets: data || [],
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const useProducts = () => {
  const { data, error, mutate } = useSWR("/product/read/products", fetcher);

  return {
    products: data || [],
    isLoading: !data && !error,
    isError: error,
    mutate,
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

export const useProductsCount = () => {
  const { data, error } = useSWR("/product/read/productsCount", fetcher);

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

export const useFacet = (variables: object) => {
  const { data, error } = useSWR(
    { url: "/product/read/facet", args: variables },
    fetcher
  );

  return {
    facet: data || null,
    isLoading: !data && !error,
    isError: error,
  };
};

export const useAlertMessage = () => {
  const toast = useToast();
  const alertMessage = (model: any, description: string) => {
    toast({
      title: model?.error ? "An error occurred." : "Success.",
      description: model?.error || description,
      status: model?.error ? "error" : "success",
      duration: model?.error ? 5000 : 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return {
    alertMessage,
  };
};
