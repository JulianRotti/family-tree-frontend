import React from 'react';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from '@chakra-ui/react';

// Icon component to display the passed icon prop
const Illustration = ({ icon, ...props }) => {
  return (
    <Icon
      as={icon}
      w={props.width || '100px'}
      h={props.height || '100px'}
      color="orange.400"
    />
  );
};

const FamilyCallToAction = ({ 
  mainTitle,        
  highlightedText,  
  description, 
  icon, 
  buttonText1 = 'Get Started', 
  buttonText2 = 'Learn More' 
}) => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          {mainTitle}{' '}
          <Text as={'span'} color={'orange.400'}>
            {highlightedText}
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          {description}
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}>
            {buttonText1}
          </Button>
          <Button rounded={'full'} px={6}>
            {buttonText2}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FamilyCallToAction;
