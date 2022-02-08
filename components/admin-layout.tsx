import { Box } from "@chakra-ui/layout";
import { reactChild } from "../types/types";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface AdminLayoutProps extends reactChild {}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box width="100vw" height="100vh" bg="#fafbfe">
      <Box
        position="sticky"
        top="0"
        height="50px"
        borderBottom="1px"
        left="0"
        width="100%"
      >
        <Navbar />
      </Box>
      <Box position="absolute" top="50px" left="0" width="230px" border="1px">
        <Sidebar />
      </Box>
      <Box marginLeft="230px" border="1px">
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
