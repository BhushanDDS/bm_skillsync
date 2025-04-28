import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function GoToDashboardButton() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGoToDashboard = () => {
    if (user.role?.includes('client')) {
      navigate('/client/dashboard');
    } else if (user.role?.includes('freelancer')) {
      navigate('/freelancer/dashboard');
    } else {
      navigate('/'); // fallback if somehow role is missing
    }
  };

  return (
    <Button
      onClick={handleGoToDashboard}
      colorScheme="blue"
      variant="outline"
      mb={6}
    >
      Go to Dashboard
    </Button>
  );
}

export default GoToDashboardButton;
