import { AlertStatus, Box, useToast } from "@chakra-ui/react";

interface AlertMessageProps {
  status: AlertStatus;
  message: string;
  title: string;
}

const AlertMessage = ({ status, message, title }: AlertMessageProps) => {
  const toast = useToast();
  toast({
    title,
    description: message,
    status,
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
  return <Box> </Box>;
};

export default AlertMessage;
