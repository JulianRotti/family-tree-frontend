import React from 'react';
import NewMemberForm from '../components/ui/MemberForms/NewMemberForm.js';
import ModifyMemberForm from '../components/ui/MemberForms/ModifyMemberForm.js';
import NewRelationshipForm from '../components/ui/MemberForms/NewRelationshipForm.js';
import { Box, Tabs, useBreakpointValue } from '@chakra-ui/react';
import { HiOutlineUserAdd, HiOutlineUsers, HiOutlineRefresh } from "react-icons/hi";

const ManageMembers = () => {
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
      <Tabs.Root defaultValue="create-member" orientation={tabOrientation}>
        <Tabs.List>
          <Tabs.Trigger value="create-member">
            <HiOutlineUserAdd />
            { isMobile ? null : "Mitglied anlegen" }
          </Tabs.Trigger>
          <Tabs.Trigger value="alter-member">
            <HiOutlineRefresh />
            { isMobile ? null : "Mitglied ändern" }
          </Tabs.Trigger>
          <Tabs.Trigger value="create-relationship">
            <HiOutlineUsers />
            { isMobile ? null : "Beziehung anlegen" }
          </Tabs.Trigger>
        </Tabs.List>
        {/* Mitglied anlegen */}
        <Tabs.Content value="create-member">
          <NewMemberForm maxW="450"/>
        </Tabs.Content>
        {/* Mitglied verändern */}
        <Tabs.Content value="alter-member">
          <ModifyMemberForm maxW="450px"/>
        </Tabs.Content>
        {/* Beziehung anlegen */}
        <Tabs.Content value="create-relationship">
          <NewRelationshipForm maxW="450px"/>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default ManageMembers;
