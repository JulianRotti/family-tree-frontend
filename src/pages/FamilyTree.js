import React from 'react';
import { Box } from '@chakra-ui/react';
import SectionTitle from '../components/ui/SectionTitle.js';
import FamilyTree from '../components/ui/FamilyTree/FamilyTree.js';
import FamilyNodeHover from '../components/ui/FamilyTree/FamilyNodeHover.js';

const FamilyTreePage = () => {
  return (
    <Box p={6}>
      {/* Section Title */}
      <SectionTitle 
        mainTitle="Explore" 
        highlightedText="family tree" 
      />

      {/* Render the FamilyTree component */}
      <FamilyTree memberId={30} />  
    </Box>
  );
};

export default FamilyTreePage;
