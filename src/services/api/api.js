import { getAccessToken } from "../keycloak/keycloak.js";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const apiCall = async (url, options) => {
  try {
    const token = await getAccessToken();
    const optionsWithAuth = {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Authorization': `Bearer ${token}`,
      }
    }
    const response = await fetch(url, optionsWithAuth);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Fetch all family members
export const getFamilyMembers = async () => {
  console.log('API_URL:', API_URL);
  return apiCall(`${API_URL}/members`, {
    method: 'GET',
  });
};

export const createFamilyMember = async (memberData) => {
  return apiCall(`${API_URL}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberData),
  });
};

export const updateFamilyMember = async (memberData) => {
  return apiCall(`${API_URL}/members`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberData),
  });
};


export const getRelationships = async () => {
  return apiCall(`${API_URL}/relationships`, {
    method: 'GET',
  });
};


export const createRelationship = async (relationshipData) => {
  console.log("Relationship value:", relationshipData);
  return apiCall(`${API_URL}/relationships`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(relationshipData),
  });
};


export const getFamilyTreeById = async (id, w_node = 100, w_partner = 50, w_children = 20) => {
  return apiCall(`${API_URL}/family-tree/${id}?w_node=${w_node}&w_partner=${w_partner}&w_children=${w_children}`, {
    method: 'GET',
  });
};

