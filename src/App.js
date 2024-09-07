import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SimpleSidebar from './components/ui/SimpleSidebar.js';  // Adjusted import path
import AppRoutes from './routes/AppRoutes.js';

function App() {
  return (
    <Router>
      <SimpleSidebar>
        <AppRoutes />
      </SimpleSidebar>
    </Router>
  );
}

export default App;
