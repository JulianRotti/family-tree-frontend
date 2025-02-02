import { Box, Field } from '@chakra-ui/react';
import {
    NativeSelectField,
    NativeSelectRoot,
} from "components/ui/native-select.jsx";

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
            <Field.Root>
                <Field.Label>Head of Family</Field.Label>
                <NativeSelectRoot>
                    <NativeSelectField
                        id="select_head_of_family_id"
                        value={headOfFamily.member_id}
                        onChange={handleChange}
                        items={familyMembers.map((member) => ({
                            label: `${member.name} (${member.birth_date})`,
                            value: member.id,
                        }))}
                    />
                </NativeSelectRoot>
            </Field.Root>
        </Box>
    );
};

export default HeadOfFamilySelector;