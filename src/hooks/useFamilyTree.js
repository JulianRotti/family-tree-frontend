// src/hooks/useFamilyTree.js

import { useState, useEffect } from 'react';
import { getFamilyTreeById } from '../services/api/api.js';  // Import the API function

export const useFamilyTree = (memberId, w_node = 20, w_partner = 50, w_children = 60) => {
  const [familyTree, setFamilyTree] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFamilyTree = async () => {
      setLoading(true);
      setError(null);
      try {
        const { family_tree_by_id, members } = await getFamilyTreeById(memberId, w_node, w_partner, w_children);
        setFamilyTree(family_tree_by_id);
        setMemberData(members);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) fetchFamilyTree();
  }, [memberId, w_node, w_partner, w_children]);

  return { familyTree, memberData, loading, error };
};
