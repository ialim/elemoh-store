import { Box, List, ListItem } from "@chakra-ui/layout";
import { SidebarMenu } from "../constants/nav";
import GroupedNav from "./grouped-nav";
import UngroupedNav from "./ungrouped-nav";

const Sidebar = () => {
  return (
    <Box width="100%" paddingX="3px">
      <Box paddingY="10px" color="gray.900">
        <List spacing={1}>
          {SidebarMenu.map((menu) => (
            <ListItem
              key={menu.name}
              paddingLeft="10px"
              paddingY="3px"
              fontSize="md"
            >
              {menu.submenu.length ? (
                <GroupedNav menu={menu} />
              ) : (
                <UngroupedNav menu={menu} />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
