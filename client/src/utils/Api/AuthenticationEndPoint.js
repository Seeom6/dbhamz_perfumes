import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  getMe, GetUsers, Login, Signup } from './../Axios';
import { toast } from 'react-toastify';


  export const useGetMe = () => {
    return useQuery({
      queryKey: ["getme"],
      queryFn: () => getMe(),
    });
  };
  


export const useLogin = () => {
  const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (form)=> Login(form),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["protect"]})
        },
      });
  };
  
export const useSignup = () => {
  const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (form)=> Signup(form),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["protect"]})
        }
      });
  };