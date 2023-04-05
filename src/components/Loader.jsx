import { Box, ChakraProvider, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <ChakraProvider>
      <VStack height={"90vh"} justifyContent={"center"}>
        <Box p={"4"}>
          <Spinner size={"xl"} />
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default Loader;
