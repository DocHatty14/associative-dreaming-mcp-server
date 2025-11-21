/**
 * Array utility functions - eliminates duplicate filtering/sorting patterns
 */
/**
 * Filter items by a numeric range on a property
 */
export declare function filterByRange<T>(items: T[], property: keyof T, min: number, max: number): T[];
/**
 * Filter items by distance property within a range
 */
export declare function filterByDistance<T extends {
    distance: number;
}>(items: T[], minDistance: number, maxDistance: number): T[];
/**
 * Sort items by a numeric property
 */
export declare function sortByProperty<T>(items: T[], property: keyof T, descending?: boolean): T[];
/**
 * Get the top N items by a property
 */
export declare function topN<T>(items: T[], property: keyof T, n: number, descending?: boolean): T[];
/**
 * Group items by a string property
 */
export declare function groupBy<T>(items: T[], property: keyof T): Map<string, T[]>;
/**
 * Count items by a property value
 */
export declare function countBy<T>(items: T[], property: keyof T): Record<string, number>;
/**
 * Find unique values of a property
 */
export declare function uniqueValues<T, K extends keyof T>(items: T[], property: K): T[K][];
/**
 * Partition array into two arrays based on predicate
 */
export declare function partition<T>(items: T[], predicate: (item: T) => boolean): [T[], T[]];
/**
 * Find first item matching predicate, with fallback
 */
export declare function findOrDefault<T>(items: T[], predicate: (item: T) => boolean, defaultValue: T): T;
