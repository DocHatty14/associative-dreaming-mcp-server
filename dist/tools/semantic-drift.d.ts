/**
 * Semantic Drift - Controlled Hallucination Engine (V4.0 - LLM-SCAFFOLDED)
 *
 * This tool implements a stochastic random walk through the concept space,
 * seeking semantically distant yet contextually relevant concepts.
 *
 * V4.0 MAJOR REFACTOR:
 * - Outputs LLM SCAFFOLDS instead of template strings
 * - Semantic distance is now EMERGENT from LLM reasoning, not hard-coded
 * - "Because chains" make every leap traceable
 * - Each drift includes reasoning the LLM must provide
 * - Server provides STRUCTURE (constraints, distance targets), LLM provides CREATIVITY
 *
 * PHILOSOPHY CHANGE:
 * Old: Hard-coded association table with arbitrary distance weights
 * New: LLM generates the actual semantic leap, constrained by drift parameters
 *
 * The associations table is now used for HINTS and FALLBACKS, not as the
 * source of creativity. The LLM is the creative engine.
 */
import { DreamGraph } from "../graph.js";
import { CreativeScaffold } from "../prompts/creative-scaffolds.js";
/**
 * Association hint - used to suggest directions, not determine them
 */
interface AssociationHint {
    concept: string;
    direction: string;
    distanceRange: [number, number];
}
export interface SemanticDriftInput {
    anchorConcept: string;
    driftMagnitude: number;
    temperature?: number;
}
export interface SemanticDriftOutput {
    /** LLM scaffold for semantic leap */
    scaffold: CreativeScaffold;
    /** Formatted prompt ready for Claude to process */
    llmPrompt: string;
    /** The destination concept (placeholder or hint-based suggestion) */
    newConcept: string;
    /** Suggested drift path (hints for LLM) */
    driftPath: string[];
    /** Target drift distance */
    driftDistance: number;
    /** Association hints relevant to this anchor */
    associationHints: AssociationHint[];
    /** Cross-domain bridge suggestions (for high drift) */
    bridgeSuggestions: string[];
    /** Full explanation */
    explanation: string;
}
/**
 * The Semantic Drift tool (V4.0 - LLM-SCAFFOLDED)
 * Returns prompts that guide Claude to make genuine semantic leaps
 */
export declare class SemanticDriftTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performDrift(input: SemanticDriftInput): SemanticDriftOutput;
    /**
     * Get association hints relevant to the anchor concept
     */
    private getAssociationHints;
    /**
     * Generate generic hints when no specific hints are available
     */
    private generateGenericHints;
    /**
     * Get cross-domain bridge suggestions
     */
    private getCrossDomainBridges;
    /**
     * Generate provisional drift result based on hints
     */
    private generateProvisionalDrift;
    /**
     * Create explanation of the output
     */
    private createExplanation;
    /**
     * Update dream graph with drift
     */
    private updateDreamGraph;
}
export {};
