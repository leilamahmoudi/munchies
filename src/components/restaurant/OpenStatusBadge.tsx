'use client';

import { useOpenStatus } from '@/hooks/useOpenStatus';

type Props = { restaurantId: string };

export function OpenStatusBadge({ restaurantId }: Props) {
  const { data, isLoading } = useOpenStatus(restaurantId);

  if (isLoading || !data) {
    return (
      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
        &nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    );
  }

  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        backgroundColor: data.is_open ? 'var(--color-open)' : 'var(--color-closed)',
        color: '#fff',
      }}
    >
      {data.is_open ? 'Open' : 'Closed'}
    </span>
  );
}
