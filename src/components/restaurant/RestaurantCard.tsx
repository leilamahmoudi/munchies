'use client';

import Image from 'next/image';
import type { Restaurant } from '@/types';
import { resolveImageUrl } from '@/lib/api';
import { useOpenStatus } from '@/hooks/useOpenStatus';

type Props = { restaurant: Restaurant };

function formatDeliveryTime(minutes: number): string {
  if (minutes >= 60) return '1 hour';
  return `${minutes} min`;
}

export function RestaurantCard({ restaurant }: Props) {
  const { data: openStatus, isLoading: statusLoading } = useOpenStatus(restaurant.id);
  const isOpen = openStatus?.is_open;
  const isClosed = isOpen === false;

  return (
    <div
      className="relative bg-white overflow-hidden flex flex-col"
      style={{
        height: '202px',
        borderRadius: '8px',
        border: '0.6px solid rgba(0,0,0,0.1)',
        padding: '16px',
        justifyContent: 'space-between',
        boxShadow:
          '-4px 2px 10px 0 rgba(0,0,0,0.01), -16px 9px 18px 0 rgba(0,0,0,0.01), -36px 20px 24px 0 rgba(0,0,0,0.01)',
      }}
    >
      {/* Chips row */}
      <div className="flex items-center z-10" style={{ gap: '8px', height: '28px' }}>
        {statusLoading ? (
          /* Skeleton chips while open status loads — prevents layout shift */
          <>
            <div className="skeleton" style={{ width: '63px', height: '28px', borderRadius: '88px' }} />
            <div className="skeleton" style={{ width: '64px', height: '28px', borderRadius: '88px' }} />
          </>
        ) : isOpen !== undefined && (
          <div className="fade-in flex items-center" style={{ gap: '8px' }}>
            {/* Open / Closed pill */}
            <div
              className="flex items-center shrink-0"
              style={{
                height: '28px',
                borderRadius: '88px',
                border: '0.6px solid rgba(0,0,0,0.1)',
                padding: '8px 12px 8px 10px',
                gap: '4px',
                backgroundColor: '#fff',
              }}
            >
              <span
                className="rounded-full shrink-0"
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: isClosed ? '#1A1A1A' : '#4CAF50',
                }}
              />
              <span className="text-xs font-normal" style={{ color: '#000000' }}>
                {isClosed ? 'Closed' : 'Open'}
              </span>
            </div>

            {/* Delivery time pill */}
            {!isClosed && (
              <div
                className="flex items-center shrink-0"
                style={{
                  height: '28px',
                  borderRadius: '88px',
                  border: '0.6px solid rgba(0,0,0,0.1)',
                  padding: '8px 12px 8px 10px',
                  backgroundColor: '#fff',
                }}
              >
                <span className="text-xs font-normal" style={{ color: '#000000' }}>
                  {formatDeliveryTime(restaurant.delivery_time_minutes)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Food image — overflows top-right, faded when closed */}
      <div
        style={{
          position: 'absolute',
          top: '-28px',
          right: '-30px',
          width: '140px',
          height: '140px',
          opacity: isClosed ? 0.2 : 1,
        }}
      >
        <Image
          src={resolveImageUrl(restaurant.image_url)}
          alt={restaurant.name}
          fill
          className="object-contain"
          sizes="140px"
        />
      </div>

      {/* "Opens tomorrow at 12 pm" — centered, only for closed */}
      {isClosed && (
        <div className="flex justify-center z-10">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '28px',
              borderRadius: '4px',
              border: '0.6px solid rgba(0,0,0,0.1)',
              padding: '8px 12px 8px 10px',
              gap: '4px',
              backgroundColor: '#FAFAFA',
              boxShadow: '-4px 2px 10px 0 rgba(0,0,0,0.01)',
            }}
          >
            <span
              className="text-[12px] font-normal leading-none"
              style={{ color: '#000000', letterSpacing: '-0.5px' }}
            >
              Opens tomorrow at 12 pm
            </span>
          </div>
        </div>
      )}

      {/* CTA row — faded when closed */}
      <div
        className="flex items-center justify-between z-10"
        style={{ height: '32px', opacity: isClosed ? 0.2 : 1 }}
      >
        <span
          className="font-normal min-w-0 pr-3"
          style={{
            fontSize: '24px',
            color: '#000000',
            letterSpacing: '-0.5px',
            lineHeight: '1',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            paddingBottom: '2px',
          }}
        >
          {restaurant.name}
        </span>
        <button
          type="button"
          aria-label={`Go to ${restaurant.name}`}
          className="flex items-center justify-center shrink-0 rounded-full transition-colors"
          style={{ width: '32px', height: '32px', backgroundColor: '#00703A' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
