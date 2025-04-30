// client/src/components/milestones/AddMilestoneForm.jsx
import React, { useState } from 'react';
import { MilestoneService } from '../../services/MilestoneService';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Alert,
  AlertIcon,
  Flex,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';
const AddMilestoneForm = ({ projectId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    type: 'main'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.dueDate) {
      setError('Title and due date are required');
      return;
    }
    
    try {
      setLoading(true);
      const milestoneData = {
        ...formData,
        projectId
      };
      
      const result = await MilestoneService.createMilestone(milestoneData);
      onSuccess(result);
    } catch (err) {
      setError('Failed to create milestone');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
return (
  <Box
    maxW="md"
    p={6}
    bg="white"
    borderRadius="xl"
    boxShadow="lg"
    borderWidth="1px"
    borderColor="gray.100"
  >
    <Heading as="h3" size="lg" mb={6} color="blue.600">
      Add New Milestone
    </Heading>

    {error && (
      <Alert status="error" mb={6} borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    )}

    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={6}>
        <FormControl>
          <FormLabel color="gray.700">Title</FormLabel>
          <Input
            type="text" 
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            focusBorderColor="blue.500"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel color="gray.700">Due Date</FormLabel>
          <Input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            focusBorderColor="blue.500"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel color="gray.700">Type</FormLabel>
          <Select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            focusBorderColor="blue.500"
          >
            <option value="main">Main</option>
            <option value="support">Support</option>
          </Select>
        </FormControl>

        <Flex gap={4} mt={4} justifyContent="flex-end">
          <Button
            type="button"
            onClick={onCancel}
            isDisabled={loading}
            colorScheme="gray"
            variant="outline"
            _hover={{ bg: 'gray.50' }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            loadingText="Creating..."
            _hover={{ bg: 'blue.600' }}
          >
            Add Milestone
          </Button>
        </Flex>
      </Flex>
    </form>
  </Box>
);
};

export default AddMilestoneForm;