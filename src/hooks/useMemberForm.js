import { useState } from 'react';
import { createFamilyMember } from '../services/api/api.js';  // Import the API function

const useMemberForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    const { firstName, lastName, birthDate, deathDate } = formData;

    // Basic validation
    if (!firstName || !lastName || !birthDate) {
      return { success: false, error: 'First name, last name, and birth date are required.' };
    }

    try {
      setLoading(true);

      // Prepare the data for the API, ensuring date is in the correct format
      const newMember = {
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,  // Already in YYYY-MM-DD format
        death_date: deathDate || null,  // If death date exists, use it, else null
      };

      const response = await createFamilyMember(newMember);  // Call the API

      return { success: true };
    } catch (error) {
      console.error('Error creating family member:', error);
      return { success: false, error: 'Failed to add the family member.' };
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};

export default useMemberForm;
