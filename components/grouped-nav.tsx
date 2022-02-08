import { Box, LinkBox, LinkOverlay, ListIcon } from "@chakra-ui/layout";
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";
import NextLink from "next/link";
import { useState } from "react";
import { IconType } from "react-icons";

interface GroupedNavProps {
  menu: {
    name: string;
    icon: IconType;
    submenu: { name: string; route: string }[];
    route: string;
  };
}

const GroupedNav = ({ menu }: GroupedNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((state) => !state);
  };
  return (
    <>
      <LinkBox
        onClick={handleClick}
        display="flex"
        justifyContent="space-between"
        sx={{
          _hover: {
            bg: "#E0E0E0",
          },
        }}
        padding="1"
        alignItems="center"
      >
        <Box>
          <ListIcon as={menu.icon} marginRight="3" />
          {menu.name}
        </Box>
        <ListIcon
          as={isOpen ? IoChevronDownOutline : IoChevronForwardOutline}
        />
      </LinkBox>
      {isOpen
        ? menu.submenu?.map((smenu) => (
            <LinkBox
              sx={{
                _hover: {
                  bg: "#E0E0E0",
                },
              }}
              key={smenu.name}
              paddingX="8"
              paddingY="1"
            >
              <NextLink href={smenu.route}>
                <LinkOverlay>{smenu.name}</LinkOverlay>
              </NextLink>
            </LinkBox>
          ))
        : ""}
    </>
  );
};

export default GroupedNav;
