import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../utils/agent";
import type { IGpsSession } from "../types/IGpsSession";
import type { IGpsSessionType } from "../types/IGpsSessionType";

export const useGpsSessions = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: sessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await agent.get<IGpsSession[]>("/GpsSessions");
      return response.data;
    },
  });

  const { data: session } = useQuery({
    queryKey: ["sessions", id],
    queryFn: async () => {
      const response = await agent.get<IGpsSession>(`/GpsSessions/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createSession = useMutation({
    mutationFn: async (session: IGpsSession) => {
      const response = await agent.post(`/GpsSessions`, session);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
  });

  const updateSession = useMutation({
    mutationFn: async (id: string) => {
      await agent.put(`/GpsSessions/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
  });

  const deleteSession = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/GpsSessions/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["sessions"],
      });
    },
  });

  const { data: sessionTypes } = useQuery({
    queryKey: ["sessionTypes"],
    queryFn: async () => {
      const response = await agent.get<IGpsSessionType[]>("/GpsSessionTypes");
      return response.data;
    },
  });

  return {
    sessions,
    session,
    createSession,
    updateSession,
    deleteSession,
    sessionTypes,
  };
};
