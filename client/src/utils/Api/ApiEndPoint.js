import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getSimilarProduct,
  UpdateProduct,
} from "../Axios";
import { toast } from "react-toastify";


export const useAllProducts = (filters = {}) => {
  return useQuery({
    queryKey: ["products", filters], // Include filters in the query key
    queryFn: async () => await getProducts(filters),
  });
};
export const useGetProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => await getProduct(id),
  });
};

export const useSimilarProduct = (brandId) => {
  return useQuery({
    queryKey: ["similarProduct"],
    queryFn: async () => await getSimilarProduct(brandId),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct, // Use the deleteProduct function
    onSuccess: () => {
      // Invalidate the products query to refetch the updated list
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted successfully!"); // Show success toast
    },
    onError: (error) => {
      toast.error(error.message); // Display the error message in a toast
    },
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (formData) => CreateProduct(formData),
    onSuccess: () => {
      // Invalidate or refetch queries if needed
      toast.success("Product created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, formData }) => {
      return UpdateProduct(productId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product Updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};