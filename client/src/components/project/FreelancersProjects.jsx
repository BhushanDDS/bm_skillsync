import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../../api/project';
import { useNavigate } from 'react-router-dom'; // <<< added

function FreelancersProjects() {

  const navigate = useNavigate(); // <<< added

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.getAllProjectsFreelancer(),
  });

  if (isLoading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading projects...</p>
  }

  if (!projects?.data || projects.data.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No projects found.</p>
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Available Projects</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {projects.data.map((project) => (
          <div
            key={project.id}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/projectdetails/${project.id}`)} // <<< added
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2 style={{ marginBottom: '10px', color: '#2B6CB0' }}>{project.title}</h2>
            <p style={{ color: '#4A5568', marginBottom: '15px' }}>
              {project.description.length > 100 ? project.description.slice(0, 100) + '...' : project.description}
            </p>
            <div style={{ marginTop: 'auto', fontWeight: 'bold', color: '#2F855A' }}>
              Budget: ${project.budget}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FreelancersProjects
