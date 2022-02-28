import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { reactChild } from "../types/types";

interface SimpleModalProps extends reactChild {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type?: "delete" | "view";
  onClick?: () => void;
}

const SimpleModal = ({
  onClose,
  isOpen,
  children,
  title,
  type,
  onClick,
}: SimpleModalProps) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInRight"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {type === "delete" && (
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="outline" colorScheme="red" onClick={onClick}>
              Delete
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

SimpleModal.defaultProps = {
  type: "",
  onClick: null,
};

export default SimpleModal;
