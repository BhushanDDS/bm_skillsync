import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';
import OpenProjects from '../components/project/OpenProjects';

function Home() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      
      <Flex 
        direction="column" 
        align="center" 
        textAlign="center" 
        maxW="3xl" 
        mx="auto" 
        mt={20}
        p={8}
      >
        <Heading 
          as="h1" 
          size="2xl" 
          mb={6} 
          color="blue.600"
          lineHeight="1.2"
        >
          Connect with Skilled Professionals 
          <Text as="span" color="gray.700"> or </Text> 
          Find Your Next Project
        </Heading>
        
        <Text fontSize="xl" color="gray.600" mb={8}>
          SkillSync bridges the gap between talented freelancers and businesses 
          looking for top-tier talent.
        </Text>

        <Flex gap={4}>
          <Button 
            as={Link}
            to="/register"
            colorScheme="blue" 
            size="lg"
            _hover={{ bg: 'blue.600' }}
          >
            Join as Client
          </Button>
          <Button 
            as={Link}
            to="/register"
            variant="outline" 
            colorScheme="blue"
            size="lg"
            _hover={{ bg: 'blue.50' }}
          >
            Work as Freelancer
          </Button>
        </Flex>
      </Flex>

    </Box>
  );
}

export default Home;