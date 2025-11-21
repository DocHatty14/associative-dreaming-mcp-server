/**
 * Concept normalization utilities - ensures consistent handling of concepts
 */
/**
 * Normalize a concept string for consistent matching
 * - Lowercase
 * - Trim whitespace
 * - Collapse multiple spaces
 * - Convert to singular form (basic)
 */
export function normalizeConcept(concept) {
    return concept
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/ies$/, 'y') // categories -> category
        .replace(/([^s])s$/, '$1'); // networks -> network (but not 'ss')
}
/**
 * Check if two concepts are semantically equivalent
 */
export function areConceptsEqual(a, b) {
    return normalizeConcept(a) === normalizeConcept(b);
}
/**
 * Generate a unique ID for a concept node
 */
export function generateConceptId(concept, source) {
    const normalized = normalizeConcept(concept);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${source || 'node'}-${normalized.replace(/\s+/g, '-')}-${timestamp}-${random}`;
}
/**
 * Extract keywords from a concept string
 */
export function extractKeywords(concept) {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return normalizeConcept(concept)
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.has(word));
}
/**
 * Calculate simple word overlap between two concepts
 */
export function conceptOverlap(a, b) {
    const wordsA = new Set(extractKeywords(a));
    const wordsB = new Set(extractKeywords(b));
    if (wordsA.size === 0 || wordsB.size === 0)
        return 0;
    let overlap = 0;
    for (const word of wordsA) {
        if (wordsB.has(word))
            overlap++;
    }
    return overlap / Math.max(wordsA.size, wordsB.size);
}
/**
 * Deduplicate an array of associations by normalizing keys
 */
export function deduplicateAssociations(associations) {
    const seen = new Map();
    for (const assoc of associations) {
        const normalized = normalizeConcept(assoc.concept);
        if (!seen.has(normalized)) {
            seen.set(normalized, assoc);
        }
    }
    return Array.from(seen.values());
}
