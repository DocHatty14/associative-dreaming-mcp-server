/**
 * Semantic Drift - Controlled Hallucination Engine (OPTIMIZED v2.1)
 *
 * This tool implements a stochastic random walk through the concept space,
 * seeking semantically distant yet contextually relevant concepts.
 *
 * V2.1 OPTIMIZATIONS:
 * - Loop detection: visitedConcepts Set prevents circular paths
 * - Progressive drift intensity: Each hop goes progressively further
 * - Aggressive high drift: 40% cross-domain chance at drift >= 0.7
 * - Better distance targeting: Prefer associations with distance > 0.6 for high drift
 * - Clean explanations: Removed "reverse: " prefix from reasons
 * - All methods updated to accept and use visitedConcepts Set
 *
 * V2.0 ENHANCEMENTS:
 * - Expanded from 150 to 500+ concept associations with modern tech (AI/ML, blockchain, quantum)
 * - TRUE semantic distance scoring (0.0-1.0) for each association
 * - Drift magnitude actually controls conceptual distance traveled
 * - Cross-domain bridge system for creative leaps
 * - Temperature adds genuine creative chaos
 * - Rich explanation formatting that actually appears in output
 * - Fixed synonym problem - prioritizes semantically distant concepts
 */
import { DreamGraph } from "../graph.js";
export interface SemanticDriftInput {
    anchorConcept: string;
    driftMagnitude: number;
    temperature?: number;
}
export interface SemanticDriftOutput {
    newConcept: string;
    driftPath: string[];
    driftDistance: number;
    explanation: string;
}
/**
 * The Semantic Drift tool (V2.1 - OPTIMIZED)
 * Generates concepts that are semantically distant but contextually relevant
 */
export declare class SemanticDriftTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performDrift(input: SemanticDriftInput): SemanticDriftOutput;
    /**
     * Finds the next concept based on drift magnitude and temperature
     * V2.1: Accepts visitedConcepts Set for loop detection
     */
    private findNextConcept;
    /**
     * Gets all weighted associations for a concept
     */
    private getWeightedAssociations;
    /**
     * Selects a cross-domain bridge for dramatic leaps
     * V2.1: Accepts visitedConcepts Set for loop detection
     */
    private selectCrossDomainBridge;
    /**
     * Jumps to a random domain when stuck
     * V2.1: Accepts visitedConcepts Set for loop detection
     */
    private jumpToDomain;
    /**
     * Generates rich explanation with proper formatting
     */
    private generateRichExplanation;
    /**
     * Generates contextual insights about the drift
     */
    private generateInsights;
    /**
     * Updates the dream graph with new nodes and edges
     */
    private updateDreamGraph;
}
