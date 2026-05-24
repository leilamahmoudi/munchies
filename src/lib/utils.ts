export const DELIVERY_BUCKETS: Record<string, [number, number]> = {
  '0-10 min': [0, 10],
  '10-30 min': [11, 30],
  '30-60 min': [31, 60],
  '1 hour+': [61, Infinity],
};

export function toggleSet<T>(prev: Set<T>, value: T): Set<T> {
  const next = new Set(prev);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}
