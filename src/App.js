/* import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleSidebar from './components/ui/Sidebar/SimpleSidebar.js';  // Adjusted import path

function App() {
  return (
    <AuthProvider>
      <Router>
        <SimpleSidebar>
          <AppRoutes />
        </SimpleSidebar>
      </Router>
    </AuthProvider>
  );
}

export default App;
*/

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout.js';
import { AuthProvider } from './contexts/AuthContext.js'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;


