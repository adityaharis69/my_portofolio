import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";

export function useReviews(productId: number) {
  return useQuery({
    queryKey: [`/api/products/${productId}/reviews`],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}/reviews`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      return response.json() as Promise<Review[]>;
    },
    enabled: !!productId,
  });
}
