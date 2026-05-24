"use client";

import Image from "next/image";
import type { Filter } from "@/types";
import { resolveImageUrl } from "@/lib/api";

type Props = {
  filters: Filter[];
  selectedFilterIds: Set<string>;
  onToggle: (id: string) => void;
  isLoading: boolean;
};

function FilterCategoryCard({
  filter,
  isActive,
  onToggle,
}: {
  filter: Filter;
  isActive: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(filter.id)}
      className="relative bg-white shrink-0 transition-all w-[160px]"
      style={{
        height: "80px",
        borderRadius: "8px",
        border: isActive ? "2px solid #111827" : "0.6px solid rgba(0,0,0,0.1)",
      }}
    >
      {/* Category name — top: 16px, left: 12px */}
      <span
        className="absolute text-[14px] font-normal leading-none text-black"
        style={{ top: "16px", left: "12px", letterSpacing: "-0.5px" }}
      >
        {filter.name}
      </span>
      {/* Food image — 80×80, left: 90px (overflows right edge) */}
      <div
        className="absolute"
        style={{ left: "90px", top: "0", width: "80px", height: "80px" }}
      >
        <Image
          src={resolveImageUrl(filter.image_url)}
          alt=""
          fill
          className="object-contain"
          sizes="80px"
        />
      </div>
    </button>
  );
}

export function FilterTopbar({
  filters,
  selectedFilterIds,
  onToggle,
  isLoading,
}: Props) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-[10px] mb-[24px] w-[calc(100%_+_24px)] lg:w-[calc(100%_+_126px)]">
      {isLoading
        ? Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="skeleton shrink-0"
              style={{ width: "160px", height: "80px", borderRadius: "8px" }}
            />
          ))
        : filters.map((filter) => (
            <FilterCategoryCard
              key={filter.id}
              filter={filter}
              isActive={selectedFilterIds.has(filter.id)}
              onToggle={onToggle}
            />
          ))}
    </div>
  );
}
