// src/services/api/api.js

const API_URL = 'http://localhost:5000/api/family';  // Adjust if the API URL is different

// Fetch all family members
export const getFamilyMembers = async () => {
    try {
      const response = await fetch(`${API_URL}/members`);
      if (!response.ok) {
        throw new Error('Failed to fetch family members');
      }
      return await response.json();  // Return the list of members
    } catch (error) {
      console.error('Error fetching family members:', error);
      throw error;
    }
  };

export const createFamilyMember = async (memberData) => {
    try {
      console.log('API URL:', API_URL);  // Log the API URL
      console.log('Sending member data:', memberData);  // Log the member data being sent
  
      const response = await fetch(`${API_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create family member');
      }
  
      return await response.json();  // Return the created member
    } catch (error) {
      console.error('Error creating family member:', error);  // Log the error
      throw error;
    }
  };

// Fetch all relationships
export const getRelationships = async () => {
  try {
    const response = await fetch(`${API_URL}/relationships`);
    if (!response.ok) {
      throw new Error('Failed to fetch relationships');
    }
    return await response.json();  // Returns the list of relationships
  } catch (error) {
    console.error('Error fetching relationships:', error);
    throw error;
  }
};

// Create a new relationship
export const createRelationship = async (relationshipData) => {
  try {
    const response = await fetch(`${API_URL}/relationships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(relationshipData),
    });
    if (!response.ok) {
      throw new Error('Failed to create relationship');
    }
    return await response.json();  // Returns the created relationship
  } catch (error) {
    console.error('Error creating relationship:', error);
    throw error;
  }
};
