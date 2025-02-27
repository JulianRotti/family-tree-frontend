import { Box, Text, Card, Image } from '@chakra-ui/react';

const HoverCard = ({ hoveredMember }) => {
    return (
        <Card.Root flexDirection={flexDirection} variant="subtle">
            { displayImage && <Image
                objectFit="cover"
                maxW="100px"
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
            /> }
            <Box>
                <Card.Body>
                    <Card.Title>
                        {hoveredMember.first_name} {hoveredMember.last_name}
                    </Card.Title>
                    <Card.Description>
                        <Text>Geboren am {hoveredMember.birth_date} in {hoveredMember.birth_city}, {hoveredMember.birth_country}</Text>
                        {hoveredMember.death_date ? <Text>Gestorben am {hoveredMember.death_date}</Text> : null}
                    </Card.Description>
                </Card.Body>
            </Box>
        </Card.Root>
    );
};

export default HoverCard;