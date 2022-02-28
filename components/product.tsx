import { useMemo } from "react";
import { useProducts, useProductsCount } from "../lib/hooks";
import {
  ALL_PRODUCTS_PAGINATED,
  ALL_PRODUCTS_QUERY,
  CLIENT_SIDE_FILTERING_LIMIT,
  SEARCH_PRODUCTS_QUERY,
} from "../constants/paths";
import { formatDate } from "../lib/formatters";
import ModelList from "./model-list";

const Product = () => {
  const { count, isLoading, isError } = useProductsCount();
  const productsCount = count || 0;

  const query =
    productsCount < CLIENT_SIDE_FILTERING_LIMIT
      ? ALL_PRODUCTS_QUERY
      : ALL_PRODUCTS_PAGINATED;

  const { products, mutate: mutateSWR } = useProducts();

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }: any) => {
          return formatDate(new Date(value));
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Variants",
        accessor: "variants",
      },
    ],
    []
  );

  return (
    <ModelList
      modelCount={productsCount}
      mutateSWR={mutateSWR}
      query={query}
      isError={isError}
      isLoading={isLoading}
      searchQuery={SEARCH_PRODUCTS_QUERY}
      type="products"
      columns={columns}
      models={products}
      deletePath="/product/delete/product"
    />
  );
};

export default Product;
