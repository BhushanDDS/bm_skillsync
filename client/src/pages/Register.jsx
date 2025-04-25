// src/pages/Register.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

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
  RadioGroup,
  Radio,
  Stack,
  Text
} from '@chakra-ui/react';
export const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register: registerUser, login } = useUser();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Register the user
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      });
      navigate('/login');

      // // Login after successful registration
      // await login({
      //   email: data.email,
      //   password: data.password
      // });
      
      // // Redirect based on role
      // if (data.role === 'client') {
      //   navigate('/client/dashboard');
      // } else {
      //   navigate('/freelancer/dashboard');
      // }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
      Create Your SkillSync Account
    </Heading>

    {error && (
      <Alert status="error" mb={6} borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    )}

    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel color="gray.700">Full Name</FormLabel>
          <Input
            id="name"
            focusBorderColor="blue.500"
            {...register('name', { 
              required: 'Name is required' 
            })}
          />
          {errors.name && (
            <Alert status="error" mt={2} fontSize="sm" borderRadius="md">
              <AlertIcon />
              {errors.name.message}
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel color="gray.700">Email</FormLabel>
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

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel color="gray.700">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            focusBorderColor="blue.500"
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <Alert status="error" mt={2} fontSize="sm" borderRadius="md">
              <AlertIcon />
              {errors.confirmPassword.message}
            </Alert>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.role}>
          <FormLabel color="gray.700">I want to:</FormLabel>
          <RadioGroup>
            <Stack direction="row" spacing={8}>
              <Radio 
                value="client" 
                colorScheme="blue"
                {...register('role', { required: 'Role is required' })}
              >
                <Text color="gray.700">Hire a Freelancer</Text>
              </Radio>
              <Radio 
                value="freelancer" 
                colorScheme="blue"
                {...register('role', { required: 'Role is required' })}
              >
                <Text color="gray.700">Work as a Freelancer</Text>
              </Radio>
            </Stack>
          </RadioGroup>
          {errors.role && (
            <Alert status="error" mt={2} fontSize="sm" borderRadius="md">
              <AlertIcon />
              {errors.role.message}
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
          Create Account
        </Button>
      </VStack>
    </form>
  </Box>
);
};