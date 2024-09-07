import React from 'react';
import { createRoot } from 'react-dom/client';  // Correct import from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';  // Chakra UI Provider
import './index.css';  // Ensure styles are imported
import App from './App.js';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);  // Create the root using createRoot

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
