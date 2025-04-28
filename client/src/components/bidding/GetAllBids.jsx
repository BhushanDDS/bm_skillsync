import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bidsApi } from '../../api/bids';
import { useNavigate } from 'react-router-dom';
import { Spinner, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

export const getBids = (projectId) => bidsApi.getAllBidsByProjectId(projectId);

function GetAllBids({ projectId, isClDb }) {
  const navigate = useNavigate();

  const { data: bids, isLoading } = useQuery({
    queryKey: ['getBids', projectId],
    queryFn: () => getBids(projectId),
  });

  if (isLoading) return <Spinner />;

//   if (!bids?.length) return <div>No bids found.</div>;

  console.log(bids?.data?.bids);
  return (
    <Table variant="simple" size="md">
      <Thead>
        <Tr>
          <Th>Freelancer</Th>
          <Th>Amount</Th>
          <Th>Duration</Th>
          <Th>Message</Th>
          {isClDb && <Th>Assign</Th>} {/* Conditional Column */}
        </Tr>
      </Thead>
      <Tbody>
        {bids?.data?.bids.map((bid) => (
          <Tr key={bid.id}>
            <Td>{bid.freelancer?.name || 'Unknown'}</Td>
            <Td>{bid.amount}</Td>
            <Td>{bid.duration} days</Td>
            <Td>{bid.message}</Td>
            {isClDb && (
              <Td>
                <Button 
                  colorScheme="blue" 
                  size="sm"
                  onClick={() => navigate(`/get-single-bid/${bid.id}`)}
                >
                  Assign
                </Button>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default GetAllBids;
