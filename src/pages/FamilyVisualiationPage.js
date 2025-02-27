import React, { useState } from 'react';

import { Box, Tabs, useBreakpointValue, Text } from '@chakra-ui/react';
import FamilyTreeContainer from 'components/ui/FamilyTree/FamilyTreeContainer.js';
import { TbBinaryTree } from "react-icons/tb";
import { LuMapPin } from "react-icons/lu";

const FamilyVisualisationPage = () => {
    const tabOrientation = useBreakpointValue({ base: "horizontal", md: "vertical" });
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            bg="white"
            p={4}
            width="fit-content"
            rounded="lg"
            colorPalette="brand"
            alignSelf="start"
        >
            <Tabs.Root defaultValue="display-tree" orientation={tabOrientation}>
                <Tabs.List>
                    <Tabs.Trigger value="display-tree">
                        <TbBinaryTree />
                        {isMobile ? null : "Stammbaum anzeigen"}
                    </Tabs.Trigger>
                    <Tabs.Trigger value="display-location">
                        <LuMapPin />
                        {isMobile ? null : "XX"}
                    </Tabs.Trigger>
                </Tabs.List>
                {/* Stammbaum anzeigen */}
                <Tabs.Content value="display-tree">
                    <FamilyTreeContainer
                        maxW={1200}
                        maxH={600}/>
                </Tabs.Content>
                {/* XX */}
                <Tabs.Content value="display-location">
                    <Text>XX</Text>
                </Tabs.Content>
            </Tabs.Root>
        </Box>
    );
};

export default FamilyVisualisationPage;
