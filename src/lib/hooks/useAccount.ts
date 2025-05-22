import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useContext } from "react";
import agent from "../../utils/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import type { RegisterSchema } from "../schemas/registerSchema";
import { StoreContext } from "../../lib/stores/store";

interface AuthResponse {
  jwt: string;
  refreshToken: string;
  token: string;
  status: string;
  firstName: string;
  lastName: string;
}

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { accountStore, userStore } = useContext(StoreContext);

  const loginUser = useMutation({
    mutationFn: async (credentials: LoginSchema) => {
      const response = await agent.post<AuthResponse>("/account/login", credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      accountStore.setTokens(data.jwt, data.refreshToken);
      userStore.setUser({
        token: data.token,
        status: data.status,
        firstName: data.firstName,
        lastName: data.lastName
      });
      
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Login successful");
      navigate('/dashboard')
    },
  });

  const registerUser = useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      const response  = await agent.post("account/register", credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success("Register successful");
       accountStore.setTokens(data.jwt, data.refreshToken);
      userStore.setUser({
        token: data.token,
        status: data.status,
        firstName: data.firstName,
        lastName: data.lastName
      });
      
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
         toast.success("Login successful");
      navigate('/dashboard')
    },
  });

  const logoutUser = () => {
    accountStore.logout();
    
    userStore.clearUser();
    
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
    
    navigate("/login");
    toast.info("You have been logged out");
  };

  return {
    loginUser,
    registerUser,
    logoutUser,
  };
};