'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPriceRange } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

export function usePriceRange(priceRangeId: string) {
  return useQuery({
    queryKey: queryKeys.priceRange(priceRangeId),
    queryFn: () => fetchPriceRange(priceRangeId),
    staleTime: Infinity,
  });
}
