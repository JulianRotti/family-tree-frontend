import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './RouteConfig.js';
import AccessControl from '../components/ui/Authentication/AccessControl.js';

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route
           key={route.path} 
           path={route.path} 
           element={
            <AccessControl requiredRole={route.role} redirect={true}>
              <route.component />
            </AccessControl>
        } />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
