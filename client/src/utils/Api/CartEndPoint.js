import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AddCart, ApplyCoupon, CreateOrder, deleteProductInCart, GetCart, GetOnCart, UpdateCartQuantity } from "../Axios";

export const useAddCart = () => {
  return useMutation({
    mutationFn: async ({ productId, quantity }) =>
      await AddCart(productId, quantity),
  });
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => await GetCart(),
  });
};

export const useGetOneCart = (cartId) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn:  () =>  GetOnCart(cartId),
  });
};


export const useUpdateCartQuantity=()=>{
  return useMutation({
    mutationFn: async ({productId , quantity})=> await UpdateCartQuantity(productId ,quantity)
  })
}

export const useDeleteProductInCart =()=>{
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId) => deleteProductInCart(productId), // Use the deleteProduct function
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("تم حذف المنتج بنجاح"); // Show success toast
    },
    onError: (error) => {
      toast.error(error.message); // Display the error message in a toast
    },
  });
}

export const useApplyCoupon = ()=>{
  return useMutation({
    mutationFn:async (coupon)=> await ApplyCoupon(coupon)
  })
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async ({ cartId, shippingData }) =>
      await CreateOrder(cartId, shippingData),
  });
};