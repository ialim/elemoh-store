import { Box, Divider, Flex } from "@chakra-ui/layout";
import {
  Button,
  createStandaloneToast,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { mutate } from "../lib/mutations";

interface IFormInput {
  name: string;
}

const UpsertFacet = () => {
  const [isloading, setIsLoading] = useState(false);
  const toast = createStandaloneToast();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);

    data.name = data.name.toLowerCase();

    const result = await mutate("/product/create/facet", data);
    setIsLoading(false);
    if (result?.error) {
      toast({
        title: "An error occurred.",
        description: result.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    console.log(result);
  };
  return (
    <Box paddingY="5" paddingX="10">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            mb="5"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <FormLabel mr="20">Name *</FormLabel>
            <Controller
              render={({ field }) => (
                <Input w="30%" {...field} name="name" type="text" />
              )}
              name="name"
              control={control}
              rules={{ required: true }}
            />
          </FormControl>
        </Box>
      </form>
    </Box>
  );
};

export default UpsertFacet;
