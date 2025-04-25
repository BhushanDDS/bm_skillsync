import { Flex, Box, Link, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <Flex 
      as="nav" 
      bg="white" 
      p={4} 
      boxShadow="sm" 
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading 
        as={RouterLink} 
        to="/" 
        size="lg" 
        color="blue.600"
        _hover={{ textDecoration: 'none' }}
      >
        SkillSync
      </Heading>
      
      <Flex gap={6} alignItems="center">
        <Link 
          as={RouterLink} 
          to="/login" 
          color="gray.700"
          _hover={{ color: 'blue.600', textDecoration: 'underline' }}
          fontWeight="500"
        >
          Login
        </Link>
        <Button
          as={RouterLink}
          to="/register"
          colorScheme="blue"
          size="sm"
          _hover={{ bg: 'blue.600' }}
        >
          Get Started
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;