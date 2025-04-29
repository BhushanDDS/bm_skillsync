import React, { useEffect, useRef } from 'react';
import { 
    Flex, 
    Avatar, 
    Text, 
    Box, 
    Link, 
    Divider, 
    useColorModeValue 
  } from "@chakra-ui/react";
export const MessageList = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const bgUser = useColorModeValue("cyan.500", "cyan.600");
  const bgOther = useColorModeValue("cyan.500", "gray.700");
  return ( 
    <Box 
    h="400px" 
    overflowY="auto" 
    pr={4}
    bg="grey"
    css={{
      '&::-webkit-scrollbar': { width: '8px' },
      '&::-webkit-scrollbar-track': { bg: 'transparent' },
      '&::-webkit-scrollbar-thumb': { 
        bg: 'white',
        borderRadius: 'full'
      },
    }}
  >
    <Flex direction="column" gap={4}>
      {messages.map((message) => (
        <Flex
          key={message.id}
          align="flex-start"
          direction={message.sender.id === currentUserId ? "row-reverse" : "row"}
          gap={3}
        >
          <Avatar 
            size="sm" 
            name={message.sender.name} 
            bg="purple.500"
          />
          
          <Box
            p={4}
            borderRadius="xl"
            maxWidth="80%"
            position="relative"
            bg={message.sender.id === currentUserId ? bgUser : bgOther}
            _after={{
              content: '""',
              position: 'absolute',
              w: 3,
              h: 3,
              bg: message.sender.id === currentUserId ? bgUser : bgOther,
              transform: message.sender.id === currentUserId 
                ? 'rotate(45deg) translateX(50%)' 
                : 'rotate(45deg) translateX(-50%)',
              top: '20px',
              [message.sender.id === currentUserId ? 'right' : 'left']: '-5px'
            }}
          >
            <Text 
              fontSize="xs" 
              color={message.sender.id === currentUserId ? "whiteAlpha.800" : "gray.300"}
              mb={2}
            >
              {message.sender.name.toUpperCase()}
            </Text>
            
            <Text color={message.sender.id === currentUserId ? "white" : "gray.100"}>
              {message.content}
            </Text>
            
            {message.attachment && (
              <>
                <Divider my={3} borderColor="whiteAlpha.200" />
                <Link
                  href={message.attachment}
                  isExternal
                  color="cyan.300"
                  fontSize="sm"
                  _hover={{ textDecoration: 'none', opacity: 0.8 }}
                >
                  <Flex align="center" gap={2}>
                    <Box as="span" className="ph ph-paperclip" />
                    ENCRYPTED_ATTACHMENT.dat
                  </Flex>
                </Link>
              </>
            )}
            
            <Text
              fontSize="xs"
              color={message.sender.id === currentUserId ? "whiteAlpha.600" : "gray.500"}
              textAlign="right"
              mt={2}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  </Box>
  );
};

