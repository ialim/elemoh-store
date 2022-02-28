import { Box, Text } from "@chakra-ui/layout";
import ReactSelect from "react-select/async";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Button,
} from "@chakra-ui/react";
import { Controller, useFieldArray } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";

interface VariantInputFieldProps {
  control: any;
  register: Function;
  handleInputChange: any;
  getFacetValues: any;
  type: "product" | "variant";
}
const VariantInputField = ({
  control,
  register,
  handleInputChange,
  getFacetValues,
  type,
}: VariantInputFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const loadOptions = async (
    inputValue: string,
    // eslint-disable-next-line no-unused-vars
    callback: (options: any[]) => void
  ) => {
    callback(await getFacetValues(inputValue, type));
  };

  return (
    <Box mt="20">
      <Text mb="5">Product Variants</Text>
      <Table mt="15" display={fields.length ? "table" : "none"}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Barcode</Th>
            <Th>Facet Values</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>

        <Tbody textAlign="left">
          {fields.map((item, index) => (
            <Tr key={item.id}>
              <Td>
                <Input {...register(`variants.${index}.name`)} />
              </Td>
              <Td>
                <Input {...register(`variants.${index}.barcode`)} />
              </Td>
              <Td>
                <Controller
                  render={({ field }) => (
                    <ReactSelect
                      closeMenuOnSelect={false}
                      value={field.value}
                      onChange={field.onChange}
                      ref={field.ref}
                      isMulti
                      placeholder="Add Facets"
                      onInputChange={handleInputChange}
                      loadOptions={loadOptions}
                    />
                  )}
                  name={`variants.${index}.facetValues`}
                  control={control}
                  rules={{ required: true }}
                />
              </Td>
              <Td>
                <Button
                  variant="outline"
                  colorScheme="purple"
                  onClick={() => {
                    remove(index);
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

export default VariantInputField;
