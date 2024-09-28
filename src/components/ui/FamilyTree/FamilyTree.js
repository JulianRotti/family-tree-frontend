import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { drawTree } from './drawTree.js';
import { useFamilyTree } from '../../../hooks/useFamilyTree.js';

const FamilyTree = ({ memberId, setHoveredMember, setSelectedMember, width, height, w_node = 15, w_partner = 60, w_children = 80, h_intermediary = 30, h_gen = 70 }) => {
  const { familyTree, memberData, loading, error } = useFamilyTree(memberId, w_node, w_partner, w_children);
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
    if (!loading && familyTree && memberData) {
      d3.select(svgRef.current).selectAll('*').remove();

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .call(d3.zoom().on('zoom', (event) => {
          svg.attr('transform', event.transform);
        }))
        .append('g');

      drawTree(svg, familyTree, memberData, width/2, width/2, 50, spacings, colors, true, setHoveredMember, setSelectedMember);
    }
  }, [familyTree, memberData, loading, memberId, w_node, w_partner, w_children, h_intermediary, h_gen]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <svg ref={svgRef}></svg>;
};

export default FamilyTree;
