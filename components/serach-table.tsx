import { Box } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useState } from "react";
import { useLazyRequest } from "../lib/hooks";

interface SearchTableProps {
  query: string;
  name: string;
  setData: Function;
  filter: string;
  setFilter: Function;
  type: "SERVER" | "CLIENT";
}

export const SearchTable = ({
  query,
  setData,
  name,
  filter,
  setFilter,
  type,
}: SearchTableProps) => {
  const [value, setValue] = useState(filter);
  const { executeQuery, response } = useLazyRequest(query);
  const findItemsDelay = debounce(executeQuery, 350);
  const onChange = debounce((val) => {
    setFilter(val || undefined);
  }, 200);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (type === "CLIENT") {
      onChange(e.target.value);
    } else {
      findItemsDelay({ searchTerm: e.target.value });
    }
    const { data } = response;
    if (data) {
      setData(data?.[name]);
    }
  };
  return (
    <Box>
      <Input
        type="search"
        value={value || ""}
        onChange={(e) => handleChange(e)}
        px="2"
        py="1"
        variant="filled"
        placeholder="search table here..."
        colorScheme="purple"
      />
    </Box>
  );
};
