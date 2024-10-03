import { Box, FormLabel, FormControl, Select } from '@chakra-ui/react';

import useFamilyMembers from '../../../hooks/useFamilyMembers.js';

const HeadOfFamilySelector = ({ headOfFamily, setHeadOfFamily }) => {

    const { familyMembers, loading, error } = useFamilyMembers();

    const handleChange = (e) => {
        setHeadOfFamily({
            member_id: e.target.value,
        });
    }

    if (loading) return <p>Loading members...</p>;
    if (error) return <p>Error loading members: {error}</p>;

    return (
        <Box
            bg="white"  // White background
            boxShadow="2xl"  // Strong shadow
            rounded="md"
            p={6}
            m="10px auto"
            maxW={'270px'}
            w={'full'}
        >
            <FormControl>
                <FormLabel>Head of Family</FormLabel>
                <Select
                    id="select_head_of_family_id"
                    value={headOfFamily.member_id}
                    onChange={handleChange}
                >
                    {familyMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.name} ({member.birth_date})
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default HeadOfFamilySelector;