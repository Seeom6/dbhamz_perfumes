// hooks/useOffers.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  createOffer, 
  deleteOffer, 
  getOffer, 
  getOffers, 
  toggleOfferStatus, 
  updateOffer 
} from '../Axios';
import { toast } from 'react-toastify';
import HandleError from '../GlobalError';

export const useAllOffers = (filters = {}) => {
  return useQuery({
    queryKey: ["offers", filters],
    queryFn: async () => await getOffers(filters),
  });
};

export const useSingleOffer = (id) => {
  return useQuery({
    queryKey: ["offers", id],
    queryFn: async () => await getOffer(id),
    enabled: !!id, // Only fetch if id exists
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => createOffer(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
    onError: (error) => {
      toast.error(HandleError(error));
    },
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      return updateOffer(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
    onError: (error) => {
      toast.error(HandleError(error));
    },
  });
};

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOffer,
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
    },
    onError: (error) => {
      toast.error(HandleError(error));
    },
  });
};

export const useToggleOfferStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleOfferStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["offers"]);
      toast.success("Offer status updated successfully!");
    },
    onError: (error) => {
      toast.error(HandleError(error));
    },
  });
};