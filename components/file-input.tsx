import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, useRef } from "react";
import { IProps } from "../types/types";

const UiFileInputButton: FC<IProps> = ({
  label,
  onChange,
  allowMultipleFiles,
  uploadFileName,
  acceptedFileTypes,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <Button
        colorScheme="pink"
        variant="outline"
        type="button"
        onClick={onClickHandler}
      >
        {label}
      </Button>
      <Input
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        name={uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
      />
    </form>
  );
};

export default UiFileInputButton;
