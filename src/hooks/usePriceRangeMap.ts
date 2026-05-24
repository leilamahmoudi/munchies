'use client';

import { useQueries } from '@tanstack/react-query';
import { fetchPriceRange } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';

export function usePriceRangeMap(ids: string[]): Map<string, string> {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: queryKeys.priceRange(id),
      queryFn: () => fetchPriceRange(id),
      staleTime: Infinity,
    })),
  });

  const map = new Map<string, string>();
  ids.forEach((id, i) => {
    const data = results[i]?.data;
    if (data) map.set(id, data.range);
  });
  return map;
}
