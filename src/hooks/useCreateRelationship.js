import { useState } from 'react';
import { createRelationship } from '../services/api/api.js';  // Import the API function
import { toaster } from "components/ui/chakra-snippets/toaster.jsx"

const useCreateRelationship = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const validateRelationship = ({ member_1_id, member_2_id, relationship }) => {
    if (!member_1_id || !member_2_id || !relationship) {
      throw new Error('Beide Familienmitglieder und Beziehung muss angegeben sein.');
    }

    if (member_1_id === member_2_id) {
      throw new Error('Das gleiche Familienmitglied kann nicht zweimal ausgewählt werden.');
    }
  }

  const submitRelationship = async (relationshipData) => {
    const { member_1, member_2, relationship } = relationshipData;

    setLoading(true);

    try {
      validateRelationship({ member_1_id: member_1.id, member_2_id: member_2.id, relationship });

      // Call the API to create the relationship
      const response = await createRelationship({ member_1_id: member_1.id, member_2_id: member_2.id, relationship });

      const member_1_name = `${member_1.first_name} ${member_1.last_name}`;
      const member_2_name = `${member_2.first_name} ${member_2.last_name}`;

      if (response.notice) {
        toaster.create({
          title: response.notice,
          type: "info",
        })
      } else {
        toaster.create({
          title: `Beziehung zwischen ${member_1_name} und ${member_2_name} erfolgreich gespeichert.`,
          type: "success",
        })
      }

    } catch (err) {
      setError(true);
      toaster.create({
        title: `${err}`,
        type: "error",
      })
    } finally {
      setLoading(false);
    }
  };

  const submitRelationships = ({ firstPartner, secondPartner, children }) => {
    setError(false);
    submitRelationship({
      member_1: firstPartner,
      member_2: secondPartner,
      relationship: "spouse"
    });
    children.forEach(child => {
      submitRelationship({
        member_1: firstPartner,
        member_2: child.member,
        relationship: "parent"
      });
      submitRelationship({
        member_1: secondPartner,
        member_2: child.member,
        relationship: "parent"
      });
    });
  };

  return { submitRelationships, loading, error };
};

export default useCreateRelationship;
