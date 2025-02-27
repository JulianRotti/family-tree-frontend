import { useState, useEffect } from 'react';
import { getFamilyMemberById } from '../services/api/api.js';
import { toaster } from "components/ui/chakra-snippets/toaster.jsx"

export const useGetFamilyMemberById = (id) => {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getFamilyMember = async () => {
      setIsLoading(true);
      try {
        const { notice, ...member} = await getFamilyMemberById(id);

        setMember(member);

        if (notice) {
          toaster.create({
            title: notice,
            type: "info",
          })
        } else {
          console.log(`Mitglied mit ID ${id} erfolgreich geladen.`);
        }
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
    getFamilyMember();
  }, [id]);

  return { member, isLoading, isError };
}