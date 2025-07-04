import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertNewsletter } from "@shared/schema";

export function useNewsletter() {
  const queryClient = useQueryClient();

  const subscribeToNewsletter = useMutation({
    mutationFn: async (data: InsertNewsletter) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter/count"] });
    },
  });

  return {
    subscribeToNewsletter: subscribeToNewsletter.mutateAsync,
    isPending: subscribeToNewsletter.isPending,
  };
}
