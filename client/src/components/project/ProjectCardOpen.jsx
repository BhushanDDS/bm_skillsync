import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Heading,
  Badge,
  Divider,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
function ProjectCardOpen({ project, onClick }) {
  
    return (
      <Card
        maxW="sm"
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        bg="white"
        boxShadow="sm"
        transition="0.2s ease-in-out"
        _hover={{ boxShadow: 'md', transform: 'translateY(-4px)', bg: 'gray.50' }}
        onClick={onClick}
      >
        <CardHeader pb={0}>
          <Heading
            size="md"
            noOfLines={1}
            color="blue.600"
            fontWeight="semibold"
          >
            {project.title}
          </Heading>
          <Badge mt={2} colorScheme="blue" variant="subtle" fontSize="0.7em">
            Open
          </Badge>
        </CardHeader>
  
        <CardBody>
          <Stack spacing={3}>
            <Text fontSize="sm" color="gray.700" noOfLines={3}>
              {project.description}
            </Text>
  
            <Divider borderColor="gray.200" />
  
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Budget
                </Text>
                <Text fontWeight="medium" color="gray.800">
                  ${project.budget}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.500">
                  Deadline
                </Text>
                <Flex align="center" gap={1}>
                  <Icon as={CalendarIcon} boxSize={3} color="gray.500" />
                  <Text fontSize="sm" color="gray.800">
                    {new Date(project.deadline).toLocaleDateString()}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Stack>
        </CardBody>
  
        <Box px={4} pb={4} mt={2}>
          <Button
            colorScheme="blue"
            size="sm"
            width="100%"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation(); // Prevents card onClick
              onClick();
            }}
          >
            View Details
          </Button>
        </Box>
      </Card>
    );  
}

export default ProjectCardOpen;
