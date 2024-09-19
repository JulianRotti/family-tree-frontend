import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { FaBirthdayCake, FaCross } from 'react-icons/fa'; // Import Font Awesome icons
  
  export default function SocialProfileWithImage({ name, initialName, birthDate, deathDate, avatarUrl }) {
    return (
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit="cover"
            alt="#"
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={avatarUrl}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {name}
              </Heading>
              <Text color={'gray.500'}>{initialName}</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <FaBirthdayCake />
                <Text fontSize={'sm'} color={'gray.500'}>
                  {birthDate}
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <FaCross />
                <Text fontSize={'sm'} color={'gray.500'}>
                  {deathDate}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Center>
    );
  }
  