import { loginKeycloak, logoutKeycloak, authentificationListener, checkKeycloakLogin, hasRole } from "../../../services/keycloak/keycloak.js";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function KeycloakButton() {

  // State to keep track of the current authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check initial authentication status when component mounts
  // Set up event listeners for setting the authentication status in the future
  useEffect(() => {
    setIsAuthenticated(checkKeycloakLogin());
    authentificationListener(setIsAuthenticated);
  }, []);

  // Login/Logout based on the current authentication status
  const handleButtonClick = async () => {
    if (isAuthenticated) {
      await logoutKeycloak();
    } else {
      await loginKeycloak();
    }
    // console.log(JSON.stringify(hasRole('editor'), null, 2));
  };

  // Display Login/Login based on the current authentication status
  return (
    <Button colorScheme="blue" w="full" onClick={handleButtonClick}>
      {isAuthenticated ? "Logout" : "Login"}
    </Button>
  );
}
