import SimpleModal, { SimpleModalProps } from "./modal";

interface ViewModalProps extends SimpleModalProps {}

const ViewModal = ({
  onClose,
  isOpen,
  title,
  type,
  children,
}: ViewModalProps) => {
  return (
    <SimpleModal onClose={onClose} isOpen={isOpen} title={title} type={type}>
      {children}
    </SimpleModal>
  );
};

export default ViewModal;
