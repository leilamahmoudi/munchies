'use client';

import { FilterButton } from './FilterButton';

const DELIVERY_TIMES = ['0-10 min', '10-30 min', '30-60 min', '1 hour+'];

type Props = {
  selectedDeliveryTimes: Set<string>;
  onToggle: (time: string) => void;
};

export function MobileDeliveryFilter({ selectedDeliveryTimes, onToggle }: Props) {
  return (
    <div className="lg:hidden mb-[24px]">
      <p
        className="text-[12px] uppercase leading-none text-black/40 mb-[10px]"
        style={{ fontWeight: 590, letterSpacing: '-0.5px' }}
      >
        Delivery Time
      </p>
      <div className="flex gap-[10px] overflow-x-auto scrollbar-hide">
        {DELIVERY_TIMES.map((time) => (
          <FilterButton
            key={time}
            label={time}
            isActive={selectedDeliveryTimes.has(time)}
            onToggle={() => onToggle(time)}
          />
        ))}
      </div>
    </div>
  );
}
