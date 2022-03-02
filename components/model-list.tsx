import { Box, Stack, Text } from "@chakra-ui/layout";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { IoAddOutline, IoDocumentsOutline } from "react-icons/io5";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useAlertMessage, useLazyRequest } from "../lib/hooks";
import LinkedButton from "./linked-button";
import TableList from "./table";
import { CLIENT_SIDE_FILTERING_LIMIT } from "../constants/paths";
import AlertMessage from "./alert-message";
import DeleteModal from "./modal";
import { mutate } from "../lib/mutations";
import ViewModal from "./view-modal";
import { ActionType } from "../types/types";
import ImportFileModal from "./import-file-modal";

interface ModelListProps {
  columns: any[];
  modelCount: number;
  query: string;
  models: any[];
  type: string;
  isLoading: boolean;
  isError: any;
  searchQuery: string;
  deletePath: string;
  mutateSWR: Function;
  deleteWarning: string;
  actions: ActionType[];
  correctCollumnOrder: string;
  viewModalContent?: React.ReactElement;
  values: any;
  setValues: Function;
}

const ModelList = ({
  columns,
  modelCount,
  query,
  models,
  type,
  isLoading,
  isError,
  searchQuery,
  deletePath,
  mutateSWR,
  deleteWarning,
  actions,
  correctCollumnOrder,
  viewModalContent,
  values,
  setValues,
}: ModelListProps) => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const {
    onClose: importClose,
    onOpen: importOpen,
    isOpen: importIsOpen,
  } = useDisclosure();
  const {
    onClose: viewClose,
    onOpen: viewOpen,
    isOpen: viewIsOpen,
  } = useDisclosure();
  const { alertMessage } = useAlertMessage();

  const { response, executeQuery } = useLazyRequest(query);

  const clientData = useMemo(() => models || [], [models]);

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
        setData(response?.data?.[type] || []);
        setPageCount(Math.ceil(modelCount / pageSize));
      }
    },
    [executeQuery, modelCount, response?.data, type]
  );

  const handleDelete = async () => {
    const newModels = models.filter((model: any) => model.id !== values?.id);
    await mutateSWR(newModels, false);
    const model = await mutate(deletePath, {
      id: values?.id,
    });

    alertMessage(model, `Deleted ${type}: ${model.name} successfully`);
  };

  return (
    <Box paddingY="5" paddingX="10">
      <Box mb="5">
        <LinkedButton
          name={`ADD ${type.slice(0, -1).toUpperCase()}`}
          href={`/create-${type.slice(0, -1)}`}
          icon={<IoAddOutline />}
        />
        <Button
          leftIcon={<IoDocumentsOutline />}
          colorScheme="purple"
          variant="solid"
          mr="3"
          onClick={() => {
            importOpen();
          }}
        >
          {`IMPORT ${type.toUpperCase()}`}
        </Button>
      </Box>
      <Box>
        {isError ? (
          <AlertMessage
            title="An error occured"
            status="error"
            message={isError.error}
          />
        ) : (
          <TableList
            data={modelCount < CLIENT_SIDE_FILTERING_LIMIT ? clientData : data}
            fetchData={fetchData}
            setData={setData}
            columns={columns}
            pageCount={pageCount}
            name={type}
            loading={isLoading}
            searchQuery={searchQuery}
            type={
              modelCount < CLIENT_SIDE_FILTERING_LIMIT ? "CLIENT" : "SERVER"
            }
            onOpen={onOpen}
            setValues={setValues}
            actions={actions}
            viewOpen={viewOpen}
          />
        )}
      </Box>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        type="delete"
        onClick={() => {
          onClose();
          handleDelete();
        }}
        title={`DELETE ${type.toUpperCase()}`}
      >
        <Stack spacing="2">
          <Text>Are you sure you want to delete {values?.name}</Text>
          <Text>{deleteWarning}</Text>
        </Stack>
      </DeleteModal>
      <ViewModal
        isOpen={viewIsOpen}
        onClose={viewClose}
        title={`VIEW ${type.toUpperCase()}`}
        type="view"
      >
        {viewModalContent}
      </ViewModal>
      <ImportFileModal
        onClose={importClose}
        isOpen={importIsOpen}
        title="Import File"
        correctCollumnOrder={correctCollumnOrder}
        name={type}
      />
    </Box>
  );
};

ModelList.defaultProps = {
  viewModalContent: null,
};

export default ModelList;
