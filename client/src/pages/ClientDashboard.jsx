// src/pages/ClientDashboard.jsx

import React from 'react';
import { Box, Flex, Avatar, Text, IconButton, VStack, Link as ChakraLink, Heading, Button, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import ProjectList from '../components/client/ProjectList.jsx'; // <-- import it here (adjust path if needed)

function ClientDashboard() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex minH="100vh" bg="gray.50" color="gray.700">
      {/* Sidebar */}
      <Box w="250px" bg="blue.600" color="white" p={5}>
        <Flex direction="column" align="center" gap={4}>
          {/* Profile Photo */}
          <Avatar size="xl" name={user?.name || 'Client'} />

          {/* User Name */}
          <Text fontSize="lg" fontWeight="bold">
            {user?.name || 'Client Name'}
          </Text>

          {/* Update Profile Icon */}
          <IconButton
            icon={<EditIcon />}
            aria-label="Update Profile"
            variant="outline"
            colorScheme="whiteAlpha"
            size="sm"
            mt={2}
          />

          {/* Navigation Links */}
          <VStack spacing={4} mt={8} align="stretch" w="full">
            <ChakraLink
              as={Link}
              to="/post-project"
              fontWeight="medium"
              _hover={{ textDecoration: 'none', bg: 'blue.700' }}
              p={2}
              borderRadius="md"
              textAlign="center"
            >
              Post New Project
            </ChakraLink>
            <ChakraLink
              as={Link}
              to="/my-campaigns"
              fontWeight="medium"
              _hover={{ textDecoration: 'none', bg: 'blue.700' }}
              p={2}
              borderRadius="md"
              textAlign="center"
            >
              My Campaigns
            </ChakraLink>
          </VStack>

          {/* Logout Button */}
          <Button 
            onClick={handleLogout} 
            mt={10} 
            size="sm" 
            colorScheme="red" 
            variant="outline"
            _hover={{ bg: 'red.500', color: 'white' }}
          >
            Logout
          </Button>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={10}>
        <Heading size="lg" mb={6}>
          Welcome back, {user?.name || 'Client'}!
        </Heading>
        <Text fontSize="md" color="gray.600" mb={10}>
          Manage your projects and track campaign performance easily.
        </Text>

        {/* Dashboard Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={10}>
          <Stat
            p={5}
            shadow="md"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: 'lg' }}
          >
            <StatLabel fontWeight="bold" color="gray.500">
              Projects Posted
            </StatLabel>
            <StatNumber color="blue.600">8</StatNumber>
            <StatHelpText>Last 30 days</StatHelpText>
          </Stat>

          <Stat
            p={5}
            shadow="md"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: 'lg' }}
          >
            <StatLabel fontWeight="bold" color="gray.500">
              Active Campaigns
            </StatLabel>
            <StatNumber color="green.500">3</StatNumber>
            <StatHelpText>Ongoing</StatHelpText>
          </Stat>

          <Stat
            p={5}
            shadow="md"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: 'lg' }}
          >
            <StatLabel fontWeight="bold" color="gray.500">
              Budget Spent
            </StatLabel>
            <StatNumber color="purple.500">$4500</StatNumber>
            <StatHelpText>This Month</StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* 🚀 Inserted Project List */}
        <Heading size="md" mb={6}>
          Your Projects
        </Heading>
        <ProjectList />
      </Box>
    </Flex>
  );
}

export default ClientDashboard;
