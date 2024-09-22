import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { drawTree } from './drawTree.js';
import { useFamilyTree } from '../../../hooks/useFamilyTree.js';
import FamilyNodeHover from './FamilyNodeHover.js';  // Import hover component

const FamilyTree = ({ memberId, w_node = 15, w_partner = 60, w_children = 80, h_intermediary = 30, h_gen = 70 }) => {
  const { familyTree, memberData, loading, error } = useFamilyTree(memberId, w_node, w_partner, w_children);
  const svgRef = useRef();
  const [hoveredMember, setHoveredMember] = useState(null);  // Manage hover state
  const [selectedMember, setSelectedMember] = useState(null);

  const colors = {
    memberNode: 'steelblue',
    spouseNode: 'lightgreen',
    intermediaryNode: 'grey',
    memberLine: 'steelblue',
    spouseLine: 'lightgreen',
    intermediaryLine: 'grey'
  };

  const spacings = {
    w_node: w_node, 
    w_partner: w_partner, 
    w_children: w_children, 
    h_intermediary: h_intermediary, 
    h_gen: h_gen
  }

  useEffect(() => {
    if (!loading && familyTree && memberData) {
      d3.select(svgRef.current).selectAll('*').remove();

      const svg = d3.select(svgRef.current)
        .attr('width', 1400)
        .attr('height', 600)
        .call(d3.zoom().on('zoom', (event) => {
          svg.attr('transform', event.transform);
        }))
        .append('g');

      drawTree(svg, familyTree, memberData, 500, 500, 100, spacings, colors, true, setHoveredMember, setSelectedMember);
    }
  }, [familyTree, memberData, loading, memberId, w_node, w_partner, w_children, h_intermediary, h_gen]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6} p={6}>
      {/* Left column for family tree (spanning 4 columns) */}
      <GridItem colSpan={4}>
        <Box
          bg="white"
          boxShadow="2xl"
          rounded="lg"
          p={6}
          maxW="1400px"
          overflow="hidden"
          position="relative"
        >
          <svg ref={svgRef}></svg>
        </Box>
      </GridItem>

      {/* Right column for the hover card (spanning 1 columns) */}
      <GridItem colSpan={1}>
      {hoveredMember || selectedMember ? (
        <FamilyNodeHover
          name={(hoveredMember || selectedMember).name}
          initialName={(hoveredMember || selectedMember).initialName}
          birthDate={(hoveredMember || selectedMember).birthDate}
          deathDate={(hoveredMember || selectedMember).deathDate}
          avatarUrl={(hoveredMember || selectedMember).avatarUrl}
        />
      ) : null}
      </GridItem>
    </Grid>
  );
};

export default FamilyTree;
