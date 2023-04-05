import React from "react";
import {
  chakra,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
const Error = () => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      // height={"100px"}
      flexDirection={"row"}
      ml={"35%"}
      mt={"3%"}
      // backgroundColor={"red"}
      color={"red"}
    >
      <AlertIcon boxSize="30px" mr={10} />
      <AlertTitle>There was an error processing your request.</AlertTitle>
    </Alert>
  );
};

export default Error;
