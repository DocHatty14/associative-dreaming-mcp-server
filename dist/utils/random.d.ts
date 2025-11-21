/**
 * Random utility functions - eliminates duplicate random selection patterns across tools
 */
/**
 * Select a random element from an array
 */
export declare function randomElement<T>(array: T[]): T | undefined;
/**
 * Select a random element from an array, throwing if empty
 */
export declare function randomElementRequired<T>(array: T[], errorMessage?: string): T;
/**
 * Generate a random integer between min (inclusive) and max (inclusive)
 */
export declare function randomInt(min: number, max: number): number;
/**
 * Generate a random float between min and max
 */
export declare function randomFloat(min: number, max: number): number;
/**
 * Weighted random selection from an array of items with weights
 */
export declare function weightedSelect<T>(items: T[], weights: number[]): T | undefined;
/**
 * Weighted random selection using item property as weight
 */
export declare function weightedSelectByProperty<T>(items: T[], weightProperty: keyof T, invert?: boolean): T | undefined;
/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export declare function shuffle<T>(array: T[]): T[];
/**
 * Sample n random elements from an array without replacement
 */
export declare function sample<T>(array: T[], n: number): T[];
/**
 * Check probability - returns true with given probability (0.0-1.0)
 */
export declare function probability(p: number): boolean;
