import React from 'react';
import { Box, Heading, Input, Flex } from '@chakra-ui/react';
import OpenProjects from './OpenProjects';
import Header from '../layout/Header';  // Assuming Header is in the layout folder

function ViewProjects() {
  return (
    <Box bg="white" minH="100vh">
      <Header/>
      <Box p={6}>
        <Heading as="h1" size="lg" mb={4} color="blue.600">
          View Open Projects
        </Heading>
        <Flex mb={6} justifyContent="center">
          <Input
            placeholder="Search projects..."
            size="lg"
            width="80%"
            maxW="500px"
            bg="gray.100"
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
          />
        </Flex>
        <OpenProjects />
      </Box>
    </Box>
  );
}

export default ViewProjects;
