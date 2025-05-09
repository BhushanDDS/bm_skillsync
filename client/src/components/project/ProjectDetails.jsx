import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useProjectContext } from '../../contexts/ProjectContext';
import { Box, Heading, Text, Flex, Badge, Spinner, Stack, Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure } from '@chakra-ui/react';import GoToDashboardButton from '../GoToDashboard';
import { useUser } from '../../contexts/UserContext';
import CreateBid from '../bidding/CreateBid';
import GetAllBids from '../bidding/GetAllBids';
// import AddBid from '../freelancer/AddBid'; // Assuming this path
// import ShowBids from '../bid/ShowBids'; // Assuming this path

function ProjectDetails() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchProject } = useProjectContext();
  const { user } = useUser(); // Get logged-in user info
  const { projectId } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  });

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (!project?.data) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Text fontSize="xl" color="gray.500">No project found.</Text>
      </Flex>
    );
  }

  const p = project.data; // Shortcut
  return (
    <>
      <Box maxW="900px" mx="auto" p={8} bg="gray.50" rounded="lg" shadow="md" mt={6} mb={10}>
        <Heading textAlign="center" size="xl" mb={2} color="blue.700">
          {p.title}
        </Heading>
        <Text textAlign="center" fontSize="sm" color="gray.500" mb={4}>
          Viewing as <Badge colorScheme="blue" variant="subtle" fontSize="0.8em">{user.role}</Badge>
        </Text>

        <Stack spacing={6}>
          <Box>
            <Heading size="md" mb={2} color="blue.600">Description</Heading>
            <Text color="gray.700">{p.description}</Text>
          </Box>

          <Flex gap={8} flexWrap="wrap">
            <Box>
              <Heading size="sm" mb={1} color="blue.500">Budget</Heading>
              <Text fontWeight="semibold" color="gray.600">${p.budget}</Text>
            </Box>
            <Box>
              <Heading size="sm" mb={1} color="blue.500">Deadline</Heading>
              <Text fontWeight="semibold" color="gray.600">
                {p.deadline ? new Date(p.deadline).toLocaleDateString() : 'No deadline'}
              </Text>
            </Box>
          </Flex>

          <Box>
            <Heading size="md" mb={2} color="blue.600">Skills Required</Heading>
            {p.skills?.length > 0 ? (
              <Flex gap={2} wrap="wrap">
                {p.skills.map((skill, index) => (
                  <Badge key={index} colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="md">
                    {skill.name}
                  </Badge>
                ))}
              </Flex>
            ) : (
              <Text color="gray.500">No skills listed</Text>
            )}
          </Box>

          <Box>
            <Heading size="md" mb={2} color="blue.600">Status</Heading>
            <Badge
              colorScheme={p.status === 'open' ? 'green' : p.status === 'completed' ? 'red' : 'blue'}
              fontSize="1em"
              px={4}
              py={2}
              borderRadius="full"
            >
              {p.status}
            </Badge>
          </Box>
        </Stack>
      </Box>

      {/* --- Bidding Section --- */}
      <Box maxW="900px" mx="auto" p={6} bg="white" rounded="lg" shadow="sm" mb={10}>
        <Heading size="md" mb={4} color="blue.600">Bids for this Project</Heading>

        <Box mb={6}>
          <GetAllBids projectId={p.id} isClDb={false} />
        </Box>

       
{user.role?.includes('freelancer') && (
  <>
    <Divider my={4} />

    <Button colorScheme="blue" onClick={onOpen}>
      Submit a Bid
    </Button>

    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit Your Bid</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateBid projectId={p.id} />
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
)}
      </Box>

      <Flex justify="center" mt={10}>
        <GoToDashboardButton />
      </Flex>
    </>
  );
}

export default ProjectDetails;
