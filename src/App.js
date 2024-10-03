import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleSidebar from './components/ui/Sidebar/SimpleSidebar.js';  // Adjusted import path
import AppRoutes from './routes/AppRoutes.js';
import { initKeycloak } from './services/keycloak/keycloak.js'; 

function App() {
  useEffect(() => {
    initKeycloak();
  }, []);
  return (
    <Router>
      <SimpleSidebar>
        <AppRoutes />
      </SimpleSidebar>
    </Router>
  );
}

export default App;
