import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { StoreContext } from "../../lib/stores/store";
import type { ILoginDto } from "../../types/ILoginDto";
import type { IUserDto } from "../../types/IUserDto";
import agent from "../../utils/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import type { RegisterSchema } from "../schemas/registerSchema";



export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {  userStore } = useContext(StoreContext);

  const loginUser = useMutation({
    mutationFn: async (credentials: LoginSchema) => {
 const [v2Response, v1Response] = await Promise.all([
      agent.post<ILoginDto>("v2/account/login", credentials),
      agent.post<IUserDto>("v1/account/login", credentials)
    ]);

    return {
      tokens: v2Response.data,
      userInfo: v1Response.data
    };
  },
  onSuccess: async (data) => {

    console.log(data)
    // Set tokens
    // accountStore.setTokens(data.tokens.jwt, data.tokens.refreshToken);
    
    // Set user info
     userStore.setUser(data.userInfo.token, data.userInfo.status, data.userInfo.firstName, data.userInfo.lastName);

    await queryClient.invalidateQueries({
      queryKey: ["user"],
    });
    
    toast.success("Login successful");
    navigate("/dashboard");
  },
});

  const registerUser = useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      const response  = await agent.post("/v1account/register", credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success("Register successful");
      //  accountStore.setTokens(data.jwt, data.refreshToken);
       userStore.setUser(data.userInfo.token, data.userInfo.status, data.userInfo.firstName, data.userInfo.lastName);
      
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
         toast.success("Login successful");
      navigate('/dashboard')
    },
  });

  const logoutUser = () => {
    // accountStore.logout();
    
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