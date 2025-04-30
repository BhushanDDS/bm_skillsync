import { passwWordApi } from "../../api/password";
import { useState } from 'react';
import { Box, Input, Button, useToast, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const [password, setPassword] = useState('');
  const [token] = useState(new URLSearchParams(window.location.search).get('token'));
  const toast = useToast();
  const nav= useNavigate();
  const handleSubmit = async () => {
    try {
      await passwWordApi.resetPassword({ token, newPassword: password });

      toast({
        title: 'Success',
        description: 'Your password has been successfully reset.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      // Optionally, you can redirect the user to login page here
      nav('/login');

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid or expired token.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="0 auto" p={6} borderRadius="md" bg="gray.50">
      <Text fontSize="2xl" textAlign="center" mb={4}>Reset Your Password</Text>
      
      <Input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="lg"
        mb={4}
        borderRadius="full"
        borderColor="cyan.500"
        _focus={{
          borderColor: 'cyan.300',
          boxShadow: '0 0 0 1px cyan.300'
        }}
      />
      
      <Button
        onClick={handleSubmit}
        colorScheme="cyan"
        size="lg"
        width="100%"
        borderRadius="full"
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s"
      >
        Reset Password
      </Button>
    </Box>
  );
}

export default ResetPassword;
