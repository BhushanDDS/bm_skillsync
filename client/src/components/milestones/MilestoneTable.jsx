// client/src/components/milestones/MilestonesTable.jsx
import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Badge,
  Button,
  Link,
  Text,
  Box,
  useColorModeValue,
  Card
} from '@chakra-ui/react';
const MilestonesTable = ({ 
  milestones, 
  userRole, 
  onUploadFile, 
  onUpdateMilestone 
}) => {
    console.log(milestones)

  // Status options
  const statusOptions = ['pending', 'complete', 'paid'];
  
  // Type options
  const typeOptions = ['main', 'support'];
  
  // Handle status change



  const handleStatusChange = (milestoneId, newStatus) => {
    onUpdateMilestone(milestoneId, { status: newStatus });
  };
  
  // Handle type change
  const handleTypeChange = (milestoneId, newType) => {
    onUpdateMilestone(milestoneId, { type: newType });
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
return (
  <Card variant="outlined" borderRadius="xl" overflowX="auto" mt={6} p={4} boxShadow="md">
    <Table variant="simple" size="md">
      <Thead>
        <Tr>
          <Th color="blue.600">Title</Th>
          <Th color="blue.600">Due Date</Th>
          <Th color="blue.600">Status</Th>
          <Th color="blue.600">Type</Th>
          {userRole === 'client' && <Th color="blue.600">Upload Invoice</Th>}
          <Th color="blue.600">Download Invoice</Th>
          {userRole === 'freelancer' && <Th color="blue.600">Upload Deliverable</Th>}
          <Th color="blue.600">Download Deliverable</Th>
        </Tr>
      </Thead>
      <Tbody>
        {milestones.map(milestone => (
          <Tr key={milestone.id} _hover={{ bg: 'gray.50' }}>
            <Td fontWeight="medium">{milestone.title}</Td>
            <Td>{formatDate(milestone.dueDate)}</Td>

            {/* Status */}
            <Td>
              {userRole === 'client' ? (
                <Select
                  value={milestone.status}
                  onChange={(e) => handleStatusChange(milestone.id, e.target.value)}
                  size="sm"
                  borderColor="gray.200"
                  _focus={{ borderColor: 'blue.500' }}
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </Select>
              ) : (
                <Badge 
                  colorScheme={
                    milestone.status === 'completed' ? 'green' :
                    milestone.status === 'pending' ? 'orange' : 'blue'
                  }
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                </Badge>
              )}
            </Td>

            {/* Type */}
            <Td>
              {userRole === 'client' ? (
                <Select
                  value={milestone.type}
                  onChange={(e) => handleTypeChange(milestone.id, e.target.value)}
                  size="sm"
                  borderColor="gray.200"
                  _focus={{ borderColor: 'blue.500' }}
                >
                  {typeOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </Select>
              ) : (
                <Text>{milestone.type.charAt(0).toUpperCase() + milestone.type.slice(1)}</Text>
              )}
            </Td>

            {/* Client-only columns */}
            {userRole === 'client' && (
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => onUploadFile(milestone.id, 'invoice')}
                >
                  {milestone.invoiceFile ? 'Replace Invoice' : 'Upload Invoice'}
                </Button>
              </Td>
            )}

            {/* Download Invoice */}
            <Td>
              {milestone.invoiceFile ? (
                <Link
                  href={milestone.invoiceFile}
                  isExternal
                  color="blue.600"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Download
                </Link>
              ) : (
                <Text color="gray.400">Not available</Text>
              )}
            </Td>

            {/* Freelancer-only columns */}
            {userRole === 'freelancer' && (
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => onUploadFile(milestone.id, 'deliverable')}
                >
                  {milestone.deliverableFile ? 'Replace Deliverable' : 'Upload Deliverable'}
                </Button>
              </Td>
            )}

            {/* Download Deliverable */}
            <Td>
              {milestone.deliverableFile ? (
                <Link
                  href={milestone.deliverableFile}
                  isExternal
                  color="blue.600"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Download
                </Link>
              ) : (
                <Text color="gray.400">Not available</Text>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Card>
);
};

export default MilestonesTable;