import {useState}from 'react'

import { passwWordApi } from "../../api/password";
import {Box,Input,Button} from '@chakra-ui/react'
function ForgotPassword() {
    const [email, setEmail] = useState('');
  
    const handleSubmit = async () => {
        console.log(email)

        try {
          await passwWordApi.forgotPassword(email.trim());
          alert('If an account exists, a reset link has been sent');
        } catch (error) {
          alert(error.response?.data?.message || 'Error sending reset link');
        }
      };
  
    return (
      <Box>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubmit}>Send Reset Link</Button>
      </Box>
    );
  }

  export default ForgotPassword;