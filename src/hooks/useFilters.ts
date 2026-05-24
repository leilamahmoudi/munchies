'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchFilters } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

export function useFilters() {
  return useQuery({
    queryKey: queryKeys.filters,
    queryFn: fetchFilters,
  });
}
