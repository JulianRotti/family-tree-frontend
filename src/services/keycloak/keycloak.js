// src/services/keycloak/keycloak.js
import Keycloak from 'keycloak-js';

// Config from .env file
const keycloakConfig = {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID
};

// Create a new Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

// Initialize Keycloak with onLoad check-sso (so that the user is not automatically prompted to the keycloak login page)
export const initKeycloak = async () => {
    try {
        const authenticated = await keycloak.init({ onLoad: 'check-sso' });
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }
}

// Login the user using Keycloak
export const loginKeycloak = () => {
    keycloak.login();
}

// Logout the user using Keycloak
export const logoutKeycloak = () => {  
    return keycloak.logout({ redirectUri: `${window.location.origin}/` });
};

// Check the keycloak login status
export const checkKeycloakLogin = () => {    
    return keycloak.authenticated;
}

// Set up event listeners for setting the authentication status
export const authentificationListener = (setIsAuthenticated) => {
    keycloak.onAuthSuccess = () => {
        setIsAuthenticated(true);
    };
    
    keycloak.onAuthLogout = () => {
        setIsAuthenticated(false);
    };
}

// Check if the authenticated user has a specific role
export const hasRole = (role) => {
    if (!keycloak.authenticated || !keycloak.tokenParsed.realm_access.roles) {
        console.error("Role check failed: Token or roles not available.");
        return false;
    }
    return keycloak.tokenParsed.realm_access.roles.includes(role);
}