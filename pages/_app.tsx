import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import AdminLayout from "../components/admin-layout";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5F5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        ":focus": {
          outline: "none",
          boxShadow: "none",
        },
      },
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      {["Signin", "Signup", "ErrorPage"].includes(
        Component.displayName || ""
      ) ? (
        <Component {...pageProps} />
      ) : (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      )}
    </ChakraProvider>
  );
};

export default MyApp;
