// File: src/context/ProjectContext.js
import React, { createContext, useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '../api/project';

const ProjectContext = createContext();

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const queryClient = useQueryClient();

  // // Fetch open projects
  // const { data: openProjects, isLoading: isLoadingProjects } = useQuery({
  //   queryKey: ['openProjects'],
  //   queryFn: projectsApi.getOpenProjects,
  //   enabled: true, // Auto-fetch when component mounts
  // });

  // Create a project
  const {
    mutateAsync: createProject,
    isPending: isCreating,
  } = useMutation({
    mutationFn: (projectData) => projectsApi.createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
    },
  });

  // Update a project
  const {
    mutateAsync: updateProject,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: ({ id, data }) => projectsApi.updateProject(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
      if (variables && variables.id) {
        queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
      }
    },
  });

  // Delete a project
  const {
    mutateAsync: deleteProject,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: (id) => projectsApi.deleteProject(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
      if (currentProject && currentProject.id === variables) {
        setCurrentProject(null);
      }
    },
  });



  // Assign a freelancer
  const {
    mutateAsync: assignFreelancer,
    isPending: isAssigning,
  } = useMutation({
    mutationFn: ({ projectId, freelancerId }) => projectsApi.assignFreelancer(projectId, freelancerId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
      if (variables && variables.projectId) {
        queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      }
    },
  });

  // Helper to fetch single project manually
  const fetchProject = async (id) => {
    const response = await projectsApi.getProject(id);
    setCurrentProject(response.data);
    return response.data;
  };

  const value = {
    currentProject,
    
    isCreating,
    isUpdating,
    isDeleting,
    isAssigning,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
    assignFreelancer,
    setCurrentProject,

  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
