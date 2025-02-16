import { 
    Box, 
    Fieldset, 
    Stack, 
} from "@chakra-ui/react"
import MemberForm from "components/ui/MemberForms/MemberForm.js"

const NewMemberForm = ({ maxW }) => {
    /* WIP: Implement the form data state and the handleSubmit function
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        deathDate: ''
    });
    const { handleSubmit, loading } = useMemberForm();
    */

    return (
        <Box>
            <Fieldset.Root size="lg" maxW={maxW}>
                <Stack>
                    <Fieldset.Legend>Neues Familienmitglied anlegen</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Daten des neuen Familienmitglieds eintragen und auf Speichern klicken.
                    </Fieldset.HelperText>
                </Stack>
                <MemberForm />
            </Fieldset.Root>
        </Box>
    )
};

export default NewMemberForm;