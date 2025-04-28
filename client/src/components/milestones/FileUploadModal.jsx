// client/src/components/milestones/FileUploadModal.jsx
import React, { useState } from 'react';
import { CloudinaryService } from '../../services/cloudinarry.servie';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Flex,
  Text
} from '@chakra-ui/react';
const FileUploadModal = ({ milestoneId, fileType, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    try {
      setLoading(true);
      const result = await CloudinaryService.uploadFile(milestoneId, fileType, file);
      onSuccess(result.milestone);
      onClose();
    } catch (err) {
      setError('Failed to upload file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  
return (
  <Modal isOpen={true} onClose={onClose} isCentered>
    <ModalOverlay bg="blackAlpha.300" />
    <ModalContent borderRadius="xl" maxW="md">
      <ModalHeader borderBottom="1px" borderColor="gray.100">
        <Text fontSize="xl" color="blue.600">
          Upload {fileType === 'invoice' ? 'Invoice' : 'Deliverable'} File
        </Text>
      </ModalHeader>

      <ModalBody py={6}>
        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel color="gray.700">Select File</FormLabel>
            <Input
              type="file"
              id="file"
              p={1}
              border="none"
              _focus={{ boxShadow: 'none' }}
              onChange={handleFileChange}
              isDisabled={loading}
            />
          </FormControl>
        </form>
      </ModalBody>

      <ModalFooter borderTop="1px" borderColor="gray.100">
        <Flex w="full" justify="space-between">
          <Button
            onClick={onClose}
            colorScheme="gray"
            variant="outline"
            isDisabled={loading}
            _hover={{ bg: 'gray.50' }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            ml={3}
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Uploading"
            isDisabled={!file}
            _hover={{ bg: 'blue.600' }}
          >
            Upload
          </Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
};

export default FileUploadModal;