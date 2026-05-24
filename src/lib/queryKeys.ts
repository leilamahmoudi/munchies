export const queryKeys = {
  restaurants: ['restaurants'] as const,
  filters: ['filters'] as const,
  openStatus: (id: string) => ['openStatus', id] as const,
  priceRange: (id: string) => ['priceRange', id] as const,
};
