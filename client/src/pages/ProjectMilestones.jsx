// client/src/pages/client/ProjectMilestones.jsx or client/src/pages/freelancer/ProjectMilestones.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MilestoneService } from '../services/MilestoneService';
import FileUploadModal from '../components/milestones/FileUploadModal';
import AddMilestoneForm from '../components/milestones/AddMilestoneForm';
import MilestonesTable from '../components/milestones/MilestoneTable';
import {
  Heading,
  Button,
  Flex
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const ProjectMilestones = ({projectId,role}) => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadModal, setUploadModal] = useState({
    show: false,
    milestoneId: null,
    fileType: null
  });
  
  // Get user role from context or state management
  // For this example, let's assume we're getting it as a prop or from a context
  const userRole = 'client'; // or 'freelancer'
  
  useEffect(() => {
    fetchMilestones();
  }, [projectId]);
  
  const fetchMilestones = async () => {
    try {
      setLoading(true);
      const data = await MilestoneService.getProjectMilestones(projectId);
      if (Array.isArray(data)) {
        setMilestones(data);
      } else {
        setMilestones([]);  // Fallback to an empty array if the response is not as expected
      }
    } catch (err) {
      setError('Failed to load milestones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleAddMilestone = () => {
    setShowAddForm(true);
  };
  
  const handleMilestoneCreated = (newMilestone) => {
    setMilestones([...milestones, newMilestone]);
    setShowAddForm(false);
  };
  
  const handleUploadFile = (milestoneId, fileType) => {
    setUploadModal({
      show: true,
      milestoneId,
      fileType
    });
  };
  
  const handleFileUploaded = (updatedMilestone) => {
    setMilestones(milestones.map(m => 
      m.id === updatedMilestone.id ? updatedMilestone : m
    ));
  };
  
  const handleUpdateMilestone = async (milestoneId, updateData) => {
    try {
      const updatedMilestone = await MilestoneService.updateMilestone(milestoneId, updateData);
      setMilestones(milestones.map(m => 
        m.id === updatedMilestone.id ? updatedMilestone : m
      ));
    } catch (err) {
      console.error('Failed to update milestone:', err);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading milestones...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  
  return (
    <div className="project-milestones-container">
      <div className="header">
      {/* <Heading as="h2" size="xl" color="blue.600">
        Project Milestones
      </Heading>
        {role === 'client' && (
          <Button
          colorScheme="blue"
          onClick={handleAddMilestone}
          _hover={{ bg: 'blue.600' }}
        >
          Add New Milestone
        </Button>
        )} */}
       <Flex 
  justify="space-between" 
  align="center" 
  mb={8}
  bg="white"
  p={6}
  borderRadius="xl"
  boxShadow="sm"
  borderWidth="1px"
  borderColor="gray.100"
>
  <Heading as="h2" size="xl" color="blue.600">
    Project Milestones
  </Heading>

  <Flex gap={4}>
    {role === 'client' && (
      <Button
        colorScheme="blue"
        onClick={handleAddMilestone}
        _hover={{ bg: 'blue.600' }}
      >
        Add New Milestone
      </Button>
    )}
    
    <Button
      as={RouterLink}
      to={`/chat/${projectId}`}  // Make sure projectId is available in your component
      colorScheme="blue"
      variant="outline"
      _hover={{ 
        bg: 'blue.50',
        textDecoration: 'none' 
      }}
    >
      Have a Chat
    </Button>
  </Flex>
</Flex>
      </div>
      {milestones.length === 0 ? (
        <div className="no-milestones">
          No milestones found for this project.
          {role === 'client' && ' Click the button above to add one.'}
        </div>
      ) : (
        <MilestonesTable
          milestones={milestones}
          userRole={role}
          onUploadFile={handleUploadFile}
          onUpdateMilestone={handleUpdateMilestone}
        />
      )}
      
      {showAddForm && (
        <div className="modal-overlay">
          <AddMilestoneForm
            projectId={projectId}
            onSuccess={handleMilestoneCreated}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
      
      {uploadModal.show && (
        <FileUploadModal
          milestoneId={uploadModal.milestoneId}
          fileType={uploadModal.fileType}
          onClose={() => setUploadModal({ show: false, milestoneId: null, fileType: null })}
          onSuccess={handleFileUploaded}
        />
      )}
    </div>
  );
};

export default ProjectMilestones;