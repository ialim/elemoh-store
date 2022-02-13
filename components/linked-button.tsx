import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

const LinkedButton: FC<{
  icon: React.ReactElement;
  name: string;
  href: string;
}> = ({ icon, name, href }) => {
  return (
    <Button leftIcon={icon} colorScheme="purple" variant="solid" mr="3">
      <NextLink href={href}>{name}</NextLink>
    </Button>
  );
};

export default LinkedButton;
