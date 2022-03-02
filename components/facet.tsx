import { useMemo, useState } from "react";
import { Badge, Box } from "@chakra-ui/layout";
import { useFacets, useFacetsCount } from "../lib/hooks";
import {
  ALL_FACETS_PAGINATED,
  ALL_FACETS_QUERY,
  CLIENT_SIDE_FILTERING_LIMIT,
  DELETE_FACET,
  SEARCH_FACETS_QUERY,
} from "../constants/paths";
import { formatDate } from "../lib/formatters";
import ModelList from "./model-list";
import { FACET_CSV_COLUMN_ORDER } from "../constants/value";

const Facet = () => {
  const [values, setValues] = useState<any>();
  const { count, isLoading, isError } = useFacetsCount();
  const facetsCount = count?.error ? 0 : count;

  const query =
    facetsCount < CLIENT_SIDE_FILTERING_LIMIT
      ? ALL_FACETS_QUERY
      : ALL_FACETS_PAGINATED;

  const { facets, mutate: mutateSWR } = useFacets();

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
        Header: "Values",
        accessor: "values",
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
      modelCount={facetsCount}
      mutateSWR={mutateSWR}
      query={query}
      isError={isError}
      isLoading={isLoading}
      searchQuery={SEARCH_FACETS_QUERY}
      type="facets"
      columns={columns}
      models={facets?.error ? undefined : facets}
      deletePath={DELETE_FACET}
      deleteWarning="This will delete all associated facet values for this facets"
      actions={["EDIT", "DELETE"]}
      correctCollumnOrder={FACET_CSV_COLUMN_ORDER}
      setValues={setValues}
      values={values}
    />
  );
};

export default Facet;
