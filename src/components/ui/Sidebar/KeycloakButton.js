import { loginKeycloak, logoutKeycloak } from "../../../services/keycloak/keycloak.js";
import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext.js";

export default function KeycloakButton() {

  const {isAuthenticated} = useContext(AuthContext);

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
    <Button colorScheme="blue" w="full" onClick={handleButtonClick} variant='outline'>
      {isAuthenticated ? "Logout" : "Login"}
    </Button>
  );
}
