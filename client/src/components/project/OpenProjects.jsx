import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../../contexts/ProjectContext';
import ProjectCardOpen from './ProjectCardOpen';
import { projectsApi } from '../../api/project';
import { Box, Spinner } from '@chakra-ui/react';

function OpenProjects() {
  const { getOpenProjects } = useProjectContext();
  const navigate = useNavigate(); // Hook for navigation
  const [searchQuery, setSearchQuery] = useState('');

  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.getOpenProjects(),
  });

  if (isLoading) {
    return <Spinner size="xl" color="blue.500" />;
  }

  if (isError) {
    return <p>Error loading projects: {error.message}</p>;
  }

  const filteredProjects = projects?.data?.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {filteredProjects?.length === 0 ? (
        <p>No projects found matching your search criteria.</p>
      ) : (
        filteredProjects.map((project) => (
          <ProjectCardOpen
            key={project.id}
            project={project}
            onClick={() => navigate(`/projectdetails/${project.id}`)} // Navigate to project details
          />
        ))
      )}
    </Box>
  );
}

export default OpenProjects;
