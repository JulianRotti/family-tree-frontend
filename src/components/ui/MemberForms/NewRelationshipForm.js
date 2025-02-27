import {
    Box,
    Button,
    IconButton,
    Fieldset,
    Stack,
    HStack,
    Separator,
    Text
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";
import SelectMembers from "components/ui/SelectMembers/SelectMember.js";
import useCreateRelationship from "hooks/useCreateRelationship.js";

const NewRelationshipForm = ({ maxW }) => {
    // State for managing the list of children selectors
    const [childrenSelectors, setChildrenSelectors] = useState([]); // Array of objects with { id: number }

    // State for managing the first partner
    const [selectedFirstPartner, setSelectedFirstPartner] = useState(null); // Object representing a member or null

    // State for managing the second partner
    const [selectedSecondPartner, setSelectedSecondPartner] = useState(null); // Object representing a member or null

    // State for managing the list of children. id is used to match the child with the selector
    const [selectedChildren, setSelectedChildren] = useState([]); // Array of objects with { id: number, member: object or null }.

    const [triggerReset, setTriggerReset] = useState(false);
    const { submitRelationships, loading, error } = useCreateRelationship();

    useEffect(() => {
        if (!loading && !error) {
            setChildrenSelectors([]);
            setSelectedChildren([]);
            setSelectedFirstPartner(null);
            setSelectedSecondPartner(null);
            setTriggerReset(!triggerReset); // workaround so that key changes in SelectMembers component which leads to rerendering. Bug in Chakra UI?
        }
    }, [error, loading]);

    return (
        <Box>
            <Fieldset.Root size="lg" maxW={maxW}>
                <Stack>
                    <Fieldset.Legend>Neue Beziehungen anlegen</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Partner und gegebenenfalls Nachkommen eintragen, auf Speichern klicken.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    {/* ########## Partner ########## */}
                    <Separator />
                    <Text textStyle="sm" fontWeight="bold">Partner auswählen</Text>
                    <Stack direction={{ base: "column", md: "row" }} w="full">
                        <SelectMembers 
                            setSelectedMember={setSelectedFirstPartner}
                            selectedMember={selectedFirstPartner} 
                            reset={triggerReset}
                        />
                        <SelectMembers 
                            setSelectedMember={setSelectedSecondPartner} 
                            selectedMember={selectedSecondPartner}    
                            reset={triggerReset}
                        />
                    </Stack>

                    {/* ########## Nachkommen ########## */}
                    <Separator />
                    <Text textStyle="sm" fontWeight="bold">Nachkommen auswählen</Text>
                    {childrenSelectors ? (
                        childrenSelectors.map((child) =>
                            <HStack key={child.id}>
                                <Box>
                                    <IconButton
                                        aria-label="Nachkommen entfernen"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setChildrenSelectors(childrenSelectors.filter(c => c.id !== child.id));
                                            setSelectedChildren(selectedChildren.filter(c => c.id !== child.id));
                                        }}
                                    >
                                        <HiOutlineX />
                                    </IconButton>
                                </Box>
                                <SelectMembers 
                                    setSelectedMember={(selectedChild) => {
                                        setSelectedChildren((prevChildren) =>
                                            prevChildren.map(c =>
                                                c.id === child.id
                                                    ? { id: c.id, member: selectedChild }
                                                    : c
                                            )
                                        );
                                    }}
                                    selectedMember={selectedChildren.find(c => c.id === child.id)?.member}
                                    reset={triggerReset}
                                 />
                            </HStack>
                        )
                    ) : null}
                    <Box>
                        <IconButton
                            aria-label="Nachkomme hinzufügen"
                            variant="subtle"
                            size="sm"
                            onClick={() => {
                                const maxID = childrenSelectors.length > 0
                                    ? Math.max(...childrenSelectors.map(c => c.id))
                                    : 0;
                                setChildrenSelectors([...childrenSelectors, { id: maxID + 1 }]);
                                setSelectedChildren([...selectedChildren, { id: maxID + 1, member: null }]);
                            }}
                        >
                            <HiOutlinePlusSm />
                        </IconButton>
                    </Box>

                </Fieldset.Content>

                <Button 
                    type="submit" 
                    alignSelf="flex-end" 
                    colorPalette="brand"
                    onClick={() =>
                        submitRelationships({
                            firstPartner: selectedFirstPartner,
                            secondPartner: selectedSecondPartner,
                            children: selectedChildren
                        })
                    }
                    loading={loading}
                    loadingText="Speichern..."
                >
                    Speichern
                </Button>
            </Fieldset.Root>
        </Box>
    )
};

export default NewRelationshipForm;