/**
 * Technical Domain Semantic Associations
 *
 * Specialized associations for technical, software, and systems terminology.
 * These extend the base semantic drift associations to handle domain-specific concepts.
 */
export interface WeightedAssociation {
    concept: string;
    distance: number;
    reason?: string;
}
export declare const TECHNICAL_ASSOCIATIONS: Record<string, WeightedAssociation[]>;
