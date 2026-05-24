import type { Restaurant, Filter, OpenStatus, PriceRange, RestaurantsResponse, FiltersResponse } from '@/types';

export const BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';

export function resolveImageUrl(relativePath: string): string {
  return `${BASE_URL}${relativePath}`;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const data = await apiFetch<RestaurantsResponse>('/api/restaurants');
  return data.restaurants;
}

export async function fetchFilters(): Promise<Filter[]> {
  const data = await apiFetch<FiltersResponse>('/api/filter');
  return data.filters;
}

export async function fetchOpenStatus(id: string): Promise<OpenStatus> {
  return apiFetch<OpenStatus>(`/api/open/${id}`);
}

export async function fetchPriceRange(id: string): Promise<PriceRange> {
  return apiFetch<PriceRange>(`/api/price-range/${id}`);
}
