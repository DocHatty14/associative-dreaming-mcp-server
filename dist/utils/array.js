/**
 * Array utility functions - eliminates duplicate filtering/sorting patterns
 */
/**
 * Filter items by a numeric range on a property
 */
export function filterByRange(items, property, min, max) {
    return items.filter(item => {
        const value = Number(item[property]);
        return value >= min && value <= max;
    });
}
/**
 * Filter items by distance property within a range
 */
export function filterByDistance(items, minDistance, maxDistance) {
    return items.filter(item => item.distance >= minDistance && item.distance <= maxDistance);
}
/**
 * Sort items by a numeric property
 */
export function sortByProperty(items, property, descending = false) {
    return [...items].sort((a, b) => {
        const aVal = Number(a[property]) || 0;
        const bVal = Number(b[property]) || 0;
        return descending ? bVal - aVal : aVal - bVal;
    });
}
/**
 * Get the top N items by a property
 */
export function topN(items, property, n, descending = true) {
    return sortByProperty(items, property, descending).slice(0, n);
}
/**
 * Group items by a string property
 */
export function groupBy(items, property) {
    const groups = new Map();
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
export function countBy(items, property) {
    const counts = {};
    for (const item of items) {
        const key = String(item[property]);
        counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
}
/**
 * Find unique values of a property
 */
export function uniqueValues(items, property) {
    return [...new Set(items.map(item => item[property]))];
}
/**
 * Partition array into two arrays based on predicate
 */
export function partition(items, predicate) {
    const pass = [];
    const fail = [];
    for (const item of items) {
        if (predicate(item)) {
            pass.push(item);
        }
        else {
            fail.push(item);
        }
    }
    return [pass, fail];
}
/**
 * Find first item matching predicate, with fallback
 */
export function findOrDefault(items, predicate, defaultValue) {
    return items.find(predicate) ?? defaultValue;
}
