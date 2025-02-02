import React from 'react';
import NewMemberForm from '../components/ui/MemberForms/NewMemberForm.js';
import ModifyMemberForm from '../components/ui/MemberForms/ModifyMemberForm.js';
import { Box, Tabs, useBreakpointValue } from '@chakra-ui/react';
import { HiOutlineUserAdd, HiOutlineUsers, HiOutlineRefresh } from "react-icons/hi";

const ManageMembers = () => {
  const tabOrientation = useBreakpointValue({ base: "horizontal", md: "vertical" });
  return (
    <Box
      bg="white"
      p={4}
      width="fit-content"
      rounded="lg"
      colorPalette="brand"
    >
      <Tabs.Root defaultValue="create-member" orientation={tabOrientation}>
        <Tabs.List>
          <Tabs.Trigger value="create-member">
            <HiOutlineUserAdd />
            Mitglied anlegen
          </Tabs.Trigger>
          <Tabs.Trigger value="alter-member">
            <HiOutlineRefresh />
            Mitglied ändern
          </Tabs.Trigger>
          <Tabs.Trigger value="create-relationship">
            <HiOutlineUsers />
            Beziehung anlegen
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="create-member"><NewMemberForm maxW="500px"/></Tabs.Content>
        <Tabs.Content value="alter-member"><ModifyMemberForm maxW="500px"/></Tabs.Content>
        <Tabs.Content value="create-relationship">
          Manage your tasks for freelancers
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default ManageMembers;
