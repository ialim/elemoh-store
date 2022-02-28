import { Box, Text } from "@chakra-ui/layout";
import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Input,
  Table,
} from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";

export interface FieldProps {
  control: any;
  register: Function;
  onOpen: () => void;
  setItem: Function;
}

const InputField = ({ control, register, onOpen, setItem }: FieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });
  return (
    <Box mt="20">
      <Text mb="5">Facet Values</Text>
      <Table mt="15" display={fields.length ? "table" : "none"}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>

        <Tbody textAlign="left">
          {fields.map((item, index) => (
            <Tr key={item.id}>
              <Td>
                <Input {...register(`values.${index}.name`)} />
              </Td>
              <Td>
                <Button
                  variant="outline"
                  colorScheme="purple"
                  onClick={() => {
                    const main = Object.fromEntries(Object.entries(item));
                    if (!main.createdAt) {
                      remove(index);
                      return;
                    }
                    onOpen();
                    setItem(item);
                  }}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        leftIcon={<IoAddOutline />}
        variant="outline"
        colorScheme="purple"
        onClick={() => {
          append({ name: "" });
        }}
      >
        ADD FACET VALUE
      </Button>
    </Box>
  );
};

export default InputField;
