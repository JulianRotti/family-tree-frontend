import React from 'react';
import { Box } from '@chakra-ui/react';
import { Toaster } from "components/ui/chakra-snippets/toaster.jsx"
import Header from '../ui/Header/Header.js';
import Footer from '../ui/Footer/Footer.js';
import AppRoutes from '../../routes/AppRoutes.js';
import backgroundImage from '../../assets/images/abstrakt_baumring.jpg';

const MainLayout = () => {
  return (
    <Box 
        display="flex" 
        flexDirection="column" 
        minHeight="100vh"
        bgImage={`url(${backgroundImage})`} 
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat" 
    >
        {/* Header */}
        <Header width={{ base: "100%", md: "80%" }}/>

        {/* Toaster - render to use toasts in other components*/}
        <Toaster />

        {/* Main content area with custom width */}
        <Box
            as="main"
            flex="1"
            p={4}
            maxWidth="2000px"
            mx="auto"
            width={{ base: "100%", md: "80%" }} 
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <AppRoutes />
        </Box>
        {/* Footer */}
        <Footer />
    </Box>
  );
};

export default MainLayout;
