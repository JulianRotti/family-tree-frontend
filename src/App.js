import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleSidebar from './components/ui/Sidebar/SimpleSidebar.js';  // Adjusted import path
import AppRoutes from './routes/AppRoutes.js';
import { AuthProvider } from './contexts/AuthContext.js'; 

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
