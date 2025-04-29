import { passwWordApi } from "../../api/password";
import {useState} from 'react'
import {Box,Input,Button} from '@chakra-ui/react'

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [token] = useState(new URLSearchParams(window.location.search).get('token'));
  
    const handleSubmit = async () => {
      try {
        await passwWordApi.resetPassword( { token, newPassword: password });
        alert('Password reset successful!');
        // Redirect to login
      } catch (error) {
        alert('Invalid or expired token');
      }
    };
  
    return (
      <Box>
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Reset Password</Button>
      </Box>
    );
  }


  export default ResetPassword