/**
 * Bisociative Synthesis - The Combinatorial Engine (V3.0 - LLM-SCAFFOLDED)
 *
 * This tool forces the intersection of two unrelated matrices of thought.
 * Based on Arthur Koestler's theory of Bisociation and Conceptual Blending Theory.
 *
 * V3.0 MAJOR REFACTOR:
 * - Outputs are now LLM SCAFFOLDS, not template-filled strings
 * - The server provides STRUCTURE, Claude provides INSIGHT
 * - Each output includes a structured prompt for genuine creative reasoning
 * - "Because chains" force justification of connections
 * - Grounded in user's actual context, not generic mappings
 */
import { DreamGraph } from "../graph.js";
import { CreativeScaffold } from "../prompts/creative-scaffolds.js";
export interface BisociativeSynthesisInput {
    matrixA: string;
    matrixB?: string;
    blendType?: string;
}
export interface BisociativeSynthesisOutput {
    /** LLM scaffold for genuine insight generation */
    scaffold: CreativeScaffold;
    /** Formatted prompt ready for Claude to process */
    llmPrompt: string;
    /** Bridge concept (placeholder until LLM fills it) */
    bridgeConcept: string;
    /** The two domains being connected */
    matrixA: string;
    matrixB: string;
    /** Suggested structural pattern */
    suggestedPattern: string;
    /** Pattern hints to guide the LLM */
    patternHints: string[];
    /** Explanation of what the LLM should do */
    explanation: string;
}
/**
 * The Bisociative Synthesis tool (V3.0 - LLM-SCAFFOLDED)
 * Returns prompts that guide Claude toward genuine insight, not pre-filled templates
 */
export declare class BisociativeSynthesisTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performSynthesis(input: BisociativeSynthesisInput): BisociativeSynthesisOutput;
    /**
     * Selects a complementary domain that's genuinely different from matrixA
     */
    private selectComplementaryDomain;
    /**
     * Identify the best structural pattern for this pair
     */
    private identifyPattern;
    /**
     * Generate a provisional bridge concept
     * This is just a placeholder - the REAL insight comes from the LLM
     */
    private generateProvisionalBridge;
    /**
     * Create explanation of what the output means
     */
    private createExplanation;
    /**
     * Updates the dream graph
     */
    private updateDreamGraph;
}
