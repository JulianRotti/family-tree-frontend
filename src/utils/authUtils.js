import jwtDecode from 'jwt-decode';

export const getRolesFromToken = (token) => {
  if (!token) {
    return [];
  }
  try {
    const decodedToken = jwtDecode(token);
    // Assuming roles are in the realm_access property
    return decodedToken.realm_access.roles || [];
  } catch (error) {
    console.error("Failed to decode token:", error);
    return [];
  }
};
