import { loginKeycloak, logoutKeycloak } from "../../../services/keycloak/keycloak.js";
import { Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { HiLogin, HiLogout } from "react-icons/hi";


export default function KeycloakButton({ variant="ghost", size="sm", ...props }) {
  const {isAuthenticated} = useContext(AuthContext);
  const isMobile = useBreakpointValue({ base: true, md: false });
  // Login/Logout based on the current authentication status
  const handleButtonClick = async () => {
    if (isAuthenticated) {
      await logoutKeycloak();
    } else {
      await loginKeycloak();
    }
  };

  // Display Login/Login based on the current authentication status
  return (
    isMobile?  (
      <IconButton 
      onClick={handleButtonClick} 
      variant={variant}
      size={size}
      colorPalette="brand" 
      {...props}
    >
      {isAuthenticated ? <HiLogout/> : <HiLogin/>}
    </IconButton>
    ) : (
    <Button 
      onClick={handleButtonClick} 
      variant={variant}
      size={size}
      colorPalette="brand" 
      {...props}
    >
      {isAuthenticated ? "Logout" : "Login"}
    </Button>
    )
  );
}
