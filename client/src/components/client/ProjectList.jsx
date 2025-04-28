// src/components/client/ProjectList.jsx

import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { useProjects } from '../../commons/useQuery';
import { Box, Text, VStack, SimpleGrid } from '@chakra-ui/react';
const ProjectList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useProjects(); // <-- call your hook

  if (isLoading) {
    return <div>Loading Projects...</div>;
  }

  if (isError) {
    console.error('Error loading projects:', error);
    return <div>Failed to load projects. Please try again later.</div>;
  }

  
  const projects = data?.data || [];
  return (
    <Box px={6} py={4} bg="gray.50" minH="100vh">
      {projects.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="xl" fontWeight="semibold" color="gray.500">
            No projects found.
          </Text>
          <Text fontSize="md" color="gray.400" mt={2}>
            Post your first project and start collaborating!
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/client/projectdetails/${project.id}`)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );};

export default ProjectList;
