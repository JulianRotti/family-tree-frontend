import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,  // Import useToast
} from '@chakra-ui/react';
import useMemberForm from '../../hooks/useMemberForm.js';

const MemberForm = () => {
  const toast = useToast();  // Initialize Chakra's useToast
  const { handleSubmit, loading } = useMemberForm();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    deathDate: '',
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertStatus, setAlertStatus] = useState(''); // success or error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Restrict input to only letters and hyphen (-), no spaces allowed
  const handleNameInput = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^A-Za-z-]/g, '');  // Allow only letters and hyphens
    setFormData((prev) => ({ ...prev, [e.target.id]: sanitizedValue }));
  };

  const submitForm = async () => {
    const result = await handleSubmit(formData);

    if (result.success) {
      // Display success toast in the top-right corner
      toast({
        title: 'Member added successfully!',
        description: `${formData.firstName} ${formData.lastName} has been added to the family.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      
      // Reset the form data after submission
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        deathDate: '',
      });
    } else {
      // Display error toast in the top-right corner
      toast({
        title: 'Error adding family member',
        description: result.error || 'There was an issue adding the family member.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      m="10px auto"
      as="form"
    >

      {/* First and Last Name */}
      <Flex mb="2%">
        <FormControl mr="5%" isRequired>
          <FormLabel htmlFor="firstName" fontWeight="normal">
            First Name
          </FormLabel>
          <Input
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onInput={handleNameInput}      // Restrict to letters and hyphens
            maxLength={30}                 // Limit input to 30 characters
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="lastName" fontWeight="normal">
            Last Name
          </FormLabel>
          <Input
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onInput={handleNameInput}      // Restrict to letters and hyphens
            maxLength={30}                 // Limit input to 30 characters
          />
        </FormControl>
      </Flex>

      {/* Birth Date and Death Date */}
      <Flex mb="2%">
        <FormControl mr="5%" isRequired>
          <FormLabel htmlFor="birthDate" fontWeight="normal">
            Birth Date
          </FormLabel>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="deathDate" fontWeight="normal">
            Death Date
          </FormLabel>
          <Input
            id="deathDate"
            type="date"
            value={formData.deathDate}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>

      <ButtonGroup mt="5%" w="100%">
        <Button w="100%" colorScheme="teal" isLoading={loading} onClick={submitForm}>
          Add Member
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default MemberForm;
