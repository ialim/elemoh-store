import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@chakra-ui/react";
import { reactChild } from "../types/types";

export interface SimpleModalProps extends reactChild {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type?: "delete" | "view" | "import";
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
      size={["view", "import"].includes(type || "") ? "3xl" : "lg"}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <Divider />
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
