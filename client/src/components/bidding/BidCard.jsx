import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bidsApi } from '../../api/bids';
import { projectsApi } from '../../api/project';
import { Spinner, Box, Text, Button, useToast } from '@chakra-ui/react';

const getSingleBid = (bidId) => bidsApi.getBid(bidId);

function BidCard() {

  const nav=useNavigate();
  const { bidId } = useParams();
  const queryClient = useQueryClient();
  const toast = useToast();

  // Query to fetch bid details
  const { data: bid, isLoading, error } = useQuery({
    queryKey: ['getBid', bidId],
    queryFn: () => getSingleBid(bidId),
  });

  // Mutation for assigning freelancer
  const { mutate: assignFreelancer, isPending: isAssigning } = useMutation({
    mutationFn: ({ projectId, freelancerId }) => 
      projectsApi.assignFreelancer(projectId, freelancerId),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['openProjects'] });
      // if (bid?.data?.bid?.project?.id) {
      //   queryClient.invalidateQueries({ 
      //     queryKey: ['project', bid.data.bid.project.id] 
      //   });
      // }
      toast({
        title: "Freelancer assigned successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      nav('/client/dashboard');
      

    },
    onError: (error) => {
      toast({
        title: "Failed to assign freelancer",
        description: error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !bid) {
    return <Text color="red.500">Error fetching bid details.</Text>;
  }

  const handleAssignFreelancer = () => {
    if (bid?.data?.bid?.project?.id && bid?.data?.bid?.freelancer?.id) {
      assignFreelancer({
        projectId: bid.data.bid.project.id,
        freelancerId: bid.data.bid.freelancer.id
      });
    } else {
      toast({
        title: "Missing information",
        description: "Project ID or Freelancer ID is missing",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // The Bid Details
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="2xl" fontWeight="bold">Bid Details</Text>
      <Text mt={2}><strong>Freelancer:</strong> {bid.data.bid.freelancer?.name || 'Unknown'}</Text>
      <Text><strong>Amount:</strong> {bid.data.bid.amount || " "}</Text>
      <Text><strong>Duration:</strong> {bid.data.bid.duration} days</Text>
      <Text><strong>Message:</strong> {bid.data.bid.message}</Text>
     
      <Button 
        onClick={handleAssignFreelancer} 
        colorScheme="blue" 
        mt={4}
        isLoading={isAssigning}
        loadingText="Assigning..."
      >
        Assign Freelancer
      </Button>
    </Box>
  );
}

export default BidCard;