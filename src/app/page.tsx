'use client';

import { useState, useMemo } from 'react';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useFilters } from '@/hooks/useFilters';
import { usePriceRangeMap } from '@/hooks/usePriceRangeMap';
import { RestaurantList } from '@/components/restaurant/RestaurantList';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { FilterTopbar } from '@/components/filters/FilterTopbar';
import { MobileDeliveryFilter } from '@/components/filters/MobileDeliveryFilter';
import { AppShell } from '@/components/layout/AppShell';
import { DELIVERY_BUCKETS, toggleSet } from '@/lib/utils';

export default function Home() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(new Set());
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<Set<string>>(new Set());
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Set<string>>(new Set());

  const { data: restaurants = [], isLoading: restaurantsLoading } = useRestaurants();
  const { data: filters = [], isLoading: filtersLoading } = useFilters();

  const uniquePriceRangeIds = useMemo(
    () => [...new Set(restaurants.map((r) => r.price_range_id))],
    [restaurants]
  );
  const priceRangeMap = usePriceRangeMap(uniquePriceRangeIds);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      if (selectedCategoryIds.size > 0) {
        if (!r.filter_ids.some((fid) => selectedCategoryIds.has(fid))) return false;
      }
      if (selectedDeliveryTimes.size > 0) {
        const inBucket = [...selectedDeliveryTimes].some((bucket) => {
          const range = DELIVERY_BUCKETS[bucket];
          if (!range) return false;
          const [min, max] = range;
          return r.delivery_time_minutes >= min && r.delivery_time_minutes <= max;
        });
        if (!inBucket) return false;
      }
      if (selectedPriceRanges.size > 0) {
        const range = priceRangeMap.get(r.price_range_id);
        if (!range || !selectedPriceRanges.has(range)) return false;
      }
      return true;
    });
  }, [restaurants, selectedCategoryIds, selectedDeliveryTimes, selectedPriceRanges, priceRangeMap]);

  return (
    <AppShell
      sidebar={
        <FilterSidebar
          filters={filters}
          selectedCategoryIds={selectedCategoryIds}
          selectedDeliveryTimes={selectedDeliveryTimes}
          selectedPriceRanges={selectedPriceRanges}
          onToggleCategory={(id) => setSelectedCategoryIds((p) => toggleSet(p, id))}
          onToggleDeliveryTime={(t) => setSelectedDeliveryTimes((p) => toggleSet(p, t))}
          onTogglePriceRange={(r) => setSelectedPriceRanges((p) => toggleSet(p, r))}
          isLoading={filtersLoading}
        />
      }
    >
      <MobileDeliveryFilter
        selectedDeliveryTimes={selectedDeliveryTimes}
        onToggle={(t) => setSelectedDeliveryTimes((p) => toggleSet(p, t))}
      />
      <FilterTopbar
        filters={filters}
        selectedFilterIds={selectedCategoryIds}
        onToggle={(id) => setSelectedCategoryIds((p) => toggleSet(p, id))}
        isLoading={filtersLoading}
      />
      <RestaurantList
        restaurants={filteredRestaurants}
        isLoading={restaurantsLoading}
      />
    </AppShell>
  );
}
