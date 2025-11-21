/**
 * Association Data Loader
 *
 * Loads association data from JSON files instead of hardcoded TypeScript.
 * Provides caching, validation, and deduplication.
 */
/**
 * Weighted association interface
 */
export interface WeightedAssociation {
    concept: string;
    distance: number;
    reason?: string;
}
/**
 * Domain data file structure
 */
export interface DomainData {
    domain: string;
    description?: string;
    associations: Record<string, WeightedAssociation[]>;
}
/**
 * Get all loaded associations (with caching)
 */
export declare function getAssociations(): Map<string, WeightedAssociation[]>;
/**
 * Get associations for a specific concept
 */
export declare function getAssociationsFor(concept: string): WeightedAssociation[];
/**
 * Check if a concept has any associations
 */
export declare function hasAssociations(concept: string): boolean;
/**
 * Get all known concepts
 */
export declare function getAllConcepts(): string[];
/**
 * Get association count
 */
export declare function getAssociationCount(): {
    concepts: number;
    totalAssociations: number;
};
/**
 * Clear the cache (for testing or reloading)
 */
export declare function clearAssociationCache(): void;
/**
 * Merge custom associations with loaded ones
 */
export declare function mergeAssociations(base: Map<string, WeightedAssociation[]>, custom: Record<string, WeightedAssociation[]>): Map<string, WeightedAssociation[]>;
/**
 * Find associations within a distance range
 */
export declare function findByDistance(concept: string, minDistance: number, maxDistance: number): WeightedAssociation[];
/**
 * Find cross-domain bridges (concepts that appear in multiple domains)
 */
export declare function findCrossDomainConcepts(): string[];
