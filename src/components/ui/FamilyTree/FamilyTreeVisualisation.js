import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { drawTree } from './treeLayoutAlgorithm.js';
import { useGetFamilyTree } from 'hooks/useGetFamilyTree.js';
import { Spinner, Box, Center, useBreakpointValue } from '@chakra-ui/react';
import useGetWindowDimensions from 'hooks/useGetWindowDimensions.js';

const FamilyTreeVisualisation = (
  {
    memberId,
    width,
    height,
    w_node = 30,
    w_partner = 80,
    w_children = 100,
    h_intermediary = 30,
    h_gen = 70
  }
) => {
  const { familyTree, members, isLoading, isError } = useGetFamilyTree({ memberId, w_node, w_partner, w_children });
  const scaleWidth = useBreakpointValue({ base: 0.5, lg: 0.7, xl: 0.8 });
  const windowWidth = useGetWindowDimensions().width;

  const newWidth = Math.min(width, windowWidth * scaleWidth);

  const svgRef = useRef();

  const colors = {
    memberNode: 'steelblue',
    spouseNode: 'lightgreen',
    intermediaryNode: 'grey',
    memberLine: 'steelblue',
    spouseLine: 'lightgreen',
    intermediaryLine: 'grey'
  };

  const spacings = {
    w_node, w_partner, w_children, h_intermediary, h_gen
  };

  useEffect(() => {
    if (!isLoading && familyTree && members) {
      d3.select(svgRef.current).selectAll('*').remove();
      const svg = d3.select(svgRef.current)
        .attr('width', newWidth)
        .attr('height', height)
        .call(d3.zoom().on('zoom', (event) => {
          svg.attr('transform', event.transform);
        }))
        .append('g');
      drawTree(svg, familyTree, members, width / 2, width / 2, 50, spacings, colors, true);
    }
  }, [familyTree, members, isLoading, memberId, w_node, w_partner, w_children, h_intermediary, h_gen, newWidth]);

  return (
    <>
      <svg ref={svgRef}></svg>
      { isLoading && <Box pos="absolute" inset="0" bg="bg/80">
        <Center h="full">
          <Spinner color="brand.solid" />
        </Center>
      </Box> }
    </>
  );
};

export default FamilyTreeVisualisation;
