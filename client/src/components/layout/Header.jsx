import { Flex, Box, Link, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

function Header() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    if (user.role?.includes('client')) {
      navigate('/client/dashboard');
    } else if (user.role?.includes('freelancer')) {
      navigate('/freelancer/dashboard');
    } else {
      navigate('/'); // fallback if somehow role is missing
    }
  };

  const handleViewProjectsNavigation = () => {
    navigate('/view-projects'); // Navigate to the ViewProjects page
  };

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
        {user ? (
          <>
            <Button
              onClick={handleDashboardNavigation}
              colorScheme="blue"
              size="sm"
              _hover={{ bg: 'blue.600' }}
            >
              Go to Dashboard
            </Button>
            {/* Add View Projects button */}
            <Button
              onClick={handleViewProjectsNavigation}
              colorScheme="blue"
              size="sm"
              _hover={{ bg: 'blue.600' }}
            >
              View Projects
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
