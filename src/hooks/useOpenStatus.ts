'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchOpenStatus } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

export function useOpenStatus(restaurantId: string) {
  return useQuery({
    queryKey: queryKeys.openStatus(restaurantId),
    queryFn: () => fetchOpenStatus(restaurantId),
    staleTime: 30_000,
  });
}
