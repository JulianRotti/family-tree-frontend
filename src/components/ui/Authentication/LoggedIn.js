import React, { useContext } from 'react';
import { getUsernameAndRoles } from '../../../services/keycloak/keycloak.js';
import { Badge, Avatar, Box, Text } from '@chakra-ui/react'
import { AuthContext } from "../../../contexts/AuthContext.js";
import {
    HoverCardArrow,
    HoverCardContent,
    HoverCardRoot,
    HoverCardTrigger,
  } from "components/ui/chakra-snippets/hover-card.jsx";

const LoginInfo = () => {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        return null;
    }
    const { username, roles } = getUsernameAndRoles(['editor', 'viewer']);

    return (
        <HoverCardRoot trigger="hover" placement="top">
            <HoverCardTrigger>
                <Avatar
                    name={username}
                    size="xs"
                    border="1px solid"
                    bg="transparent"
                    borderColor="brand.1"
                    color="brand.1"
                />
            </HoverCardTrigger>
            <HoverCardContent width="fit-content">
                <HoverCardArrow />
                <Box p={2} width="fit-content">
                    <Text>
                        {username}
                    </Text>
                    {roles.map((role) => (
                        <Badge ml="1" colorScheme="green" fontSize="9px">
                            {role}
                        </Badge>
                    ))}
                </Box>
            </HoverCardContent>
        </HoverCardRoot>
    )
}
export default LoginInfo;