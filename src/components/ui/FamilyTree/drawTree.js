import { drawNode, drawText, drawLine, drawMemberNode } from './drawHelpers.js';

const getMemberName = (memberId, memberData) => {
  const member = memberData.find((m) => m.id === memberId);
  return member ? `${member.first_name} ${member.last_name}` : 'Unknown';
};

const drawSingleSpouse = (svg, familyTree, memberData, inter_mid, x_mid, y_pos, spacings, colors, start, setHoveredMember, setSelectedMember) => {
  const member_pos = x_mid - spacings.w_node / 2 - spacings.w_partner / 2;
  const spouse_pos = member_pos + spacings.w_node + spacings.w_partner;
  const y_new_pos = y_pos + spacings.h_gen;
  const maxWidth = (spacings.w_node + spacings.w_partner) * 0.9;


  const member = memberData.find(m => m.id === familyTree.id);
  const spouse = memberData.find(m => m.id === familyTree.family[0].spouse);
  drawMemberNode(svg, member_pos, y_new_pos, maxWidth, spacings.w_node, colors.memberNode, 8, member, setHoveredMember, setSelectedMember);
  drawMemberNode(svg, spouse_pos, y_new_pos, maxWidth, spacings.w_node, colors.spouseNode, 8, spouse, setHoveredMember, setSelectedMember);

  if (!start) drawLine(svg, inter_mid, y_pos, member_pos, y_new_pos - spacings.w_node / 2, colors.intermediaryLine);

  const y_new_intermediary = y_new_pos + spacings.h_intermediary;
  inter_mid = x_mid;

  drawNode(svg, inter_mid, y_new_intermediary, spacings.w_node / 10, colors.intermediaryNode);
  drawLine(svg, inter_mid, y_new_intermediary, member_pos, y_new_pos + spacings.w_node / 2, colors.memberLine);
  drawLine(svg, inter_mid, y_new_intermediary, spouse_pos, y_new_pos + spacings.w_node / 2, colors.spouseLine);

  const number_of_children = familyTree.family[0].children.length;
  let left_pos = x_mid - familyTree.subtree_len / 2;

  familyTree.family[0].children.forEach(child => {
    x_mid = left_pos + child.subtree_len / 2;
    left_pos += child.subtree_len;

    if (child.family.length === 1) {
      drawSingleSpouse(svg, child, memberData, inter_mid, x_mid, y_new_intermediary, spacings, colors, false, setHoveredMember, setSelectedMember);
    } else if (child.family.length === 0) {
      if (number_of_children === 1) x_mid = x_mid - child.subtree_len / 2 + familyTree.subtree_len / 2;
      drawSingleMember(svg, child, memberData, inter_mid, x_mid, y_new_intermediary, spacings, colors, false, setHoveredMember, setSelectedMember);
    } else {
      drawMultipleSpouses(svg, child, memberData, inter_mid, x_mid, y_new_intermediary, spacings, colors, false, setHoveredMember, setSelectedMember);
    }
  });
};

const drawMultipleSpouses = (svg, familyTree, memberData, inter_mid, x_mid, y_pos, spacings, colors, start, setHoveredMember, setSelectedMember) => {
  const member_pos = x_mid - familyTree.subtree_len / 2 + spacings.w_node / 2 + spacings.w_children / 2;
  const y_new_pos = y_pos + spacings.h_gen;
  const y_new_intermediary = y_new_pos + spacings.h_intermediary;
  const maxWidth = (spacings.w_node + spacings.w_partner) * 0.9;

  if (!start) drawLine(svg, inter_mid, y_pos, member_pos, y_new_pos - spacings.w_node / 2, colors.intermediaryLine);

  let left_pos = member_pos + spacings.w_node / 2 + spacings.w_partner / 2;
  
  familyTree.family.forEach(family => {
    const spouse_pos = left_pos + family.subtree_len / 2;
    const spouse = memberData.find(m => m.id === family.spouse);
    drawMemberNode(svg, spouse_pos, y_new_pos, maxWidth, spacings.w_node, colors.spouseNode, 8, spouse, setHoveredMember, setSelectedMember);

    drawNode(svg, spouse_pos, y_new_intermediary, spacings.w_node / 10, colors.intermediaryNode);
    drawLine(svg, member_pos, y_new_pos + spacings.w_node / 2, spouse_pos, y_new_intermediary, colors.memberLine);
    drawLine(svg, spouse_pos, y_new_pos + spacings.w_node / 2, spouse_pos, y_new_intermediary, colors.spouseLine);
    
    inter_mid = spouse_pos;
    left_pos = inter_mid - family.subtree_len / 2;

    family.children.forEach(child => {
      x_mid = left_pos + child.subtree_len / 2;
      left_pos += child.subtree_len;

      if (child.family.length === 0) {
        drawSingleMember(svg, child, memberData, inter_mid, x_mid, y_new_intermediary, spacings, colors, false, setHoveredMember, setSelectedMember);
      } else if (child.family.length === 1) {
        drawSingleSpouse(svg, child, memberData, inter_mid, x_mid, y_new_intermediary, spacings, colors, false, setHoveredMember, setSelectedMember);
      } else {
        drawMultipleSpouses(svg, child, memberData, inter_mid, x_mid, y_new_intermediary, spacings, colors, false, setHoveredMember, setSelectedMember);
      }
    });
  });
  const member = memberData.find(m => m.id === familyTree.id);
  drawMemberNode(svg, member_pos, y_new_pos, maxWidth, spacings.w_node, colors.memberNode, 8, member, setHoveredMember, setSelectedMember);
};

const drawSingleMember = (svg, familyTree, memberData, inter_mid, x_mid, y_pos, spacings, colors, start, setHoveredMember, setSelectedMember) => {
  const member_pos = x_mid;
  const y_new_pos = y_pos + spacings.h_gen;
  const maxWidth = (spacings.w_node + spacings.w_partner) * 0.9;
  const member = memberData.find(m => m.id === familyTree.id);
  drawMemberNode(svg, member_pos, y_new_pos, maxWidth, spacings.w_node, colors.memberNode, 8, member, setHoveredMember, setSelectedMember);
  if (!start) drawLine(svg, inter_mid, y_pos, member_pos, y_new_pos - spacings.w_node / 2, colors.intermediaryLine);
};

export const drawTree = (svg, familyTree, memberData, inter_mid, x_mid, y_pos, spacings, colors, start, setHoveredMember, setSelectedMember) => {
  if (familyTree.family.length === 0){
    drawSingleMember(svg, familyTree, memberData, inter_mid, x_mid, y_pos, spacings, colors, start, setHoveredMember, setSelectedMember);
  } else if (familyTree.family.length === 1) {
    drawSingleSpouse(svg, familyTree, memberData, inter_mid, x_mid, y_pos, spacings, colors, start, setHoveredMember, setSelectedMember);
  } else {
    drawMultipleSpouses(svg, familyTree, memberData, inter_mid, x_mid, y_pos, spacings, colors, start, setHoveredMember, setSelectedMember);
  }
};
