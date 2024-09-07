// testApi.js

import { getFamilyMembers, createFamilyMember, createRelationship } from './services/api/api.js';

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
    const createdMember = await createFamilyMember(newMember);
    console.log('New Family Member:', createdMember);

    // Test POST request to create a relationship
    console.log('Creating a new relationship...');
    const relationship = {
      member_1_id: 1,  // Replace with actual member IDs
      member_2_id: 9,  // Replace with actual member IDs
      relationship: 'spouse'
    };
    const createdRelationship = await createRelationship(relationship);
    console.log('New Relationship:', createdRelationship);

  } catch (error) {
    console.error('Error testing the API:', error);
  }
};

testApi();
