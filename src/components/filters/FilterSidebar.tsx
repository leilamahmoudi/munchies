"use client";

import type { Filter } from "@/types";
import { FilterButton } from "./FilterButton";

const DELIVERY_TIMES = ["0-10 min", "10-30 min", "30-60 min", "1 hour+"];
const PRICE_RANGES = ["$", "$$", "$$$", "$$$$"];

type Props = {
  filters: Filter[];
  selectedCategoryIds: Set<string>;
  selectedDeliveryTimes: Set<string>;
  selectedPriceRanges: Set<string>;
  onToggleCategory: (id: string) => void;
  onToggleDeliveryTime: (time: string) => void;
  onTogglePriceRange: (range: string) => void;
  isLoading: boolean;
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[12px] uppercase leading-none text-black/40"
      style={{ fontWeight: 590, letterSpacing: "-0.5px" }}
    >
      {children}
    </p>
  );
}

export function FilterSidebar({
  filters,
  selectedCategoryIds,
  selectedDeliveryTimes,
  selectedPriceRanges,
  onToggleCategory,
  onToggleDeliveryTime,
  onTogglePriceRange,
  isLoading,
}: Props) {
  return (
    <div
      className="bg-white flex flex-col gap-8"
      style={{
        borderRadius: "10px",
        border: "0.6px solid rgba(0,0,0,0.1)",
        padding: "24px",
        boxShadow:
          "-4px 2px 10px 0 rgba(0,0,0,0.01), -16px 9px 18px 0 rgba(0,0,0,0.01), -36px 20px 24px 0 rgba(0,0,0,0.01), -65px 36px 29px 0 rgba(0,0,0,0.005)",
      }}
    >
      <h2
        className="text-2xl font-normal text-black leading-none"
        style={{ letterSpacing: "-0.5px" }}
      >
        Filter
      </h2>

      <section className="flex flex-col gap-4">
        <SectionLabel>Food Category</SectionLabel>
        {/* One pill per row, vertical stack */}
        <div className="flex flex-col items-start gap-2">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: '31px', width: `${64 + (i % 3) * 20}px`, borderRadius: '8px' }}
                />
              ))
            : filters.map((filter) => (
                <FilterButton
                  key={filter.id}
                  label={filter.name}
                  isActive={selectedCategoryIds.has(filter.id)}
                  onToggle={() => onToggleCategory(filter.id)}
                />
              ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Delivery Time</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {DELIVERY_TIMES.map((time) => (
            <FilterButton
              key={time}
              label={time}
              isActive={selectedDeliveryTimes.has(time)}
              onToggle={() => onToggleDeliveryTime(time)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLabel>Price Range</SectionLabel>
        <div className="flex gap-2">
          {PRICE_RANGES.map((range) => (
            <FilterButton
              key={range}
              label={range}
              isActive={selectedPriceRanges.has(range)}
              onToggle={() => onTogglePriceRange(range)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
