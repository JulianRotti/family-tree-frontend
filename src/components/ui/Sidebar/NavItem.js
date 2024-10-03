import React from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function NavItem({ icon, children, to, ...rest }) {
  return (
    <Box
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      {...rest}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: 'cyan.400', color: 'white' }}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
}
