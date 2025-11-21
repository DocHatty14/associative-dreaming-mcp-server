/**
 * Random utility functions - eliminates duplicate random selection patterns across tools
 */

/**
 * Select a random element from an array
 */
export function randomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Select a random element from an array, throwing if empty
 */
export function randomElementRequired<T>(array: T[], errorMessage = "Cannot select from empty array"): T {
  if (array.length === 0) throw new Error(errorMessage);
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random integer between min (inclusive) and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random float between min and max
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Weighted random selection from an array of items with weights
 */
export function weightedSelect<T>(items: T[], weights: number[]): T | undefined {
  if (items.length === 0 || weights.length !== items.length) return undefined;

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  if (totalWeight === 0) return randomElement(items);

  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }

  return items[items.length - 1];
}

/**
 * Weighted random selection using item property as weight
 */
export function weightedSelectByProperty<T>(
  items: T[],
  weightProperty: keyof T,
  invert = false
): T | undefined {
  if (items.length === 0) return undefined;

  const weights = items.map(item => {
    const w = Number(item[weightProperty]) || 0;
    return invert ? (1 - w) : w;
  });

  return weightedSelect(items, weights);
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Sample n random elements from an array without replacement
 */
export function sample<T>(array: T[], n: number): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(n, array.length));
}

/**
 * Check probability - returns true with given probability (0.0-1.0)
 */
export function probability(p: number): boolean {
  return Math.random() < p;
}
