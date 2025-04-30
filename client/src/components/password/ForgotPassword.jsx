import { useState } from 'react';
import { passwWordApi } from "../../api/password";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await passwWordApi.forgotPassword(email.trim());
      toast({
        title: 'Reset Link Sent',
        description: 'If an account exists, a reset link has been sent to your email.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Error sending reset link.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <VStack spacing={6}>
        <Heading size="lg" color="blue.500" textAlign="center">
          Forgot Password
        </Heading>

        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor="blue.500"
            bg={useColorModeValue('gray.50', 'gray.700')}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          width="full"
          onClick={handleSubmit}
          _hover={{ bg: 'blue.600' }}
        >
          Send Reset Link
        </Button>
      </VStack>
    </Box>
  );
}

export default ForgotPassword;
