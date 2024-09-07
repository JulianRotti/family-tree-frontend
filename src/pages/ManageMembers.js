import React from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import MemberForm from '../components/ui/MemberForm.js';
import RelationshipForm from '../components/ui/RelationshipForm.js';
import Title from '../components/ui/SectionTitle.js';  // Import the Title component

const ManageMembers = () => {
  return (
    <Box maxW="1200px" mx="auto" p={6}>
      {/* Use the Title component */}
      <Title mainTitle="Manage" highlightedText="Family Members and Relationships" />

      {/* Grid layout with two columns for MemberForm and RelationshipForm */}
      <Grid
        templateColumns="repeat(1, 1fr)" // Two equal-width columns
        gap={6} // Space between grid items
      >
        <GridItem w="100%">
          <MemberForm />
          <RelationshipForm />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ManageMembers;
