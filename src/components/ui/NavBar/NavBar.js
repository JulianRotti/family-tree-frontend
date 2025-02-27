import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Button, IconButton, useBreakpointValue } from '@chakra-ui/react';
import routes from '../../../routes/RouteConfig.js';
import AccessControl from '../Authentication/AccessControl.js';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "components/ui/chakra-snippets/menu.jsx"
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()
    const isMobile = useBreakpointValue({ base: true, md: false });

    const renderNavItems = (componentType) =>
        routes
            .filter(route => !route.hidden)
            .map((route) => (
                <AccessControl key={route.path} requiredRole={route.role}>
                    {componentType === "menu" ? (
                        <MenuItem value={route.path} colorPalette="brand" onClick={() => navigate(route.path)}>
                            {route.name}
                        </MenuItem>
                    ) : (
                        <Button as={NavLink} to={route.path} variant="ghost" size="lg" colorPalette="brand">
                            {route.name}
                        </Button>
                    )}
                </AccessControl>
            ));

    return isMobile ? (
        <MenuRoot>
            <MenuTrigger asChild>
                <IconButton
                    aria-label={'Menü öffnen'}
                    colorPalette="brand"
                    variant="ghost"
                >
                    <HiMenu />
                </IconButton>
            </MenuTrigger>
            <MenuContent>
                {renderNavItems("menu")}
            </MenuContent>
        </MenuRoot>) : (
        <Flex as="nav" gap={4} justifyContent="center">
            {renderNavItems("button")}
        </Flex>
    );
};

export default NavBar;
