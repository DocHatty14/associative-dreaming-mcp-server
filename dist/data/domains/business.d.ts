/**
 * Business Domain Semantic Associations
 *
 * Specialized associations for business, strategy, and organizational terminology.
 * These extend the base semantic drift associations to handle domain-specific concepts.
 */
export interface WeightedAssociation {
    concept: string;
    distance: number;
    reason?: string;
}
export declare const BUSINESS_ASSOCIATIONS: Record<string, WeightedAssociation[]>;
