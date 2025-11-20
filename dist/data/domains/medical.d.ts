/**
 * Medical Domain Semantic Associations
 *
 * Specialized associations for medical, healthcare, and diagnostic terminology.
 * These extend the base semantic drift associations to handle domain-specific concepts.
 */
export interface WeightedAssociation {
    concept: string;
    distance: number;
    reason?: string;
}
export declare const MEDICAL_ASSOCIATIONS: Record<string, WeightedAssociation[]>;
