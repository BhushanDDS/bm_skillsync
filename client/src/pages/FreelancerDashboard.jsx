// src/pages/FreelancerDashboard.jsx

import React from 'react';
import { Box, Flex, Avatar, Text, IconButton, VStack, Link as ChakraLink, Heading, Button, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function FreelancerDashboard() {
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
          <Avatar size="xl" name={user?.name || 'User'} />

          {/* User Name */}
          <Text fontSize="lg" fontWeight="bold">
            {user?.name || 'User Name'}
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
              to="/create-project"
              fontWeight="medium"
              _hover={{ textDecoration: 'none', bg: 'blue.700' }}
              p={2}
              borderRadius="md"
              textAlign="center"
            >
              Create Project
            </ChakraLink>
            <ChakraLink
              as={Link}
              to="/campaigns"
              fontWeight="medium"
              _hover={{ textDecoration: 'none', bg: 'blue.700' }}
              p={2}
              borderRadius="md"
              textAlign="center"
            >
              Campaigns
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
          Welcome back, {user?.name || 'Freelancer'}!
        </Heading>
        <Text fontSize="md" color="gray.600" mb={10}>
          Manage your projects and campaigns easily from your dashboard.
        </Text>

        {/* Dashboard Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
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
            <StatNumber color="blue.600">12</StatNumber>
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
              Projects Assigned
            </StatLabel>
            <StatNumber color="green.500">5</StatNumber>
            <StatHelpText>In Progress</StatHelpText>
          </Stat>

          <Stat
            p={5}
            shadow="md"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: 'lg' }}
          >
            <StatLabel fontWeight="bold" color="gray.500">
              Earnings
            </StatLabel>
            <StatNumber color="purple.500">$1200</StatNumber>
            <StatHelpText>This Month</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default FreelancerDashboard;
