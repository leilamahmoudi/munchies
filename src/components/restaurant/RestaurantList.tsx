"use client";

import type { Restaurant } from "@/types";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantCardSkeleton } from "./RestaurantCardSkeleton";

type Props = {
  restaurants: Restaurant[];
  isLoading: boolean;
};

export function RestaurantList({ restaurants, isLoading }: Props) {
  return (
    <section>
      <h1
        className="text-[20px] lg:text-[40px] font-normal text-black leading-none mb-[20px] lg:mb-8"
        style={{ letterSpacing: "-0.5px" }}
      >
        Restaurant’s
      </h1>
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          style={{ gap: "17px" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div className="flex items-center justify-center py-24 text-gray-400 text-base">
          No restaurants match your filters.
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          style={{ gap: "17px" }}
        >
          {restaurants.map((restaurant, i) => (
            <div key={restaurant.id} className="fade-in" style={{ animationDelay: `${i * 40}ms` }}>
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
