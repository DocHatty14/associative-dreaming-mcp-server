/**
 * Oblique Constraint - The Entropy Injector V2.0
 *
 * This tool implements Brian Eno's Oblique Strategies and SCAMPER techniques.
 * It acts as a "Circuit Breaker" for linear rigidity by introducing
 * deliberate constraints that force creative thinking and pattern breaking.
 *
 * V2.0: Added context-aware constraint selection that analyzes the block
 * description to pick relevant constraints and generate specific application hints.
 */
import { DreamGraph } from '../graph.js';
export interface ObliqueConstraintInput {
    currentBlock: string;
    constraintType?: 'oblique' | 'scamper' | 'creative' | 'random';
}
export interface ObliqueConstraintOutput {
    constraint: string;
    constraintType: string;
    applicationHints: string[];
    explanation: string;
}
/**
 * The Oblique Constraint tool
 * Injects creative constraints to break linear thinking
 */
export declare class ObliqueConstraintTool {
    private dreamGraph;
    private strategies;
    private scamperStrategies;
    private creativeConstraints;
    constructor(dreamGraph: DreamGraph);
    /**
     * Loads the oblique strategies and other constraints from the JSON file
     */
    private loadConstraints;
    generateConstraint(input: ObliqueConstraintInput): ObliqueConstraintOutput;
    /**
     * Analyzes the block description to extract keywords, problem type, and sentiment
     */
    private analyzeBlock;
    /**
     * Selects a context-aware constraint based on block analysis
     */
    private selectContextAwareConstraint;
    /**
     * Selects the best constraint from a specific list based on analysis
     */
    private selectBestConstraint;
    /**
     * Scores how relevant a constraint is to the block analysis
     */
    private scoreConstraintRelevance;
    /**
     * Generates specific application hints tailored to the actual problem
     */
    private generateSpecificApplicationHints;
    /**
     * Generates an explanation of the oblique constraint
     */
    private generateExplanation;
    /**
     * Updates the dream graph with the oblique constraint
     */
    private updateDreamGraph;
    /**
     * Gets a random element from an array
     */
    private getRandomElement;
}
