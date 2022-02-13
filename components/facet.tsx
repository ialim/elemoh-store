import { Box } from "@chakra-ui/layout";
import { useCallback, useMemo, useRef, useState } from "react";
import { IoAddOutline, IoDocumentsOutline } from "react-icons/io5";
import { useFacets, useFacetsCount, useLazyRequest } from "../lib/hooks";
import LinkedButton from "./linked-button";
import TableList from "./table";
import {
  ALL_FACETS_PAGINATED,
  ALL_FACETS_QUERY,
  CLIENT_SIDE_FILTERING_LIMIT,
  SEARCH_FACETS_QUERY,
} from "../constants/paths";
import { formatDate } from "../lib/formatters";

const Facet = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const { count, isLoading } = useFacetsCount();
  const fetchIdRef = useRef(0);
  const facetsCount = count || 0;

  const query =
    facetsCount < CLIENT_SIDE_FILTERING_LIMIT
      ? ALL_FACETS_QUERY
      : ALL_FACETS_PAGINATED;

  const { response, executeQuery } = useLazyRequest(query);
  const { facets } = useFacets();

  const clientData = useMemo(() => facets || [], [facets]);

  const fetchData = useCallback(
    ({ pageSize, pageIndex }: any) => {
      // Give this fetch an ID
      const fetchId = fetchIdRef.current + 1;

      // We'll even set a delay to simulate a server here
      if (fetchId === fetchIdRef.current) {
        const variables = {
          skip: (pageIndex + 1) * pageSize - pageSize,
          first: pageSize,
        };
        executeQuery(variables);
        setData(response?.data?.facets || []);
        setPageCount(Math.ceil(facetsCount / pageSize));
      }
    },
    [executeQuery, facetsCount, response?.data?.facets]
  );

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
      },
    ],
    []
  );
  return (
    <Box paddingY="5" paddingX="10">
      <Box mb="5">
        <LinkedButton
          name="Add Facet"
          href="/create-facets"
          icon={<IoAddOutline />}
        />
        <LinkedButton
          name="Import Facets"
          href="/import-facets"
          icon={<IoDocumentsOutline />}
        />
      </Box>
      <Box>
        <TableList
          data={facetsCount < CLIENT_SIDE_FILTERING_LIMIT ? clientData : data}
          fetchData={fetchData}
          setData={setData}
          columns={columns}
          pageCount={pageCount}
          name="facets"
          loading={isLoading}
          searchQuery={SEARCH_FACETS_QUERY}
          dataType="facet"
          type={facetsCount < CLIENT_SIDE_FILTERING_LIMIT ? "CLIENT" : "SERVER"}
        />
      </Box>
    </Box>
  );
};

export default Facet;
