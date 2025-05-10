import { useContext } from "react";
import { MemberContext } from "contexts/MemberContext.js";
import {
    NativeSelect
} from "@chakra-ui/react"

const SelectMembers = ({ setSelectedMember, selectedMember, reset }) => {
    const { members } = useContext(MemberContext);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedMember(members.find((member) => member.id == selectedValue));
    };

    return (
        <NativeSelect.Root
            key={+reset} 
            onChange={handleSelectChange}
            value={selectedMember?.id}
        >
            <NativeSelect.Field placeholder="Familienmitglied auswählen">
            {members.map((member) => (
                <option key={member.id} value={member.id}>
                    {member.first_name} {member.last_name} ({member.birth_date})
                </option>
            ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
        </NativeSelect.Root>
    );
};
export default SelectMembers;