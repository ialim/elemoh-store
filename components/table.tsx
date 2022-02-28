import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Stack,
  Progress,
} from "@chakra-ui/react";
import {
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useGlobalFilter,
} from "react-table";
import React, { useEffect } from "react";
import {
  IoCloseOutline,
  IoDocumentTextOutline,
  IoPrintOutline,
} from "react-icons/io5";
import { AiOutlineFilePdf } from "react-icons/ai";
import Action from "./action";
import { IndeterminateCheckbox } from "./table-checkbox";
import TableFooter from "./table-footer";
import { SearchTable } from "./serach-table";

const ActionHeader = () => <Box>Action</Box>;

export interface TableProps {
  columns: any[];
  data: object[];
  loading: boolean;
  pageCount: any;
  fetchData: any;
  searchQuery: string;
  setData: Function;
  name: string;
  type: "SERVER" | "CLIENT";
  onOpen: () => void;
  setValues: Function;
}

const TableList = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  searchQuery,
  setData,
  name,
  type,
  onOpen,
  setValues,
}: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    selectedFlatRows,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data: data || [],
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: type === "SERVER", // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      ...(type === "SERVER" && { pageCount: controlledPageCount }),
      autoResetSortBy: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((Vcolumns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // eslint-disable-next-line react/display-name
          // eslint-disable-next-line react/no-unstable-nested-components
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <Box>
              <IndeterminateCheckbox
                indeterminate
                {...getToggleAllPageRowsSelectedProps()}
              />
            </Box>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          // eslint-disable-next-line react/display-name
          // eslint-disable-next-line react/no-unstable-nested-components
          Cell: ({ row }: any) => (
            <Box pl="5">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </Box>
          ),
        },
        ...Vcolumns,
        {
          id: "action",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // eslint-disable-next-line react/display-name
          Header: <ActionHeader />,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          // eslint-disable-next-line react/display-name
          // eslint-disable-next-line react/no-unstable-nested-components
          Cell: ({ row }: any) => (
            <Box>
              <Action
                dataType={name}
                values={row?.values}
                actions={["EDIT", "DELETE"]}
                openModal={onOpen}
                setValues={setValues}
              />
            </Box>
          ),
        },
      ]);
    }
  );

  useEffect(() => {
    setHiddenColumns(["id"]);
    console.log(selectedRowIds, selectedFlatRows);
    if (type === "SERVER") fetchData({ pageIndex, pageSize });
  }, [
    fetchData,
    pageIndex,
    pageSize,
    selectedFlatRows,
    selectedRowIds,
    setHiddenColumns,
    type,
  ]);
  return (
    <>
      <Box py="3">
        <Flex justify="space-between" align="center">
          <Box
            color="purple.700"
            d="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Select
              w="15"
              mr="1"
              variant="outline"
              h="8"
              value={pageSize}
              colorScheme="purple"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pgSize) => (
                <option key={pgSize} value={pgSize}>
                  {pgSize}
                </option>
              ))}
            </Select>
            <Text>records per page</Text>
          </Box>
          <Box>
            <SearchTable
              name={name}
              setData={setData}
              type={type}
              query={searchQuery}
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </Box>
          <Stack spacing="1" direction="row">
            <IconButton
              variant="outline"
              colorScheme="purple"
              aria-label="csv"
              icon={<IoDocumentTextOutline />}
              size="sm"
            />
            <IconButton
              variant="outline"
              colorScheme="purple"
              aria-label="print"
              icon={<IoPrintOutline />}
              size="sm"
            />
            <IconButton
              variant="outline"
              colorScheme="purple"
              aria-label="delete"
              icon={<IoCloseOutline />}
              size="sm"
            />
            <IconButton
              variant="outline"
              colorScheme="purple"
              aria-label="download pdf"
              icon={<AiOutlineFilePdf />}
              size="sm"
            />
          </Stack>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} aria-label="columns">
              {/* <Icon as={IoEyeOutline} /> */}
              <IndeterminateCheckbox
                indeterminate
                {...getToggleHideAllColumnsProps()}
              />
            </MenuButton>
            <MenuList>
              {allColumns.map(
                (column) =>
                  column.id !== "id" &&
                  column.id !== "selection" &&
                  column.id !== "action" && (
                    <MenuItem key={column.id}>
                      <Stack align="center" spacing="3" direction="row">
                        <IndeterminateCheckbox
                          {...column.getToggleHiddenProps()}
                        />
                        <Text>{column.id}</Text>
                      </Stack>
                    </MenuItem>
                  )
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      {loading && <Progress size="xs" colorScheme="purple" isIndeterminate />}
      <Table variant="simple" mt="5" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <Th
                  fontSize="md"
                  color="purple.600"
                  fontStyle="normal"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {!["selection", "action"].includes(column.id) ? (
                    <Box d="inline-block">
                      <Flex ml="1">
                        <Text
                          fontWeight="hairline"
                          color={
                            // eslint-disable-next-line no-nested-ternary
                            column.isSorted
                              ? column.isSortedDesc
                                ? "gray.400"
                                : "gray.900"
                              : "gray.400"
                          }
                        >
                          &uarr;
                        </Text>
                        <Text
                          fontWeight="hairline"
                          color={
                            // eslint-disable-next-line no-nested-ternary
                            column.isSorted
                              ? column.isSortedDesc
                                ? "gray.900"
                                : "gray.400"
                              : "gray.400"
                          }
                        >
                          &darr;
                        </Text>
                      </Flex>
                    </Box>
                  ) : (
                    ""
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody mt="1" {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <Tr
                fontWeight="light"
                py="2"
                fontSize="sm"
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Td pr="5" textAlign="left" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <TableFooter
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        page={page}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        gotoPage={gotoPage}
        nextPage={nextPage}
        rows={rows}
      />
    </>
  );
};

export default TableList;
