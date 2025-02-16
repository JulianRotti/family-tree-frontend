import { Box, Fieldset, Stack, Separator, createListCollection } from "@chakra-ui/react"
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "components/ui/select.jsx"
import MemberForm from "components/ui/MemberForms/MemberForm.js"

/* How to approach the problem:
    [ ] Implement BE endpoint for modifying a family member based on id
    [ ] Extend MemberForm to distinguish between new and existing members (by passing an id from the select field)
*/      

/* Refactor me: Extract to a separate file to use for several forms */
const SelectMembers = ({ selectLabel }) => {
    return (
        <SelectRoot collection={frameworks} size="sm">
            <SelectLabel>{selectLabel}</SelectLabel>
            <SelectTrigger>
                <SelectValueText placeholder="Name" />
            </SelectTrigger>
            <SelectContent>
                {frameworks.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    )
};

/* Refactor me: Delete mock data */
const frameworks = createListCollection({
    items: [
        { label: "Hans Zimmer", value: "id1" },
        { label: "Rudolph Hammer", value: "id2" },
        { label: "Anita Bogenfrau", value: "id3" }
    ],
});


const ModifyMemberForm = ({ maxW }) => {
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
                    <SelectMembers selectLabel="Familienmitglied auswählen" />
                </Fieldset.Content>
                <MemberForm />

            </Fieldset.Root>
        </Box>
    )
};

export default ModifyMemberForm;