import { describe, it, expect } from 'vitest';
import { toggleSet, DELIVERY_BUCKETS } from '../utils';

describe('toggleSet', () => {
  it('adds a value that is not in the set', () => {
    const result = toggleSet(new Set<string>(), 'a');
    expect(result.has('a')).toBe(true);
    expect(result.size).toBe(1);
  });

  it('removes a value that is already in the set', () => {
    const result = toggleSet(new Set(['a']), 'a');
    expect(result.has('a')).toBe(false);
    expect(result.size).toBe(0);
  });

  it('does not mutate the original set', () => {
    const original = new Set(['a']);
    toggleSet(original, 'b');
    expect(original.size).toBe(1);
  });

  it('preserves other values when adding', () => {
    const result = toggleSet(new Set(['a', 'b']), 'c');
    expect(result.has('a')).toBe(true);
    expect(result.has('b')).toBe(true);
    expect(result.has('c')).toBe(true);
  });
});

describe('DELIVERY_BUCKETS', () => {
  it('10-30 min bucket covers 15 minutes', () => {
    const [min, max] = DELIVERY_BUCKETS['10-30 min'];
    expect(15 >= min && 15 <= max).toBe(true);
  });

  it('10-30 min bucket does not cover 5 minutes', () => {
    const [min, max] = DELIVERY_BUCKETS['10-30 min'];
    expect(5 >= min && 5 <= max).toBe(false);
  });

  it('1 hour+ bucket covers any time above 60 minutes', () => {
    const [min, max] = DELIVERY_BUCKETS['1 hour+'];
    expect(120 >= min && 120 <= max).toBe(true);
  });
});
