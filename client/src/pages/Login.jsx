// src/pages/Login.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';

import { 
  Box, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Alert, 
  AlertIcon,
  VStack,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useUser();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  
  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      
      const user = response.data.user;
      toast({
        title: 'Success',
        description: 'Login Succesfull',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      if (user.role.includes('client')) {
        navigate('/client/dashboard');
      } else if (user.role.includes('freelancer')) {
        navigate('/freelancer/dashboard');
      }
    } catch (err) {
      
      toast({
        title: 'Error',
        description: 'Login Failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setError(err.response?.data?.message || '  failed');
    }
  };
  return (
    <Box 
      maxW="md" 
      mx="auto" 
      mt={20} 
      p={8} 
      bg="white" 
      borderRadius="xl" 
      boxShadow="lg"
    >
      <Heading 
        as="h1" 
        size="xl" 
        mb={8} 
        textAlign="center" 
        color="blue.600"
      >
        Login to SkillSync
      </Heading>
  
      {error && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
  
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel color="gray.700">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              focusBorderColor="blue.500"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <Alert status="error" mt={2} fontSize="sm" borderRadius="md">
                <AlertIcon />
                {errors.email.message}
              </Alert>
            )}
          </FormControl>
  
          <FormControl isInvalid={!!errors.password}>
            <FormLabel color="gray.700">Password</FormLabel>
            <Input
              id="password"
              type="password"
              focusBorderColor="blue.500"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && (
              <Alert status="error" mt={2} fontSize="sm" borderRadius="md">
                <AlertIcon />
                {errors.password.message}
              </Alert>
            )}
          </FormControl>
  
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            mt={4}
            _hover={{ bg: 'blue.600' }}
          >
            Login
          </Button>
          <Link to={'/forget/password'}>Forget Password</Link>
        </VStack>
      </form>
    </Box>
  );
};