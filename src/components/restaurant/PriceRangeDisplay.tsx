'use client';

import { usePriceRange } from '@/hooks/usePriceRange';

type Props = { priceRangeId: string };

export function PriceRangeDisplay({ priceRangeId }: Props) {
  const { data } = usePriceRange(priceRangeId);
  return (
    <span className="text-sm text-gray-500 font-medium">
      {data?.range ?? '--'}
    </span>
  );
}
