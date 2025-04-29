import React, { useState } from 'react';
import { 
    Input, 
    Button, 
    FormControl, 
    FormLabel, 
    HStack, 
    Text ,
    Box
  } from "@chakra-ui/react";
export const MessageInput = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, attachment);
      setMessage('');
      setAttachment(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // In a real application, you would upload the file here
      // and set the attachment to the returned URL
      // For this example, we'll just use a placeholder
      setAttachment('file-placeholder');
    }
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit} mt={6}>
    <HStack mb={4}>
      <input
        type="file"
        id="file-input"
        hidden
        onChange={handleFileChange}
      />
      <FormLabel 
        htmlFor="file-input"
        m={0}
        px={4}
        py={2}
        borderRadius="md"
        bg="gray.700"
        _hover={{ bg: 'gray.600', cursor: 'pointer' }}
      >
        <HStack>
          <Box className="ph ph-upload-simple" color="cyan.400" />
          <Text fontSize="sm">UPLOAD</Text>
        </HStack>
      </FormLabel>
      {attachment && (
        <Text fontSize="sm" color="cyan.300">
          {attachment.name}
        </Text>
      )}
    </HStack>
    
    <HStack gap={3}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="ENTER TRANSMISSION..."
        borderRadius="full"
        borderColor="cyan.500"
        _focus={{
          borderColor: 'cyan.300',
          boxShadow: '0 0 0 1px cyan.300'
        }}
        color="white"
        disabled={isLoading}
      />
      
      <Button
        type="submit"
        colorScheme="cyan"
        borderRadius="full"
        px={8}
        isLoading={isLoading}
        loadingText="TRANSMITTING"
        leftIcon={<Box className="ph ph-paper-plane-tilt" />}
        isDisabled={!message.trim()}
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s"
      >
        SEND
      </Button>
    </HStack>
  </FormControl>  );
};
