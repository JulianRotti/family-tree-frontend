import React, { createContext, useState, useEffect } from 'react';
import { initKeycloak, authentificationListener, checkKeycloakLogin } from "../services/keycloak/keycloak.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
      const initializeKeycloak = async () => {
        await initKeycloak();
        // set the authentication state for the first time
        setIsAuthenticated(checkKeycloakLogin());
        // set up event listeners for updating the authentification state in the future
        authentificationListener(setIsAuthenticated);
        setAuthLoading(false); 
      };

      initializeKeycloak();
    }, []);

    if (authLoading) {
        return <div>Loading...</div>; 
    }
    // return a provider in which the authentication state can be accessed
    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
