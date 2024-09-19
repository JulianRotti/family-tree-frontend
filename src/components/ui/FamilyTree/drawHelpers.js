import * as d3 from 'd3';

// Helper function to create member data object
const createMemberData = (event, member) => ({
  name: `${member.first_name} ${member.last_name}`,
  initialName: member.initial_last_name || '',
  birthDate: member.birth_date,
  deathDate: member.death_date || '',
  avatarUrl: member.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  x: event ? event.pageX : undefined,
  y: event ? event.pageY : undefined,
});

// Helper function to draw a circle (node)
export const drawNode = (svg, x, y, radius, color) => {
  svg.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', radius)
    .attr('fill', color);
};

export const drawMemberNode = (svg, x, y, width, height, color, fontSize, member, setHoveredMember, setSelectedMember) => {
  const fullName = `${member.first_name} ${member.last_name}`;
  const maxTextWidth = width * 0.9; // Allow some padding in the box
  let displayedText = fullName;

  const handleMouseOver = (event) => {
    setHoveredMember(createMemberData(event, member));
  };

  const handleMouseOut = () => {
    setHoveredMember(null);
  };

  const handleClick = () => {
    setSelectedMember(createMemberData(null, member)); // No need for x/y in click
  };

  const textElement = svg.append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle') // Center text vertically
    .attr('font-family', 'Inter, sans-serif')
    .attr('font-size', fontSize)
    .attr('font-weight', 'bold')
    .text(displayedText);

  let textWidth = textElement.node().getBBox().width;

  // Truncate text if it exceeds max width
  if (textWidth > maxTextWidth) {
    while (textWidth > maxTextWidth && displayedText.length > 0) {
      displayedText = displayedText.slice(0, -1);
      textElement.text(displayedText + '..');
      textWidth = textElement.node().getBBox().width;
    }
  }

  textElement.remove();  // Temporarily remove the text to place the box behind

  // Draw the background box with mouseover/mouseout applied to the whole box
  const rect = svg.append('rect')
    .attr('x', x - width / 2)
    .attr('y', y - height / 2)
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'white') // White background
    .attr('stroke', color) // Border color depending on node type
    .attr('stroke-width', 1)
    .attr('rx', 5) // Rounded corners
    .on('mouseover', handleMouseOver)  // Apply hover events
    .on('mouseout', handleMouseOut)
    .on('click', handleClick);

  // Re-add the text in the box with the same hover behavior
  svg.append('text')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-family', 'Inter, sans-serif')
    .attr('font-size', fontSize)
    .attr('font-weight', 'bold')
    .text(displayedText)
    .on('mouseover', handleMouseOver)  // Apply hover events to the text
    .on('mouseout', handleMouseOut)
    .on('click', handleClick);
};

// Helper function to draw a smooth line (e.g., Bezier curve) between two points
export const drawLine = (svg, x1, y1, x2, y2, color = 'black') => {
  svg.append('path')
    .attr('d', `M${x1},${y1}C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`)  // Bezier curve
    .attr('stroke', color)  // Apply custom color
    .attr('fill', 'none');
};
