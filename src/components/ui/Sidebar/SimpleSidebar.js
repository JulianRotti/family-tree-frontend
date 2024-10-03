import React from 'react';
import { Box, Flex, Text, CloseButton } from '@chakra-ui/react';
import NavItem from './NavItem.js';
import routes from '../../../routes/RouteConfig.js';
import KeycloakButton from './KeycloakButton.js'; // Import the button or any other component you want to add

export default function SimpleSidebar({ children }) {
  return (
    <Box minH="100vh" bg="gray.100">
      {/* Sidebar Content */}
      <Box
        bg="white"
        borderRight="1px"
        borderRightColor="gray.200"
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} />
        </Flex>

        {/* Map over routes to create NavItems */}
        {routes.map((route) => (
          <NavItem key={route.path} icon={route.icon} to={route.path}>
            {route.name}
          </NavItem>
        ))}

        {/* Add any elements you want (e.g., KeycloakButton) */}
        <Box position="absolute" bottom="10" w="full" px="4">
          <KeycloakButton />
        </Box>
      </Box>

      {/* Main content */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
