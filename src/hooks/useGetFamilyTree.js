// src/hooks/useFamilyTree.js

import { useState, useEffect } from 'react';
import { getFamilyTreeById } from '../services/api/api.js';  // Import the API function
import { toaster } from "components/ui/chakra-snippets/toaster.jsx"

export const useGetFamilyTree = ({ memberId, w_node, w_partner, w_children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [familyTree, setFamilyTree] = useState(null);
  const [members, setMembers] = useState(null);


  useEffect(() => {
    const getFamilyTree = async () => {
      setIsLoading(true);
      try {
        const response = await getFamilyTreeById(memberId, w_node, w_partner, w_children);
        setFamilyTree(response.familyTreeById);
        setMembers(response.members);

        if (response.notice) {
          toaster.create({
            title: response.notice,
            type: "info",
          })
        } else {
          console.log(`Familienstammbaum für Mitglied ${memberId} erfolgreich geladen.`);
        }
        return response;
      } catch (err) {
        setIsError(true);
        toaster.create({
          title: `${err}`,
          type: "error",
        })
      } finally {
        setIsLoading(false);
      }
    };
    getFamilyTree();
  }, [memberId, w_node, w_partner, w_children]);

  return { familyTree, members, isLoading, isError };
};
