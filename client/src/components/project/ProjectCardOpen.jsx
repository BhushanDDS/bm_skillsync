import { Box, Text, Button, Card, CardBody, CardHeader, Stack, Heading } from '@chakra-ui/react';

function ProjectCardOpen({ project, onClick }) {
  return (
    <Card
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb={4}
      bg="gray.50"
      _hover={{ shadow: 'lg', cursor: 'pointer', bg: 'gray.100' }}
      onClick={onClick}
    >
      <CardHeader>
        <Heading size="md" noOfLines={1} color="blue.600">{project.title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          <Text fontSize="sm" noOfLines={2}>{project.description}</Text>
          <Text fontWeight="bold">Budget: ${project.budget}</Text>
          <Text>Deadline: {new Date(project.deadline).toLocaleDateString()}</Text>
        </Stack>
      </CardBody>
      <Box p="4" textAlign="center">
        <Button colorScheme="blue" size="sm">View Details</Button>
      </Box>
    </Card>
  );
}

export default ProjectCardOpen;
