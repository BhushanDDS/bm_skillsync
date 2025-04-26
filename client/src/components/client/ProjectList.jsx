// src/components/client/ProjectList.jsx

import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { useProjects } from '../../commons/useQuery';

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
    <div className="project-list">
      {projects.length === 0 ? (
        <div>No projects found. Post your first project!</div>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => navigate(`/projectdetails/${project.id}`)}
          />
        ))
      )}
    </div>
  );
};

export default ProjectList;
