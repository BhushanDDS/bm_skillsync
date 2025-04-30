import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../../contexts/ProjectContext';
import ProjectCardOpen from './ProjectCardOpen';
import { projectsApi } from '../../api/project';
import {
  Box,
  Spinner,
  SimpleGrid,
  Text,
  Input,
  Flex
} from '@chakra-ui/react';
function OpenProjects() {
  const { getOpenProjects } = useProjectContext();
  const navigate = useNavigate(); // Hook for navigation
  const [searchQuery, setSearchQuery] = useState('');

  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.getOpenProjects(),
  });
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <Spinner size="xl" color="blue.500" />;
  }

  if (isError) {
    return <p>Error loading projects: {error.message}</p>;
  }

  console.log(projects)
  const filteredProjects = projects?.data?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <Box>
      {/* Optional search bar inside OpenProjects */}
      <Box mb={6}>
        <Input
          placeholder="Filter projects..."
          value={searchQuery}
          onChange={handleSearchChange}
          size="md"
          bg="gray.100"
          _placeholder={{ color: 'gray.500' }}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 2px #3182ce' }}
        />
      </Box>

      {filteredProjects?.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No projects found matching your search criteria.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {filteredProjects.map((project) => (
            <ProjectCardOpen
              key={project.id}
              project={project}
              onClick={() => navigate(`/all/projectdetails/${project.id}`)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default OpenProjects;
