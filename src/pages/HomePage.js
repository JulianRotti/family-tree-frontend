import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import KeycloakButton from "../components/ui/Authentication/KeycloakButton.js";

const HomePage = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <Flex direction="column" align="center">
      <Heading as="h1" size="2xl" textAlign="center" color="brand.1" mt={8}>
        Visualisierung Kifi-Familienstammbaum
      </Heading>
      {!isAuthenticated && <KeycloakButton variant="solid" size="md" color="brand.4" bg="brand.5" hoverColor='brand.2' />}
    </Flex>
  );
};

export default HomePage;
