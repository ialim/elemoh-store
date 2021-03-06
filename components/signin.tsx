import { Box, Flex, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import SigninForm from "./signin-from";

const SignIn = () => {
  return (
    <Box width="100vw" height="100vh">
      <Flex
        justify="center"
        align="center"
        paddingY="5"
        paddingX="3"
        shadow="md"
        marginX="30%"
        marginY="15%"
        direction="column"
      >
        <Box mb="3">logo</Box>
        <Box width="50%">
          <SigninForm />
        </Box>
        <Box mt="3">
          <Text
            textAlign="center"
            fontWeight="light"
            fontSize="md"
            color="purple.300"
          >
            <NextLink href="/forgot-password">Forgot password?</NextLink>
          </Text>
          <Text fontWeight="light" fontSize="md" color="gray.400">
            Do not have an account?
          </Text>
          <Text
            textAlign="center"
            fontWeight="light"
            fontSize="md"
            color="purple.300"
          >
            <NextLink href="/signup">register</NextLink>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignIn;
