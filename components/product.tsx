import { useMemo, useState } from "react";
import { Box, Badge } from "@chakra-ui/layout";
import { useProducts, useProductsCount } from "../lib/hooks";
import {
  ALL_PRODUCTS_PAGINATED,
  ALL_PRODUCTS_QUERY,
  CLIENT_SIDE_FILTERING_LIMIT,
  DELETE_PRODUCT,
  SEARCH_PRODUCTS_QUERY,
} from "../constants/paths";
import { formatDate } from "../lib/formatters";
import ModelList from "./model-list";
import { PRODUCT_CSV_COLUMN_ORDER } from "../constants/value";
import ProductViewModal from "./product-view-modal";

const Product = () => {
  const [values, setValues] = useState<any>();
  const { count, isLoading, isError } = useProductsCount();
  const productsCount = count?.error ? 0 : count;

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
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ value }: any) => (
          <Box>
            {value.map((val: any) => (
              <Badge key={val.name} mx="1">
                {val.name}
              </Badge>
            ))}
          </Box>
        ),
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
      models={products?.error ? undefined : products}
      deletePath={DELETE_PRODUCT}
      deleteWarning="This will delete all associated product variants"
      actions={["VIEW", "EDIT", "DELETE"]}
      correctCollumnOrder={PRODUCT_CSV_COLUMN_ORDER}
      viewModalContent={<ProductViewModal values={values} />}
      setValues={setValues}
      values={values}
    />
  );
};

export default Product;
