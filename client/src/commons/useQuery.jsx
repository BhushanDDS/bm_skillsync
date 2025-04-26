import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../api/project';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],  // query key
    queryFn: projectsApi.getAllProjects ,// API call function
  });
}