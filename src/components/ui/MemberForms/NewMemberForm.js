import {
    Box,
    Fieldset,
    Stack,
} from "@chakra-ui/react"
import MemberForm from "components/ui/MemberForms/MemberForm.js"

const NewMemberForm = ({ maxW }) => {
    const defaultValues = {
        id: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        birth_city: null,
        birth_country: null,
        email: null,
        telephone: null,
        street_number: null,
        plz: null,
        city: null,
    }

    return (
        <Box>
            <Fieldset.Root size="lg" maxW={maxW}>
                <Stack>
                    <Fieldset.Legend>Neues Familienmitglied anlegen</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Daten des neuen Familienmitglieds eintragen und auf Speichern klicken.
                    </Fieldset.HelperText>
                </Stack>
                <MemberForm defaultValues={defaultValues}/>
            </Fieldset.Root>
        </Box>
    )
};

export default NewMemberForm;