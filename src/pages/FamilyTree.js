import React, { useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import SectionTitle from '../components/ui/SectionTitle.js';
import FamilyTree from '../components/ui/FamilyTree/FamilyTree.js';
import FamilyNodeHover from '../components/ui/FamilyTree/FamilyNodeHover.js';  // Import hover card component
import HeadOfFamilySelector from '../components/ui/FamilyTree/HeadOfFamily.js';

const FamilyTreePage = () => {
  // Hovered and selected state are managed at the page level now
  const [hoveredMember, setHoveredMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [headOfFamily, setHeadOfFamily] = useState({
    member_id: 1,
  });

  return (
    <Box p={6}>
      {/* Section Title */}
      <SectionTitle 
        mainTitle="Explore" 
        highlightedText="family tree" 
      />

      {/* Grid Layout */}
      <Grid templateColumns="repeat(5, 1fr)" gap={6} p={6}>
        {/* Family Tree takes up 4 columns */}
        <GridItem colSpan={4}>
          <Box
            bg="white"
            boxShadow="2xl"
            rounded="lg"
            p={6}
            maxW="1400px"
            height="600px"
            overflow="hidden"
            position="relative"
          >
            <FamilyTree 
              memberId={headOfFamily.member_id}
              setHoveredMember={setHoveredMember}
              setSelectedMember={setSelectedMember}
              width={1200}
              height={600}
            />
          </Box>
        </GridItem>

        {/* Hover Card takes up 1 column */}
        <GridItem colSpan={1}>
          <Box
            bg="white"
            boxShadow="2xl"
            rounded="lg"
            p={6}
            width="350px"
            height="600px"
            overflow="hidden"
            position="relative"
          >
          <HeadOfFamilySelector
            headOfFamily={headOfFamily}
            setHeadOfFamily={setHeadOfFamily}
          />
          {hoveredMember || selectedMember ? (
            <FamilyNodeHover
              name={(hoveredMember || selectedMember).name}
              initialName={(hoveredMember || selectedMember).initialName}
              birthDate={(hoveredMember || selectedMember).birthDate}
              deathDate={(hoveredMember || selectedMember).deathDate}
              avatarUrl={(hoveredMember || selectedMember).avatarUrl}
            />
          ) : null}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FamilyTreePage;
