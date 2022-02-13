import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Input } from "@chakra-ui/react";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoPlayBackOutline,
  IoPlayForwardOutline,
} from "react-icons/io5";

interface TableFooterProps {
  canPreviousPage: boolean;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  canNextPage: boolean;
  pageOptions: any;
  gotoPage: Function;
  previousPage: Function;
  nextPage: Function;
  page: any[];
  rows: any[];
}

const TableFooter = ({
  canNextPage,
  canPreviousPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  gotoPage,
  previousPage,
  nextPage,
  page,
  rows,
}: TableFooterProps) => {
  return (
    <Box
      d="flex"
      flexDirection="row"
      justifyContent="space-between"
      fontWeight="light"
      fontSize="xs"
      alignContent="center"
      alignItems="center"
      mt="2"
      color="purple.600"
    >
      <Text fontWeight="extrabold">
        Showing {page.length ? pageSize * pageIndex + 1 : page.length} -{" "}
        {pageIndex + 1 >= pageCount
          ? rows.length
          : page.length * (pageIndex + 1)}{" "}
        of {rows.length} results
      </Text>
      <Box>
        <IconButton
          variant="outline"
          colorScheme="gray"
          aria-label="Backward"
          w="5"
          _disabled={{ opacity: "40" }}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          icon={<IoPlayBackOutline />}
        />
        <IconButton
          variant="outline"
          colorScheme="gray"
          aria-label="previous"
          w="5"
          _disabled={{ opacity: "40" }}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          icon={<IoChevronBackOutline />}
        />
        <IconButton
          variant="outline"
          colorScheme="gray"
          aria-label="next"
          w="5"
          _disabled={{ opacity: "40" }}
          onClick={() => nextPage()}
          disabled={!canNextPage}
          icon={<IoChevronForwardOutline />}
        />
        <IconButton
          variant="outline"
          colorScheme="gray"
          aria-label="forward"
          w="5"
          _disabled={{ opacity: "40" }}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          icon={<IoPlayForwardOutline />}
        />
      </Box>
      <Box>
        <Text d="inline">Page </Text>
        <Text fontWeight="extrabold" d="inline-block">
          {pageIndex + 1} of {pageOptions.length}
        </Text>{" "}
      </Box>
      <Text>
        | Go to page:{" "}
        <Input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const seekPage = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(seekPage);
          }}
          w="5"
        />
      </Text>{" "}
    </Box>
  );
};

export default TableFooter;
