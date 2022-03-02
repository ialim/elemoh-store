import { Box, Divider, Flex } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import ReactSelect from "react-select/async";
import { FacetValue } from "@prisma/client";
import { useState } from "react";
import { Controller, NestedValue, useForm } from "react-hook-form";
import VariantInputField from "./variant-input-field";
import { mutate } from "../lib/mutations";
import { CREATE_PRODUCT, SEARCH_FACET_VALUES } from "../constants/paths";
import { useAlertMessage } from "../lib/hooks";

type variant = {
  name: string;
  barcode: string;
  facetValues: FacetValue[];
};

interface CreateProductInput {
  name: string;
  facetValues: FacetValue[];
  description: string;
  variants: NestedValue<variant>[];
}

const CreateProduct = () => {
  const [isloading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const { alertMessage } = useAlertMessage();
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<CreateProductInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      facetValues: [],
      description: "",
      variants: [],
    },
  });

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    return inputValue;
  };

  const getFacetValues = async (
    inputValue: string,
    type: "product" | "variant"
  ) => {
    const omitFacets = selected.map((select) => select.label.split(":")[0]);
    const facetValues = await mutate(SEARCH_FACET_VALUES, {
      searchTerm: inputValue,
      type,
      omitFacets,
    });

    if (facetValues?.error) return [];

    const options = facetValues.map((facetValue: any) => {
      return {
        label: `${facetValue.facet.name}: ${facetValue.name}`,
        value: facetValue.id,
      };
    });
    return options;
  };

  const loadOptions = async (
    inputValue: string,
    // eslint-disable-next-line no-unused-vars
    callback: (options: any[]) => void
  ) => {
    callback(await getFacetValues(inputValue, "product"));
  };

  const onSubmitCreate = async (data: any) => {
    setIsLoading(true);
    const { name, facetValues, description, variants } = data;
    const createProductData = {
      name,
      description,
      facetValues: facetValues.map((facetValue: any) => {
        return {
          id: facetValue.value,
        };
      }),
      variants: variants.map((variantN: any) => {
        variantN.facetValues = {
          connect: variantN.facetValues.map((facetValue: any) => {
            return { id: facetValue.value };
          }),
        };
        return variantN;
      }),
    };
    const product = await mutate(CREATE_PRODUCT, createProductData);
    setIsLoading(false);
    alertMessage(product, `Product: ${product.name} was created successfully`);
  };

  const handleChange = (val: any, field: any) => {
    field.onChange(val);
    setSelected([...val]);
  };

  return (
    <Box paddingY="5" paddingX="10">
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <Flex justifyContent="right" mb="3">
          <Button
            type="submit"
            colorScheme="purple"
            disabled={!isDirty || !isValid || isloading}
          >
            Create
          </Button>
        </Flex>
        <Divider />
        <Box mt="10">
          <FormControl
            mb="10"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w="50%"
          >
            <FormLabel mr="10">Product Name *</FormLabel>
            <Controller
              render={({ field }) => (
                <Input
                  borderColor="gray.400"
                  w="70%"
                  {...field}
                  name="name"
                  type="text"
                />
              )}
              name="name"
              control={control}
              rules={{ required: true }}
            />
          </FormControl>

          <FormControl
            mb="10"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            w="50%"
          >
            <FormLabel mr="10">Attributes *</FormLabel>
            <Controller
              render={({ field }) => (
                <Box w="70%">
                  <ReactSelect
                    closeMenuOnSelect={false}
                    value={field.value}
                    onChange={(e) => handleChange(e, field)}
                    ref={field.ref}
                    isMulti
                    placeholder="Add Facets"
                    onInputChange={handleInputChange}
                    loadOptions={loadOptions}
                  />
                </Box>
              )}
              name="facetValues"
              control={control}
              rules={{ required: true }}
            />
          </FormControl>

          <FormControl mb="5" display="flex" flexDirection="column">
            <FormLabel>Description *</FormLabel>
            <Controller
              render={({ field }) => (
                <Textarea
                  borderColor="gray.400"
                  w="50%"
                  {...field}
                  name="description"
                  size="sm"
                  rounded="lg"
                />
              )}
              name="description"
              control={control}
              rules={{ required: true }}
            />
          </FormControl>
        </Box>
        <VariantInputField
          handleInputChange={handleInputChange}
          getFacetValues={getFacetValues}
          control={control}
          register={register}
          type="variant"
          handleChange={handleChange}
        />
      </form>
    </Box>
  );
};

export default CreateProduct;
