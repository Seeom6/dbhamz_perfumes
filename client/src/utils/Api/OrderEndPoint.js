import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
    ApplyCoupon,
    checkOut,
    CreateCoupon,
    CreateOrder,
    DeleteCoupon,
    GetCoupon,
    GetOrder
} from "../Axios"


export const useGetCoupon = () => {
    return useQuery({
      queryKey: ["coupons"],
      queryFn: () => GetCoupon(),
    });
  };
  
export const useCreateCoupon = () => {
  return useMutation({
    mutationFn: async (formData) => await CreateCoupon(formData),
  });
};


export const useApplyCoupon = () => {
    return useMutation({
      mutationFn: async ({ id,coupon}) => await ApplyCoupon({ id,coupon}),
    });
  };
  
  export const useDeleteCoupon = () => {
    return useMutation({
      mutationFn: async (id) => await DeleteCoupon(id),
    });
  };

export const useCreateOrder = () => {
    return useMutation({
      mutationFn: async (cart) => CreateOrder(cart),
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  
  export const useGetOrder = (id) => {
    return useQuery({
      queryKey: ["orderData"],
      queryFn: () => GetOrder(id),
    });
  };
  
  export const useCheckOut = () => {
    return useMutation({
      mutationFn: async ({id , shippingData}) => checkOut({id , shippingData}),
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };