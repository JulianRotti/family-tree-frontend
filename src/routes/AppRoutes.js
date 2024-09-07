import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './RouteConfig.js';

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
