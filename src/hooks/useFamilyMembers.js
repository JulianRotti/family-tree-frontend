import { useState, useEffect } from 'react';
import { getFamilyMembers } from '../services/api/api.js';

// Custom hook for fetching and formatting family members
const useFamilyMembers = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getFamilyMembers();
        const formattedMembers = members.map(member => ({
          id: member.id,
          name: `${member.first_name} ${member.last_name}`,  // Concatenate first_name and last_name
        }));
        setFamilyMembers(formattedMembers);
      } catch (err) {
        setError('Failed to fetch family members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { familyMembers, loading, error };
};

export default useFamilyMembers;
