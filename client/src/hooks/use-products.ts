import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

interface UseProductsOptions {
  category?: string;
  search?: string;
}

export function useProducts(options?: UseProductsOptions) {
  const params = new URLSearchParams();
  if (options?.category && options.category !== "All") {
    params.append("category", options.category);
  }
  if (options?.search) {
    params.append("search", options.search);
  }

  const queryString = params.toString();
  const url = `/api/products${queryString ? `?${queryString}` : ""}`;

  return useQuery({
    queryKey: ["/api/products", options?.category, options?.search],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json() as Promise<Product[]>;
    },
  });
}
