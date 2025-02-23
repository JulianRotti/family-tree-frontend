import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout.js';
import { AuthProvider } from './contexts/AuthContext.js';
import { MemberProvider } from './contexts/MemberContext.js';

function App() {
  return (
    <AuthProvider>
      <MemberProvider>
        <Router>
          <MainLayout />
        </Router>
      </MemberProvider>
    </AuthProvider>
  );
}

export default App;


