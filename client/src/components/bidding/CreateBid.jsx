import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bidsApi } from '../../api/bids.js';

const CreateBid = ({ projectId }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    message: ''
  });

  // Create bid mutation
  const createBidMutation = useMutation({
    mutationFn: (data) => {
      // Format data according to backend expectations
      const formattedData = {
        ...data,
        amount: Number(data.amount), // Convert to number
        duration: String(data.duration), // Ensure it's a string
        message: String(data.message)
      };
      return bidsApi.createBid(projectId, formattedData);
    },
    onSuccess: () => {
      // Invalidate and refetch project bids query when a new bid is created
      queryClient.invalidateQueries(['projectBids', projectId]);
      // Reset form
      setFormData({
        amount: '',
        duration: '',
        message: ''
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Store all as strings in the state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createBidMutation.mutate(formData);
  };

  return (
    <div className="create-bid-container">
      <h2>Place Your Bid</h2>
      
      {createBidMutation.isSuccess && (
        <div className="success-message">
          Bid created successfully!
        </div>
      )}
      
      {createBidMutation.isError && (
        <div className="error-message">
          {createBidMutation.error?.response?.data?.message || 'Failed to create bid. Please try again.'}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Bid Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="duration">Duration (days)</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="e.g., 7 days, 2 weeks"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Proposal Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe why you're the best fit for this project..."
          />
        </div>
        
        <button 
          type="submit" 
          disabled={createBidMutation.isPending}
          className="submit-bid-button"
        >
          {createBidMutation.isPending ? 'Submitting...' : 'Submit Bid'}
        </button>
      </form>
    </div>
  );
};

export default CreateBid;