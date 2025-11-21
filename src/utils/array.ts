/**
 * Array utility functions - eliminates duplicate filtering/sorting patterns
 */

/**
 * Filter items by a numeric range on a property
 */
export function filterByRange<T>(
  items: T[],
  property: keyof T,
  min: number,
  max: number
): T[] {
  return items.filter(item => {
    const value = Number(item[property]);
    return value >= min && value <= max;
  });
}

/**
 * Filter items by distance property within a range
 */
export function filterByDistance<T extends { distance: number }>(
  items: T[],
  minDistance: number,
  maxDistance: number
): T[] {
  return items.filter(item => item.distance >= minDistance && item.distance <= maxDistance);
}

/**
 * Sort items by a numeric property
 */
export function sortByProperty<T>(
  items: T[],
  property: keyof T,
  descending = false
): T[] {
  return [...items].sort((a, b) => {
    const aVal = Number(a[property]) || 0;
    const bVal = Number(b[property]) || 0;
    return descending ? bVal - aVal : aVal - bVal;
  });
}

/**
 * Get the top N items by a property
 */
export function topN<T>(
  items: T[],
  property: keyof T,
  n: number,
  descending = true
): T[] {
  return sortByProperty(items, property, descending).slice(0, n);
}

/**
 * Group items by a string property
 */
export function groupBy<T>(items: T[], property: keyof T): Map<string, T[]> {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = String(item[property]);
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
  }

  return groups;
}

/**
 * Count items by a property value
 */
export function countBy<T>(items: T[], property: keyof T): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const item of items) {
    const key = String(item[property]);
    counts[key] = (counts[key] || 0) + 1;
  }

  return counts;
}

/**
 * Find unique values of a property
 */
export function uniqueValues<T, K extends keyof T>(items: T[], property: K): T[K][] {
  return [...new Set(items.map(item => item[property]))];
}

/**
 * Partition array into two arrays based on predicate
 */
export function partition<T>(
  items: T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];

  for (const item of items) {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }

  return [pass, fail];
}

/**
 * Find first item matching predicate, with fallback
 */
export function findOrDefault<T>(
  items: T[],
  predicate: (item: T) => boolean,
  defaultValue: T
): T {
  return items.find(predicate) ?? defaultValue;
}
