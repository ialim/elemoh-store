import { FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

export const RevampInput = ({
  field,
  name,
  type,
}: {
  field: any;
  name: string;
  type: string;
}) => {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <>
      {showLabel ? (
        <FormLabel fontSize="sm" color="purple.600" fontWeight="semibold">
          {name}
        </FormLabel>
      ) : (
        ""
      )}
      <Input
        {...field}
        type={type}
        variant="flushed"
        placeholder={showLabel ? "" : name}
        onFocus={() => {
          setShowLabel(true);
        }}
        onBlur={() => {
          field.onBlur();
          if (!field.value) setShowLabel(false);
        }}
      />
    </>
  );
};
