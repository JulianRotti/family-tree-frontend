import { useState } from 'react';
import { createRelationship } from '../services/api/api.js';

const useRelationshipForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    const { member_1_id, member_2_id, relationship } = formData;

    // Basic validation to ensure all fields are filled
    if (!member_1_id || !member_2_id || !relationship) {
      return { success: false, error: 'All fields are required.' };
    }

    // Prevent selecting the same member for both fields
    if (member_1_id === member_2_id) {
      return { success: false, error: 'You cannot select the same member twice.' };
    }

    try {
      setLoading(true);

      // Create the new relationship object with integer member IDs
      const newRelationship = {
        member_1_id: parseInt(member_1_id), // Ensure IDs are integers
        member_2_id: parseInt(member_2_id),
        relationship,
      };

      // Call the API to create the relationship
      const response = await createRelationship(newRelationship);

      return { success: true };
    } catch (error) {
      console.error('Error creating relationship:', error);
      return { success: false, error: 'Failed to create relationship.' };
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};

export default useRelationshipForm;
