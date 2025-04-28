import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bidsApi } from '../../api/bids.js';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
const CreateBid = ({ projectId }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    message: ''
  });

  // Create bid mutation
  const createBidMutation = useMutation({
    mutationFn: (data) => {
      // Format data according to backend expectations
      const formattedData = {
        ...data,
        amount: Number(data.amount), // Convert to number
        duration: String(data.duration), // Ensure it's a string
        message: String(data.message)
      };
      return bidsApi.createBid(projectId, formattedData);
    },
    onSuccess: () => {
      // Invalidate and refetch project bids query when a new bid is created
      queryClient.invalidateQueries(['projectBids', projectId]);
      // Reset form
      setFormData({
        amount: '',
        duration: '',
        message: ''
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Store all as strings in the state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createBidMutation.mutate(formData);
  };
  return (
    <Box
      maxW="xl"
      mx="auto"
      p={8}
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Heading as="h2" size="xl" mb={8} color="blue.600" textAlign="center">
        Place Your Bid
      </Heading>
  
      {createBidMutation.isSuccess && (
        <Alert status="success" mb={6} borderRadius="md">
          <AlertIcon />
          Bid created successfully!
        </Alert>
      )}
  
      {createBidMutation.isError && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          {createBidMutation.error?.response?.data?.message || 'Failed to create bid. Please try again.'}
        </Alert>
      )}
  
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel color="gray.700">Bid Amount ($)</FormLabel>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              focusBorderColor="blue.500"
              required
              min="1"
            />
          </FormControl>
  
          <FormControl>
            <FormLabel color="gray.700">Duration (days)</FormLabel>
            <Input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              focusBorderColor="blue.500"
              required
              placeholder="e.g., 7 days, 2 weeks"
            />
          </FormControl>
  
          <FormControl>
            <FormLabel color="gray.700">Proposal Message</FormLabel>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              focusBorderColor="blue.500"
              required
              rows={4}
              placeholder="Describe why you're the best fit for this project..."
            />
          </FormControl>
  
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            size="lg"
            isLoading={createBidMutation.isPending}
            loadingText="Submitting..."
            _hover={{ bg: 'blue.600' }}
          >
            Submit Bid
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateBid;