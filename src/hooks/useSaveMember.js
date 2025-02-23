import { useState, useContext } from 'react';
import { createFamilyMember, updateFamilyMember } from '../services/api/api.js';  // Import the API function
import { toaster } from "components/ui/toaster.jsx"
import { MemberContext } from 'contexts/MemberContext.js';

const useSaveMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { fetchMembers } = useContext(MemberContext);

  const submitMember = async ({ memberData, reset }) => {
    console.log(memberData);
    setLoading(true);

    try {
      setLoading(true);

      let response;

      if (memberData.id) {
        response = await updateFamilyMember(memberData);
        reset(memberData);
      } else {
        response = await createFamilyMember(memberData);
        reset();
      }
      fetchMembers();

      if (response.notice) {
        toaster.create({
          title: response.notice,
          type: "info",
        })
      } else {
        toaster.create({
          title: `${memberData.first_name} ${memberData.last_name} erfolgreich gespeichert.`,
          type: "success",
        })
      }

    } catch (err) {
      setError(err);
      toaster.create({
        title: `${err}`,
        type: "error",
      })
    } finally {
      setLoading(false);
    }
  };

  return { submitMember, loading, error };
};

export default useSaveMember;
