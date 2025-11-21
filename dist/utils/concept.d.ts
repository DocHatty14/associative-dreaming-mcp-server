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
export declare function normalizeConcept(concept: string): string;
/**
 * Check if two concepts are semantically equivalent
 */
export declare function areConceptsEqual(a: string, b: string): boolean;
/**
 * Generate a unique ID for a concept node
 */
export declare function generateConceptId(concept: string, source?: string): string;
/**
 * Extract keywords from a concept string
 */
export declare function extractKeywords(concept: string): string[];
/**
 * Calculate simple word overlap between two concepts
 */
export declare function conceptOverlap(a: string, b: string): number;
/**
 * Deduplicate an array of associations by normalizing keys
 */
export declare function deduplicateAssociations<T extends {
    concept: string;
}>(associations: T[]): T[];
