import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IGpsSession } from "../../types/IGpsSession";
import type { IGpsSessionType } from "../../types/IGpsSessionType";
import agent from "../../utils/agent";
import type { IGpsLocation } from "../../types/IGpsLocation";
import { toast } from "react-toastify";
export const useGpsSessions = (id?: string) => {
  const queryClient = useQueryClient();

  // Fetch all sessions
  const {
    data: sessions,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useQuery({
    queryKey: ["gps-sessions"],
    queryFn: async () => {
      const response = await agent.get<IGpsSession[]>("/GpsSessions");
      return response.data;
    },
  });

  // Fetch single session (for editing)
  const {
    data: session,
    isLoading: sessionLoading,
    error: sessionError,
  } = useQuery({
    queryKey: ["gps-session", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await agent.get<IGpsSession>(`/GpsSessions/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  // Fetch session types
  const {
    data: sessionTypes,
    isLoading: sessionTypesLoading,
    error: sessionTypesError,
  } = useQuery({
    queryKey: ["gps-session-types"],
    queryFn: async () => {
      const response = await agent.get<IGpsSessionType[]>("/GpsSessionTypes");
      return response.data;
    },
  });

  // Create session
  const createSession = useMutation({
    mutationFn: async (data: Partial<IGpsSession>) => {
      const response = await agent.post<IGpsSession>("/GpsSessions", data);
      console.log(response.data)
      return response.data;
    },
    onSuccess: (newSession) => {
      queryClient.invalidateQueries({ queryKey: ["gps-sessions"] });
      toast.success("Session created successfully!");
    },
    onError: (error: any) => {
      console.error("Create session error:", error);
      toast.error(error.response?.data?.message || "Failed to create session");
    },
  });

  // Update session
  const updateSession = useMutation({
    mutationFn: async (data: Partial<IGpsSession> & { id: string }) => {
      const response = await agent.put<IGpsSession>(
        `/GpsSessions/${data.id}`,
        data
      );
      return response.data;
    },
    onSuccess: (updatedSession) => {
      queryClient.invalidateQueries({ queryKey: ["gps-sessions"] });
      queryClient.invalidateQueries({
        queryKey: ["gps-session", updatedSession.id],
      });
      toast.success("Session updated successfully!");
    },
    onError: (error: any) => {
      console.error("Update session error:", error);
      toast.error(error.response?.data?.message || "Failed to update session");
    },
  });

  // Delete session
  const deleteSession = useMutation({
    mutationFn: async (sessionId: string) => {
      await agent.delete(`/GpsSessions/${sessionId}`);
      return sessionId;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["gps-sessions"] });
      queryClient.removeQueries({ queryKey: ["gps-session", deletedId] });
      toast.success("Session deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Delete session error:", error);
      toast.error(error.response?.data?.message || "Failed to delete session");
    },
  });

  const { data: sessionLocation } = useQuery({
    queryKey: ["sessionsLocation", id],
    queryFn: async () => {
      const response = await agent.get<IGpsLocation[]>(
        `/GpsLocations/Session/${id}`
      );
      return response.data;
    },
    enabled: !!id,
  });

  return {
    sessions,
    session,
    createSession,
    updateSession,
    deleteSession,
    sessionTypes,
    sessionLocation,
    sessionsLoading,
    sessionLoading,
    sessionTypesLoading,
    sessionsError,
    sessionError,
    sessionTypesError,
  };
};
