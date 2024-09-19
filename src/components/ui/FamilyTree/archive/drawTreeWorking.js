// src/components/ui/FamilyTree/drawTree.js

import { drawNode, drawText, drawLine } from './drawHelpers.js';

// Dummy placeholder function implementations, test with id 16
const drawSingleSpouse = (svg, memberId, familyTree, inter_mid, x_mid, y_pos, w_node, w_partner, w_children, h_intermediary, h_gen, start) => {
  // Logic to draw member and spouse
  let member_pos = x_mid - w_node / 2 - w_partner / 2;
  let spouse_pos = member_pos + w_node + w_partner;
  let y_new_pos = y_pos + h_gen;

  drawNode(svg, member_pos, y_new_pos, w_node / 2, 'steelblue');
  drawNode(svg, spouse_pos, y_new_pos, w_node / 2, 'lightgreen');

  drawText(svg, member_pos, y_new_pos + w_node * (1.5), `${familyTree.id}`);
  drawText(svg, spouse_pos, y_new_pos + w_node * (1.5), `${familyTree.family[0].spouse}`);

  if (!start) {
    drawLine(svg, inter_mid, y_pos, member_pos, y_new_pos - w_node/2, 'grey');
  }

  let y_new_intermediary = y_new_pos + h_intermediary;
  inter_mid = x_mid;
  drawNode(svg, inter_mid, y_new_intermediary, w_node / 10, 'grey');
  drawLine(svg, inter_mid, y_new_intermediary, member_pos, y_new_pos + w_node/2, 'steelblue');
  drawLine(svg, inter_mid, y_new_intermediary, spouse_pos, y_new_pos + w_node/2, 'lightgreen');
  
  let number_of_children = familyTree.family[0].children.length
  let left_pos = x_mid - familyTree.subtree_len / 2;
  if (number_of_children > 0) {
    familyTree.family[0].children.forEach(child => {
      // Recursively call the function, passing the subtree starting from the child
      x_mid = left_pos + child.subtree_len / 2;
      left_pos += child.subtree_len;
      if (child.family.length === 1) {
        drawSingleSpouse(svg, child.id, child, inter_mid, x_mid, y_new_intermediary, w_node, w_partner, w_children, h_intermediary, h_gen, false);
      }

      if (child.family.length === 0) {
        if (number_of_children === 1) {
          x_mid = x_mid - child.subtree_len / 2 + familyTree.subtree_len / 2; // If there is only one child, the subtree length of the parents needs to be taken for positioning
        }
        drawSingleMember(svg, child.id, child, inter_mid, x_mid, y_new_intermediary, w_node, w_partner, w_children, h_intermediary, h_gen, false);
      }

      if (child.family.length > 1) {
        drawMultipleSpouses(svg, child.id, child, inter_mid, x_mid, y_new_intermediary, w_node, w_partner, w_children, h_intermediary, h_gen, false);
      }
    });
  }
};

const drawMultipleSpouses = (svg, memberId, familyTree, inter_mid, x_mid, y_pos, w_node, w_partner, w_children, h_intermediary, h_gen, start) => {
  // Logic to handle multiple spouses - test with id 30
  let member_pos = x_mid - familyTree.subtree_len / 2 + w_node / 2 + w_children / 2;
  let y_new_pos = y_pos + h_gen;
  let y_new_intermediary = y_new_pos + h_intermediary;

  drawNode(svg, member_pos, y_new_pos, w_node / 2, 'steelblue');
  drawText(svg, member_pos, y_new_pos + w_node * (1.5), `${familyTree.id}`);

  if (!start) {
    drawLine(svg, inter_mid, y_pos, member_pos, y_new_pos - w_node/2, 'grey');
  }

  let left_pos = member_pos + w_node / 2 + w_partner / 2;
  // drawNode(svg, left_pos, y_new_pos, w_node / 10, 'black');
  familyTree.family.forEach(family => {
    let spouse_pos = left_pos + family.subtree_len / 2;
    drawNode(svg, spouse_pos, y_new_pos, w_node / 2, 'lightgreen');
    drawText(svg, spouse_pos, y_new_pos + w_node * (1.5), `${family.spouse}`);

    drawNode(svg, spouse_pos, y_new_intermediary, w_node / 10, 'grey');
    drawLine(svg, member_pos, y_new_pos, spouse_pos, y_new_intermediary, 'steelblue');
    drawLine(svg, spouse_pos, y_new_pos, spouse_pos, y_new_intermediary, 'lightgreen');
    left_pos += family.subtree_len;
    // drawNode(svg, left_pos, y_new_pos, w_node / 10, 'black');

    inter_mid = spouse_pos;
    left_pos = inter_mid - family.subtree_len / 2;

    family.children.forEach(child => {
      x_mid = left_pos + child.subtree_len / 2;
      left_pos += child.subtree_len;
      if (child.family.length === 0) {
        drawSingleMember(svg, child.id, child, inter_mid, x_mid, y_new_intermediary, w_node, w_partner, w_children, h_intermediary, h_gen, false);
      }

      if (child.family.length === 1) {
        drawSingleSpouse(svg, child.id, child, inter_mid, x_mid, y_new_intermediary, w_node, w_partner, w_children, h_intermediary, h_gen, false);
      }

      if (child.family.length > 1) {
        drawMultipleSpouses(svg, child.id, child, inter_mid, x_mid, y_new_intermediary, w_node, w_partner, w_children, h_intermediary, h_gen, false);
      }
    });

  })
};

const drawSingleMember = (svg, memberId, familyTree, inter_mid, x_mid, y_pos, w_node, w_partner, w_children, h_intermediary, h_gen, start) => {
  // Logic to draw member and spouse
  let member_pos = x_mid;
  let y_new_pos = y_pos + h_gen;

  drawNode(svg, member_pos, y_new_pos, w_node / 2, 'steelblue');

  drawText(svg, member_pos, y_new_pos + w_node * (1.5), `${familyTree.id}`);
  drawText(svg, member_pos, y_new_pos + w_node * (1.5), `${familyTree.id}`);

  if (!start) {
    drawLine(svg, inter_mid, y_pos, member_pos, y_new_pos - w_node/2, 'grey');
  }
  

};

export const drawTree = (svg, memberId, familyTree, inter_mid, x_mid, y_pos, w_node, w_partner, w_children, h_intermediary, h_gen, start) => {

  console.log(familyTree)

  if (familyTree.family.length === 0) {
    drawSingleMember(svg, memberId, familyTree, inter_mid, x_mid, y_pos, w_node, w_partner, w_children, h_intermediary, h_gen, start);
  }
  if (familyTree.family.length === 1) {
    drawSingleSpouse(svg, memberId, familyTree, inter_mid, x_mid, y_pos, w_node, w_partner, w_children, h_intermediary, h_gen, start);
  }
  if (familyTree.family.length > 1) {
    drawMultipleSpouses(svg, memberId, familyTree, inter_mid, x_mid, y_pos, w_node, w_partner, w_children, h_intermediary, h_gen, start);
  }
  
};