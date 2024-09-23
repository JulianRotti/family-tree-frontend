const API_URL = 'http://localhost:5000/api/family';  // Adjust if the API URL is different

export const apiCall = async (url, options) => {
  try {
    const response = await fetch(url, options);

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


export const getRelationships = async () => {
  return apiCall(`${API_URL}/relationships`, {
    method: 'GET',
  });
};


export const createRelationship = async (relationshipData) => {
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

