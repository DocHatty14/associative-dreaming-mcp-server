/**
 * Random utility functions - eliminates duplicate random selection patterns across tools
 */
/**
 * Select a random element from an array
 */
export function randomElement(array) {
    if (array.length === 0)
        return undefined;
    return array[Math.floor(Math.random() * array.length)];
}
/**
 * Select a random element from an array, throwing if empty
 */
export function randomElementRequired(array, errorMessage = "Cannot select from empty array") {
    if (array.length === 0)
        throw new Error(errorMessage);
    return array[Math.floor(Math.random() * array.length)];
}
/**
 * Generate a random integer between min (inclusive) and max (inclusive)
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Generate a random float between min and max
 */
export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Weighted random selection from an array of items with weights
 */
export function weightedSelect(items, weights) {
    if (items.length === 0 || weights.length !== items.length)
        return undefined;
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    if (totalWeight === 0)
        return randomElement(items);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0)
            return items[i];
    }
    return items[items.length - 1];
}
/**
 * Weighted random selection using item property as weight
 */
export function weightedSelectByProperty(items, weightProperty, invert = false) {
    if (items.length === 0)
        return undefined;
    const weights = items.map(item => {
        const w = Number(item[weightProperty]) || 0;
        return invert ? (1 - w) : w;
    });
    return weightedSelect(items, weights);
}
/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle(array) {
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
export function sample(array, n) {
    const shuffled = shuffle(array);
    return shuffled.slice(0, Math.min(n, array.length));
}
/**
 * Check probability - returns true with given probability (0.0-1.0)
 */
export function probability(p) {
    return Math.random() < p;
}
