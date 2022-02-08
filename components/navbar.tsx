import { Box, Flex } from "@chakra-ui/layout";

const Navbar = () => {
  return (
    <Box paddingX="4" paddingY="2" width="100%" height="100%">
      <Flex justifyContent="space-between" alignItems="center" height="100%">
        <Box>menu</Box>
        <Box>logo</Box>
        <Box>nav</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
