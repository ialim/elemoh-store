import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

const ActionItem: FC<{
  icon: React.ReactElement;
  name: string;
  href: string;
  query: string;
}> = ({ icon, name, href, query }) => {
  return (
    <Button leftIcon={icon} colorScheme="purple" variant="ghost" mr="3">
      <NextLink
        href={query ? { pathname: href, query: { id: query } } : `${href}`}
      >
        {name}
      </NextLink>
    </Button>
  );
};

export default ActionItem;
