// File: src/context/ProjectContext.js
import React, { createContext, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const { mutateAsync: createProject, isPending: isCreating } = useMutation({
    mutationFn: (projectData) => projectsApi.createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
    },
  });

  const { mutateAsync: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => projectsApi.updateProject(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
      }
    },
  });

  const { mutateAsync: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: (id) => projectsApi.deleteProject(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
      if (variables) {
        queryClient.invalidateQueries({ queryKey: ['project', variables] });
      }
    },
  });

  const { mutateAsync: assignFreelancer, isPending: isAssigning } = useMutation({
    mutationFn: ({ projectId, freelancerId }) => projectsApi.assignFreelancer(projectId, freelancerId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['openProjects'] });
      if (variables?.projectId) {
        queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      }
    },
  });

  const fetchProject = (id) => projectsApi.getProject(id)

  const getOpenProjects=projectsApi.getOpenProjects();

  const value = {
    isCreating,
    isUpdating,
    isDeleting,
    isAssigning,
    createProject,
    updateProject,
    deleteProject,
    assignFreelancer,
    fetchProject,
    getOpenProjects
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
