import React, { useEffect, useState } from "react";
import { Box, Fieldset, Stack, Separator, Text } from "@chakra-ui/react";
import SelectMembers from "components/ui/SelectMember/SelectMember.js";
import FamilyTreeVisualisation from "components/ui/FamilyTree/FamilyTreeVisualisation.js";
import HeadOfFamily from "components/ui/FamilyTree/HeadOfFamily.js";
import { useGetFamilyMemberById } from "hooks/useGetFamilyMembers.js";
import Demo from "components/ui/FamilyTree/Test.js";

const FamilyTreeContainer = ({ maxW, maxH }) => {
    const [selectedMember, setSelectedMember] = useState({ id: 1});
    const [hoveredMember, setHoveredMember] = useState(null);

    const { member, isLoading, isError } = useGetFamilyMemberById(1);

    useEffect(() => {
        if (member) {
            setSelectedMember(member);
        }
    }, [member]);

    return (
        <Box>
            <Fieldset.Root size="lg" maxW={maxW}>
                <Stack>
                    <Fieldset.Legend>Stammbaum visualisieren</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Ausgehend vom ausgewählten Familienoberhaupt wird der Stammbaum visualisiert.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    {/* ########## Suchen ########## */}
                    <Separator />
                    <Stack direction={{ base: "column", md: "row" }} w="full">
                        <Box>
                            <Text textStyle="sm" fontWeight="bold">Oberhaupt auswählen</Text>
                            <SelectMembers
                                setSelectedMember={setSelectedMember}
                                selectMember={selectedMember}
                            />
                        </Box>
                        <Separator orientation="vertical" />
                        <Box width="full">
                            <HeadOfFamily
                                selectedMember={selectedMember}
                            />
                        </Box>
                    </Stack>
                    <Separator />
                </Fieldset.Content>
                <FamilyTreeVisualisation
                    memberId={selectedMember.id}
                    width={maxW}
                    height={maxH}
                />

            </Fieldset.Root>
        </Box>
    )
};

export default FamilyTreeContainer;