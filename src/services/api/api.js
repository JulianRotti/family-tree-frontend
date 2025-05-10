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

export const getFamilyMembers = async () => {
  console.log(`Getting all family members with API call to GET ${API_URL}/members`);
  return apiCall(`${API_URL}/members`, {
    method: 'GET',
  });
};

export const getFamilyMemberById = async (id) => {
  console.log(`Getting family member with id ${id} with API call to GET ${API_URL}/members/${id}`);
  return apiCall(`${API_URL}/members/${id}`, {
    method: 'GET',
  });
};

export const createFamilyMember = async (memberData) => {
  const formData = new FormData();

  Object.keys(memberData).forEach(key => {
    if (key != 'member_image' && memberData[key]) {
      formData.append(key, memberData[key]);
    }
  });

  if (memberData.member_image) {
    formData.append('member_image', memberData.member_image[0]);
  };

  console.log(`Creating family member with API call to POST ${API_URL}/members`);
  console.log('formData:', formData);

  return apiCall(`${API_URL}/members`, {
    method: 'POST',
    body: formData,
  });
};

export const updateFamilyMember = async (memberData) => {
  console.log(`Updating family member with API call to PATCH ${API_URL}/members`);
  console.log('formData:', memberData);
  return apiCall(`${API_URL}/members`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberData),
  });
};


export const getRelationships = async () => {
  console.log(`Getting all relationships with API call to GET ${API_URL}/relationships`);
  return apiCall(`${API_URL}/relationships`, {
    method: 'GET',
  });
};


export const createRelationship = async (relationshipData) => {
  console.log(`Creating relationship with API call to POST ${API_URL}/relationships`);
  console.log('relationshipData:', relationshipData);
  return apiCall(`${API_URL}/relationships`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(relationshipData),
  });
};


export const getFamilyTreeById = async (id, w_node, w_partner, w_children) => {
  console.log(`Getting family tree for id ${id} with API call to GET ${API_URL}/family-tree/${id}?w_node=${w_node}&w_partner=${w_partner}&w_children=${w_children}`);
  return apiCall(`${API_URL}/family-tree/${id}?w_node=${w_node}&w_partner=${w_partner}&w_children=${w_children}`, {
    method: 'GET',
  });
};

