import React from 'react';
import { Box, Heading, Input, Flex } from '@chakra-ui/react';
import OpenProjects from './OpenProjects';
import Header from '../layout/Header';  // Assuming Header is in the layout folder

function ViewProjects() {
  return (
    <Box bg="white" minH="100vh" color="gray.800">
      <Header />
      <Box p={8}>
        <Flex
          align="center"
          justify="space-between"
          wrap="wrap"
          mb={8}
          direction={{ base: 'column', md: 'row' }}
        >
          <Heading
            as="h1"
            size="xl"
            color="blue.500"
            mb={{ base: 4, md: 0 }}
            fontWeight="bold"
          >
            View Open Projects
          </Heading>

          <Input
            placeholder="Search projects..."
            size="md"
            width={{ base: '100%', md: '300px' }}
            bg="gray.100"
            _placeholder={{ color: 'gray.500' }}
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 2px #3182ce',
              bg: 'white',
            }}
            borderRadius="md"
          />
        </Flex>

        <Box bg="gray.50" p={6} borderRadius="md" boxShadow="md">
          <OpenProjects />
        </Box>
      </Box>
    </Box>
  );
}

export default ViewProjects;
