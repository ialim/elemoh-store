import { Alert, AlertIcon, AlertStatus } from "@chakra-ui/react";

interface AlertMessageProps {
  status: AlertStatus;
  message: string;
}

const AlertMessage = ({ status, message }: AlertMessageProps) => {
  return (
    <Alert position="absolute" w="30%" status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default AlertMessage;
