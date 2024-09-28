import { useState } from 'react';
import { Box, Button, Flex, FormControl, Select, useToast } from '@chakra-ui/react';
import useRelationshipForm from '../../hooks/useRelationshipForm.js';
import useFamilyMembers from '../../hooks/useFamilyMembers.js';

const RelationshipForm = () => {
  const toast = useToast();
  const { handleSubmit, loading } = useRelationshipForm();
  const { familyMembers, loading: membersLoading, error } = useFamilyMembers();

  const [formData, setFormData] = useState({
    member_1_id: '',
    member_2_id: '',
    relationship: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitForm = async () => {
    const result = await handleSubmit(formData);

    if (result.success) {
      toast({
        title: 'Relationship added successfully!',
        description: 'The relationship has been added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });

      // Reset the form
      setFormData({
        member_1_id: '',
        member_2_id: '',
        relationship: '',
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to add relationship.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  if (membersLoading) return <p>Loading members...</p>;
  if (error) return <p>Error loading members: {error}</p>;

  return (
    <Box
      bg="white"
      borderWidth="1px"
      rounded="lg"
      shadow="2xl"
      maxWidth={800}
      p={6}
      m="10px auto"
      as="form"
    >
      {/* Form layout for relationship: "Member | Relationship | Member" */}
      <Flex mb="2%">
        <FormControl mr="5%" isRequired>
          <Select
            id="member_1_id"
            value={formData.member_1_id}
            onChange={handleChange}
            placeholder="Member"
          >
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.birth_date})
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl ml="5%" mr="5%" isRequired>
          <Select
            id="relationship"
            value={formData.relationship}
            onChange={handleChange}
            placeholder="Relationship"
          >
            <option value="parent">Parent</option>
            <option value="spouse">Spouse</option>
          </Select>
        </FormControl>

        <FormControl ml="5%" isRequired>
          <Select
            id="member_2_id"
            value={formData.member_2_id}
            onChange={handleChange}
            placeholder="Member"
          >
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.birth_date})
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>

      <Button
        mt="5%"
        w="100%"
        colorScheme="teal"
        isLoading={loading}
        onClick={submitForm}
      >
        Add Relationship
      </Button>
    </Box>
  );
};

export default RelationshipForm;
