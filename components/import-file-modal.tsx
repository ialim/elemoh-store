import { Container, VStack } from "@chakra-ui/layout";
import axios from "axios";
import UiFileInputButton from "./file-input";
import SimpleModal, { SimpleModalProps } from "./modal";

interface ImportFileModalProps extends Omit<SimpleModalProps, "children"> {
  correctCollumnOrder: string;
  name: string;
}

const ImportFileModal = ({
  onClose,
  isOpen,
  title,
  correctCollumnOrder,
  name,
}: ImportFileModalProps) => {
  const onChange = async (formData: any) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/uploads", formData, config);

    console.log("response", response.data);
  };
  return (
    <SimpleModal onClose={onClose} isOpen={isOpen} title={title} type="import">
      <VStack spacing="5">
        <Container>
          The correct column order is ({correctCollumnOrder}) and you must
          follow this.
        </Container>
        <Container>
          To display Image it must be stored in public/images/{name} directory.
          Image name must be same as {name} name
        </Container>
        <UiFileInputButton
          uploadFileName="theFiles"
          label="Upload CSV File"
          onChange={onChange}
        />
      </VStack>
    </SimpleModal>
  );
};

export default ImportFileModal;
