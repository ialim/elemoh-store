import { Flex, Box, Spacer, Heading, Container } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Image,
} from "@chakra-ui/react";
import { useProduct } from "../lib/hooks";

interface ProductViewModalProps {
  values: any;
}

const ProductViewModal = ({ values }: ProductViewModalProps) => {
  const { product } = useProduct({ productId: values?.id });

  return (
    <Flex direction="column" mt="10">
      <Flex justifyContent="space-between">
        <Box mr="20">
          <Image
            boxSize="250px"
            boxShadow="2xl"
            borderRadius="5"
            src="gibbresh.png"
            fallbackSrc="https://via.placeholder.com/220"
          />
        </Box>
        <Spacer />
        <Flex direction="column">
          <Heading as="h3" size="lg">
            {values?.name}
          </Heading>
          <Container my="10" maxW="container.lg">
            {product?.description}
          </Container>
        </Flex>
      </Flex>
      <Spacer />
      <Box mt="10">
        <Table variant="simple">
          <TableCaption>Product Variants</TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Warehouse</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {values?.variants?.map((variant: any) => (
              <Tr key={variant?.id}>
                <Td>
                  <Image
                    boxSize="50px"
                    boxShadow="sm"
                    src={variant?.url}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </Td>
                <Td>{variant?.name}</Td>
                <Td>{variant?.warehouse?.name || "Not Available"}</Td>
                <Td isNumeric>{variant?.stock?.quantity || 0}</Td>
                <Td isNumeric>{variant?.price || 0}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th> </Th>
              <Th> </Th>
              <Th> </Th>
              <Th isNumeric>Total</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Flex>
  );
};

export default ProductViewModal;
