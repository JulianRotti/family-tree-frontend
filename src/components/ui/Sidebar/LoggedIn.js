import React, { useContext } from 'react';
import { getUsernameAndRoles } from '../../../services/keycloak/keycloak.js';
import { Badge, Avatar, Box, Text, Flex } from '@chakra-ui/react'
import { AuthContext } from "../../../contexts/AuthContext.js";

const LoginInfo = () => {
    const {isAuthenticated} = useContext(AuthContext);
    if (!isAuthenticated) {
        return null;
    }
    const {username, roles} = getUsernameAndRoles(['editor', 'viewer']);

    return (
        <Box borderWidth='1px' rounded='lg' p={2}>
            <Flex alignItems="center">
                <Avatar name={username} bg='steelblue' size='md'/>
                <Box ml='3'>
                    <Text>
                        {username}
                    </Text>
                    {
                        roles.map((role) => (
                            <Badge ml='1' colorScheme='green' fontSize='9px'>
                                {role}
                            </Badge>
                        ))
                    }
                </Box>
            </Flex>
        </Box>
    );
}

export default LoginInfo;