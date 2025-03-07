import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteUser, GetUsers } from './../Axios';
import { toast } from 'react-toastify';


export const useCreateBrand = () => {
    return useMutation({
      mutationFn: async (formData) => CreateBrand(formData),
      onSuccess: () => {
        // Invalidate or refetch queries if needed
        toast.success("Brand created successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
  export const useGetUsers = () => {
    return useQuery({
      queryKey: ["Users"],
      queryFn: async () => await GetUsers(),
    });
  };
  

  export const useDeleteUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: DeleteUser, // Use the deleteProduct function
      onSuccess: () => {
        // Invalidate the products query to refetch the updated list
        queryClient.invalidateQueries(["brands"]);
        toast.success("Brand deleted successfully!"); // Show success toast
      },
      onError: (error) => {
        toast.error(error.message); // Display the error message in a toast
      },
    });
  };
  

  export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ brandId, formData }) => {
        return UpdateBrand(brandId, formData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["brands"]);
        toast.success("Brands Updated successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };