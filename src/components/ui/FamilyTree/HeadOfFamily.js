import {
    Box,
    Text,
    Center,
    Spinner,
    Card,
    Image,
    Separator,
    useBreakpointValue
} from '@chakra-ui/react';

const HeadOfFamily = ({ selectedMember }) => {
    const flexDirection = useBreakpointValue({ base: "column", md: "row" });
    const displayImage = useBreakpointValue({ base: false, lg: true });

    if (!selectedMember) {
        return (
            <Box pos="absolute" inset="0" bg="bg/80">
                <Center h="full">
                    <Spinner color="brand.solid" />
                </Center>
            </Box>
        )
    };

    return (
        <Card.Root flexDirection={flexDirection} variant="subtle">
            {displayImage && <Image
                objectFit="cover"
                maxW="100px"
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
            />}
            <Box>
                <Card.Body>
                    <Card.Title>
                        {selectedMember.first_name} {selectedMember.last_name}
                    </Card.Title>
                    <Card.Description>
                        <Text>Geboren am {selectedMember.birth_date} in {selectedMember.birth_city}, {selectedMember.birth_country}</Text>
                        {selectedMember.death_date ? <Text>Gestorben am {selectedMember.death_date}</Text> : null}
                    </Card.Description>
                </Card.Body>
            </Box>
            <Separator orientation="vertical" />
            <Box>
                <Card.Body>
                    <Card.Description>
                        <Text>Anzahl Kinder: </Text>
                        <Text>Anzahl Gesamt-Nachkommen: </Text>
                        <Text>Test</Text>
                    </Card.Description>
                </Card.Body>
            </Box>
        </Card.Root>
    );
};

export default HeadOfFamily;