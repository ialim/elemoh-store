import { Box, Stack, Text } from "@chakra-ui/layout";
import { useCallback, useMemo, useRef, useState } from "react";
import { IoAddOutline, IoDocumentsOutline } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";
import { useAlertMessage, useLazyRequest } from "../lib/hooks";
import LinkedButton from "./linked-button";
import TableList from "./table";
import { CLIENT_SIDE_FILTERING_LIMIT } from "../constants/paths";
import AlertMessage from "./alert-message";
import DeleteModal from "./modal";
import { mutate } from "../lib/mutations";

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
}: ModelListProps) => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [values, setValues] = useState<any>();
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
        <LinkedButton
          name={`IMPORT ${type.toUpperCase()}`}
          href={`/import-${type}`}
          icon={<IoDocumentsOutline />}
        />
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
        title={`Delete ${type.toUpperCase()}`}
      >
        <Stack spacing="2">
          <Text>Are you sure you want to delete {values?.name}</Text>
          <Text>
            This will also delete all values attributed to this {type}
          </Text>
        </Stack>
      </DeleteModal>
    </Box>
  );
};

export default ModelList;
