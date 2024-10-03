import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App.js';  // Main App component

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// No need to initialize Keycloak here; it's done in useAuth.js
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
