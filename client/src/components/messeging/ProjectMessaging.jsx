import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, VStack } from "@chakra-ui/react";
import { messageService } from '../../services/messageService';
import { useUser } from '../../contexts/UserContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';


export const ProjectMessaging = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser(); // Get current user from auth context

  const numericProjectId = Number(projectId);
  useEffect(() => {
    loadMessages();
  }, [numericProjectId]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const data = await messageService.getProjectMessages(numericProjectId);
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content, attachment) => {
    try {
      setIsLoading(true);
      const newMessage = await messageService.sendMessage(content, numericProjectId, attachment)
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
    bg="gray.900"
    borderRadius="xl"
    p={6}
    boxShadow="0px 0px 20px rgba(34, 211, 238, 0.2)"
    border="1px solid"
    borderColor="cyan.500"
  >
    <Heading 
      fontSize="2xl" 
      mb={6}
      bgGradient="linear(to-r, cyan.400, blue.500)"
      bgClip="text"
    >
      PROJECT COMMUNICATION CHANNEL
    </Heading>
    
    {isLoading && messages.length === 0 ? (
      <VStack py={8}>
        <Spinner 
          size="xl" 
          color="cyan.500"
          thickness="4px"
          speed="0.65s"
        />
        <Heading size="sm" color="cyan.500">INITIALIZING...</Heading>
      </VStack>
    ) : (
      <>
        <MessageList messages={messages} currentUserId={user.id} />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </>
    )}
  </Box>
  );
};

