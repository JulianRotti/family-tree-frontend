// src/components/AccessControl.js
import React from 'react';
import { useContext } from "react";
import { hasRole } from '../services/keycloak/keycloak.js';
import { AuthContext } from "../contexts/AuthContext.js";
import { Navigate } from 'react-router-dom';

const AccessControl = ({ requiredRoles, children, fallback = null, redirect = false }) => {
    const {isAuthenticated} = useContext(AuthContext);
    if (requiredRoles.includes('public')) {
        return children;
    }
    const hasRequiredRole = requiredRoles.some((role) => hasRole(role));
    
    if (!isAuthenticated || !hasRequiredRole) {
        return redirect ? <Navigate to="/no-access" replace /> : fallback;
    }

    return children;
}

export default AccessControl;