import { LinkBox, LinkOverlay, ListIcon } from "@chakra-ui/layout";
import NextLink from "next/link";
import { IconType } from "react-icons";

interface UngroupedNavProps {
  menu: {
    name: string;
    icon: IconType;
    submenu: { name: string; route: string }[];
    route: string;
  };
}

const UngroupedNav = ({ menu }: UngroupedNavProps) => {
  return (
    <LinkBox
      sx={{
        _hover: {
          bg: "#E0E0E0",
        },
      }}
      padding="1"
    >
      <NextLink href={menu.route ? menu.route : ""}>
        <LinkOverlay>
          <ListIcon as={menu.icon} marginRight="3" />
          {menu.name}
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  );
};

export default UngroupedNav;
