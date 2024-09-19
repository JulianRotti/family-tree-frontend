// testApi.js

import { getFamilyMembers, createFamilyMember, createRelationship, getFamilyTreeById } from './services/api/api.js';

const testApi = async () => {
  try {
    // Test GET request to fetch all members
    console.log('Fetching all family members...');
    const members = await getFamilyMembers();
    console.log('Family Members:', members);

    // Test POST request to create a new member (optional)
    console.log('Creating a new family member...');
    const newMember = {
      first_name: 'John',
      last_name: 'Doe',
      birth_date: '1990-01-01',
    };
    // const createdMember = await createFamilyMember(newMember);
    // console.log('New Family Member:', createdMember);

    // Test POST request to create a relationship
    console.log('Creating a new relationship...');
    const relationship = {
      member_1_id: 1, 
      member_2_id: 9, 
      relationship: 'spouse'
    };
    // const createdRelationship = await createRelationship(relationship);
    // console.log('New Relationship:', createdRelationship);

    // Test POST request to create a relationship getFamilyTreeById = async (id, w_node = 100, w_partner = 50, w_children = 20)
    console.log('Creating family tree...');
    const input_tree = {
      id: 1,
      w_node: 1, 
      w_partner: 2, 
      w_children: 3
    };
    const createFamilyTree = await getFamilyTreeById(1, 1, 2, 3);
    console.log('New tree:', createFamilyTree);
    

  } catch (error) {
    console.error('Error testing the API:', error);
  }
};

testApi();
