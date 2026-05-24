'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchRestaurants } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

export function useRestaurants() {
  return useQuery({
    queryKey: queryKeys.restaurants,
    queryFn: fetchRestaurants,
  });
}
