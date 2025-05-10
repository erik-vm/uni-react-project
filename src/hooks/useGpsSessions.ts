import { useQuery } from "@tanstack/react-query";
import agent from "../utils/agent";
import type { IGpsSession } from "../types/IGpsSession";

export const useGpsSessions = () => {
  // const queryClient = useQueryClient();

  const { data: sessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await agent.get<IGpsSession[]>("/GpsSessions");
      return response.data;
    },
  });

  return {
    sessions,
  };
};
