/**
 * Semantic Drift - Controlled Hallucination Engine
 *
 * This tool implements a stochastic random walk through the concept space,
 * seeking semantically distant yet contextually relevant concepts.
 *
 * Unlike nearest-neighbor searches that find synonyms or closely related concepts,
 * semantic drift deliberately searches for concepts that are in a "Serendipity Zone"
 * (not too close, not too far) to promote lateral thinking.
 */
import { DreamGraph } from '../graph.js';
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
 * The Semantic Drift tool
 * Generates concepts that are semantically distant but contextually relevant
 */
export declare class SemanticDriftTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performDrift(input: SemanticDriftInput): SemanticDriftOutput;
    /**
     * Finds semantic associations for a concept
     */
    private findAssociations;
    /**
     * Updates the dream graph with new nodes and edges from the drift
     */
    private updateDreamGraph;
}
