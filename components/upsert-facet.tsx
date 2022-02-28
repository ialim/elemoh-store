import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { FacetValue } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, NestedValue, useForm } from "react-hook-form";
import {
  CREATE_FACET,
  DELETE_FACET_VALUE,
  UPDATE_FACET,
} from "../constants/paths";
import { useAlertMessage } from "../lib/hooks";
import { mutate } from "../lib/mutations";
import InputField from "./input-field";
import DeleteModal from "./modal";

interface IFormInput {
  name: string;
}

type faceValue = {
  id?: number;
  name: string;
};

interface IFormUpdate {
  id: number;
  name: string;
  values: NestedValue<faceValue>[];
}

interface UpsertFacetProp {
  action: "create" | "update";
  facet?: IFormUpdate;
}

const UpsertFacet = ({ facet, action }: UpsertFacetProp) => {
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const [item, setItem] = useState<FacetValue>();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { alertMessage } = useAlertMessage();
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<IFormInput | IFormUpdate>({
    mode: "onChange",
    defaultValues: facet
      ? { name: facet?.name, id: facet?.id, values: facet?.values }
      : { name: "" },
  });

  const onSubmitCreate = async (data: IFormInput) => {
    setIsLoading(true);

    data.name = data.name.toLowerCase();

    const result = await mutate(CREATE_FACET, data);
    setIsLoading(false);
    alertMessage(result, `Facet: ${result.name} was created successfully`);

    router.push({ pathname: "/update-facet", query: { id: result.id } });
  };

  const onSubmitEdit = async (data: any) => {
    setIsLoading(true);

    data.name = data.name.toLowerCase();
    data.values = data.values.map((value: any) => {
      if (value.id) value.id = +value.id;
      value.name = value.name.toLocaleLowerCase();
      return value;
    });

    data.values = data.values.map((dataValue: any) => {
      const values = facet?.values.find(
        (value) => value.name === dataValue.name
      );
      if (!values) {
        return dataValue;
      }
      return null;
    });

    data.values = data.values.filter((value: any) => value !== null);

    const result = await mutate(UPDATE_FACET, data);

    setIsLoading(false);
    alertMessage(result, `Updated facet: ${result.name} successfully`);
  };

  const handleDelete = async () => {
    const deleteItem = facet?.values.find((value) => value.name === item?.name);
    const model = await mutate(DELETE_FACET_VALUE, {
      facetValueId: deleteItem?.id,
    });

    alertMessage(model, `Deleted facetValue: ${deleteItem?.name} successfully`);
  };

  return (
    <Box paddingY="5" paddingX="10">
      <form
        onSubmit={
          action === "create"
            ? handleSubmit(onSubmitCreate)
            : handleSubmit(onSubmitEdit)
        }
      >
        <Flex justifyContent="right" mb="3">
          <Button
            type="submit"
            colorScheme="purple"
            disabled={!isDirty || !isValid || isloading}
          >
            {action === "create" ? "Create" : "Update"}
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
        {facet && (
          <InputField
            setItem={setItem}
            onOpen={onOpen}
            control={control}
            register={register}
          />
        )}
      </form>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        type="delete"
        onClick={() => {
          onClose();
          handleDelete();
        }}
        title="Delete Facet Value"
      >
        <HStack spacing="2">
          <Text>Are you sure you want to delete </Text>
          <Text fontWeight="semibold">{item?.name}</Text>
        </HStack>
      </DeleteModal>
    </Box>
  );
};

UpsertFacet.defaultProps = {
  facet: undefined,
};

export default UpsertFacet;
