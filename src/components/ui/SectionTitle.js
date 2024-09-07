import React from 'react';
import { Container, Heading, Stack, Text } from '@chakra-ui/react';

const SectionTitle = ({ mainTitle, highlightedText }) => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}  // Set consistent padding and spacing
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          {mainTitle}{' '}
          <Text as={'span'} color={'orange.400'}>
            {highlightedText}
          </Text>
        </Heading>
      </Stack>
    </Container>
  );
};

export default SectionTitle;
