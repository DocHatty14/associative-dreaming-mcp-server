/**
 * Bisociative Synthesis - The Combinatorial Engine (ENHANCED)
 *
 * This tool forces the intersection of two unrelated matrices of thought.
 * Based on Arthur Koestler's theory of Bisociation and Conceptual Blending Theory.
 *
 * ENHANCEMENTS:
 * - Expanded from 6 to 15 diverse domains
 * - Context-aware, domain-specific mappings
 * - Richer explanations with actual cross-domain insights
 * - Better bridge concept generation
 */
import { DreamGraph } from "../graph.js";
export interface BisociativeSynthesisInput {
    matrixA: string;
    matrixB?: string;
    blendType?: string;
}
export interface BisociativeSynthesisOutput {
    bridgeConcept: string;
    matrixA: string;
    matrixB: string;
    pattern: string;
    mapping: Record<string, string>;
    explanation: string;
}
/**
 * The Bisociative Synthesis tool (ENHANCED VERSION)
 * Combines concepts from different matrices of thought
 */
export declare class BisociativeSynthesisTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performSynthesis(input: BisociativeSynthesisInput): BisociativeSynthesisOutput;
    /**
     * Selects a complementary domain that's different enough to be interesting
     */
    private selectComplementaryDomain;
    /**
     * Finds the best isomorphic pattern
     */
    private findIsomorphism;
    /**
     * Creates context-aware mappings based on actual domain content
     */
    private createContextAwareMapping;
    /**
     * Generates a compelling bridge concept
     */
    private generateBridgeConcept;
    /**
     * Creates a rich, actionable explanation
     */
    private createRichExplanation;
    /**
     * Updates the dream graph
     */
    private updateDreamGraph;
}
