/**
 * Oblique Constraint - The Entropy Injector (V3.0 - LLM-SCAFFOLDED)
 *
 * This tool implements Brian Eno's Oblique Strategies and SCAMPER techniques
 * to act as a "Circuit Breaker" for rigid thinking.
 *
 * V3.0 MAJOR REFACTOR:
 * - Outputs LLM SCAFFOLDS with actionable application guidance
 * - Each constraint includes HOW TO APPLY IT (not just the constraint)
 * - "What might emerge" section forces productive speculation
 * - Constraints are grounded in user's actual block, not generic
 */
import { DreamGraph } from "../graph.js";
import { CreativeScaffold } from "../prompts/creative-scaffolds.js";
export interface ObliqueConstraintInput {
    currentBlock: string;
    constraintType?: "oblique" | "scamper" | "creative" | "random";
}
export interface ObliqueConstraintOutput {
    /** LLM scaffold for applying the constraint */
    scaffold: CreativeScaffold;
    /** Formatted prompt ready for Claude */
    llmPrompt: string;
    /** The constraint itself */
    constraint: string;
    /** Type of constraint */
    constraintType: string;
    /** How to apply this constraint */
    applicationHints: string[];
    /** When this constraint is useful */
    useCase: string;
    /** Full explanation */
    explanation: string;
}
/**
 * The Oblique Constraint tool (V3.0 - LLM-SCAFFOLDED)
 */
export declare class ObliqueConstraintTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    generateConstraint(input: ObliqueConstraintInput): ObliqueConstraintOutput;
    /**
     * Select a constraint based on type and block content
     */
    private selectConstraint;
    /**
     * Generate context-specific creative constraints
     */
    private generateCreativeConstraints;
    /**
     * Helper to choose random constraint type
     */
    private chooseRandomType;
    /**
     * Generate application hints specific to the block
     */
    private generateApplicationHints;
    /**
     * Create explanation
     */
    private createExplanation;
    /**
     * Update dream graph
     */
    private updateDreamGraph;
}
