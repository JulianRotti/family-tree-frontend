import { Box, Fieldset, Stack, Separator, Text } from "@chakra-ui/react";
import MemberForm from "components/ui/MemberForms/MemberForm.js";
import SelectMembers from "components/ui/SelectMembers/SelectMember.js";

import { useState } from "react";

const ModifyMemberForm = ({ maxW }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    // console.log(selectedMember);
    return (
        <Box>
            <Fieldset.Root size="lg" maxW={maxW}>
                <Stack>
                    <Fieldset.Legend>Bestehendes Familienmitglied ändern</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Familienmitglied suchen, Daten des neuen Familienmitglieds eintragen und auf Speichern klicken.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    {/* ########## Suchen ########## */}
                    <Separator />
                    <Text textStyle="sm" fontWeight="bold">Familienmitglied auswählen</Text>
                    <SelectMembers 
                        setSelectedMember={setSelectedMember}
                        selectMember={selectedMember} />
                </Fieldset.Content>
                <MemberForm defaultValues={selectedMember}/>

            </Fieldset.Root>
        </Box>
    )
};

export default ModifyMemberForm;