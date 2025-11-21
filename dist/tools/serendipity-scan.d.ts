/**
 * Serendipity Scan - The Unknown Unknown Finder (V3.0 - LLM-SCAFFOLDED)
 *
 * This tool automates the search for "Unknown Unknowns" - connections and insights
 * that would typically be missed through linear thinking.
 *
 * V3.0 MAJOR REFACTOR:
 * - NOW WORKS ON EMPTY GRAPHS - mines user context directly
 * - Outputs LLM scaffolds instead of template strings
 * - Context-mining mode: extracts concepts from user input when graph is empty
 * - Seed generation: identifies high-potential entry points for exploration
 * - "Because chains" for all discoveries
 */
import { DreamGraph } from "../graph.js";
import { CreativeScaffold } from "../prompts/creative-scaffolds.js";
export interface SerendipityScanInput {
    currentContext: string;
    noveltyThreshold?: number;
    scanType?: "bridge" | "gap" | "pattern" | "random";
}
export interface SerendipityScanOutput {
    /** LLM scaffold for serendipitous discovery */
    scaffold: CreativeScaffold;
    /** Formatted prompt ready for Claude to process */
    llmPrompt: string;
    /** Discovered concept (placeholder or extracted) */
    discoveredConcept: string;
    /** The scan type used */
    scanType: string;
    /** Serendipity score estimate */
    serendipityScore: number;
    /** Concepts extracted from context (for empty graph) */
    extractedConcepts: string[];
    /** Seed probes for exploration */
    seedProbes: string[];
    /** Related concepts from graph (if available) */
    relatedConcepts: string[];
    /** Full explanation */
    explanation: string;
}
/**
 * The Serendipity Scan tool (V3.0 - LLM-SCAFFOLDED)
 * Now works on empty graphs by mining user context
 */
export declare class SerendipityScanTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performScan(input: SerendipityScanInput): SerendipityScanOutput;
    /**
     * Get current graph state for context
     */
    private getGraphState;
    /**
     * Extract concepts from user context text
     * This is the key to working on empty graphs
     */
    private extractConceptsFromContext;
    /**
     * Generate seed probes for exploration based on context
     */
    private generateSeedProbes;
    /**
     * Find related concepts from graph
     */
    private findRelatedConcepts;
    /**
     * Generate provisional discovery based on context mining
     */
    private generateProvisionalDiscovery;
    /**
     * Estimate serendipity score
     */
    private estimateSerendipityScore;
    /**
     * Create explanation of the output
     */
    private createExplanation;
    /**
     * Update dream graph with discovery context
     */
    private updateDreamGraph;
}
