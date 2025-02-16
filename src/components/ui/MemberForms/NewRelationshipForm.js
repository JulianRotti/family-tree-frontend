import {
    Box,
    Button,
    IconButton,
    Fieldset,
    Stack,
    HStack,
    Separator,
    Text,
    createListCollection
} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "components/ui/select.jsx";
import { useState } from "react";
import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";

/* Refactor me: Extract to a separate file to use for several forms */
const SelectMembers = ({ selectLabel, id }) => {
    return (
        <SelectRoot collection={frameworks} size="sm" id={id}>
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

const NewRelationshipForm = ({ maxW }) => {
    const [ChildrenSelectors, setChildrenSelectors] = useState([]);
    return (
        <Box>
            <Fieldset.Root size="lg" maxW={maxW}>
                <Stack>
                    <Fieldset.Legend>Neue Beziehungen anlegen</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Eltern und gegebenenfalls Nachkommen eintragen, auf Speichern klicken.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    {/* ########## Eltern ########## */}
                    <Separator />
                    <Text textStyle="sm" fontWeight="bold">Eltern auswählen</Text>
                    <Stack direction={{ base: "column", md: "row" }} w="full">
                        <SelectMembers />
                        <SelectMembers />
                    </Stack>

                    {/* ########## Nachkommen ########## */}
                    <Separator />
                    <Text textStyle="sm" fontWeight="bold">Nachkommen auswählen</Text>
                    {ChildrenSelectors ? (
                        ChildrenSelectors.map((child) =>
                            <HStack>
                                <Box>
                                    <IconButton
                                        aria-label="Nachkommen entfernen"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setChildrenSelectors(ChildrenSelectors.filter(c => c.id !== child.id));
                                        }}
                                    >
                                        <HiOutlineX/>
                                    </IconButton>
                                </Box>
                                <SelectMembers id={child.id} />
                            </HStack>
                        )
                    ) : null}
                    <Box>
                        <IconButton
                            aria-label="Nachkomme hinzufügen"
                            variant="subtle"
                            size="sm"
                            onClick={() => {
                                const maxID = ChildrenSelectors.length > 0
                                    ? Math.max(...ChildrenSelectors.map(c => c.id))
                                    : 0;
                                setChildrenSelectors([...ChildrenSelectors, { id: maxID + 1 }]);
                            }}
                        >
                            <HiOutlinePlusSm />
                        </IconButton>
                    </Box>

                </Fieldset.Content>

                <Button type="submit" alignSelf="flex-end" colorPalette="brand">
                    Speichern
                </Button>
            </Fieldset.Root>
        </Box>
    )
};

export default NewRelationshipForm;