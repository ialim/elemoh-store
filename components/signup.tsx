import { Box, Flex, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { SignupForm } from "./signup-form";

const SignUp = () => {
  return (
    <Box width="100vw" height="100vh">
      <Flex
        justify="center"
        align="center"
        paddingY="5"
        paddingX="3"
        shadow="xl"
        marginX="30%"
        marginY="10%"
        direction="column"
      >
        <Box mb="3">logo</Box>
        <Box width="50%">
          <SignupForm />
        </Box>
        <Box mt="3">
          <Text
            textAlign="center"
            fontWeight="light"
            fontSize="md"
            color="gray.300"
          >
            Already have an account?
          </Text>
          <Text
            textAlign="center"
            fontWeight="light"
            fontSize="md"
            color="purple.300"
          >
            <NextLink href="/signin">Login</NextLink>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUp;
