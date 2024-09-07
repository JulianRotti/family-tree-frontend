import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import SectionTitle from '../components/ui/SectionTitle.js';  // Import the SectionTitle component

const FamilyTree = () => {
  return (
    <div>
      {/* Use SectionTitle to display the heading */}
      <SectionTitle 
        mainTitle="Explore" 
        highlightedText="family tree" 
      />
    </div>
  );
};

export default FamilyTree;
