import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import NavBar from '../NavBar/NavBar.js';
import KeycloakButton from '../Authentication/KeycloakButton.js';

const Header = (...props) => {
  return (
    <Grid
      templateRows={{ base: "1fr", md: "1fr" }} 
      templateColumns={{ base: "repeat(8, 1fr)", md: "repeat(3, 1fr)" }} 
      gap={4}
      alignItems="center"
      textAlign={{ base: "left", md: "center"}}
      {...props}
    >
      <GridItem colSpan={{ base: 6, md: 1 }}>
        <Text fontSize="xl" fontWeight="bold">
          kifi_stammbaum
        </Text>
      </GridItem>

      <GridItem colSpan={1}>
        <NavBar />
      </GridItem>

      <GridItem colSpan={1}>
        <KeycloakButton size="lg"/>
      </GridItem>
    </Grid>
  );
};

export default Header;
