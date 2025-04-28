import { useNavigate } from 'react-router-dom';
import { Box, Flex, Text, Button, VStack, Badge } from '@chakra-ui/react';

import { useProjectContext } from '../../contexts/ProjectContext'

const ProjectCard = ({ project, onClick }) => {
  const navigate = useNavigate();
  const {  deleteProject } = useProjectContext();

  const statusColor = project.status === 'open' ? 'text-green-500' : 'text-yellow-500';

  const handleUpdate = (e) => {
    navigate(`/updateproject/${project.id}`); // You can handle the update page
  };

  const handleDelete = (e) => {
    // Call delete mutation here or send to a modal confirmation if you want
    console.log('Delete project', project.id);
    deleteProject(project.id);
    alert("prject deleted")


  };

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderLeft="4px solid"
      borderLeftColor="blue.400"
      borderRadius="md"
      p={5}
      boxShadow="sm"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)', transition: 'all 0.2s' }}
      cursor="pointer"
      onClick={onClick}
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <VStack align="start" spacing={2} maxW="70%">
          <Text fontSize="lg" fontWeight="bold" color="gray.700" noOfLines={1}>
            {project.title}
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={2}>
            {project.description}
          </Text>
          <Badge colorScheme={statusColor} fontSize="0.8em" mt={1}>
            {project.status}
          </Badge>
        </VStack>

        <Flex direction="column" gap={2}>
          <Button
            size="xs"
            variant="ghost"
            colorScheme="blue"
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate();
            }}
          >
            Update
          </Button>
          <Button
            size="xs"
            variant="ghost"
            colorScheme="red"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
