/**
 * Bisociative Synthesis - The Combinatorial Engine
 *
 * This tool forces the intersection of two unrelated matrices of thought.
 * Based on Arthur Koestler's theory of Bisociation and Conceptual Blending Theory,
 * it identifies structural similarities between disparate domains to generate
 * creative insights and bridge concepts.
 */
import { DreamGraph } from '../graph.js';
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
 * The Bisociative Synthesis tool
 * Combines concepts from different matrices of thought
 */
export declare class BisociativeSynthesisTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performSynthesis(input: BisociativeSynthesisInput): BisociativeSynthesisOutput;
    /**
     * Selects a random domain different from matrixA
     */
    private selectRandomDomain;
    /**
     * Identifies patterns in a given domain
     */
    private identifyPatterns;
    /**
     * Finds an isomorphic pattern between two domains
     */
    private findIsomorphism;
    /**
     * Creates a mapping between concepts in the two domains
     */
    private createMapping;
    /**
     * Generates a bridge concept connecting the two domains
     */
    private generateBridgeConcept;
    /**
     * Creates an explanation of the bisociative synthesis
     */
    private createExplanation;
    /**
     * Updates the dream graph with the bisociative synthesis
     */
    private updateDreamGraph;
}
