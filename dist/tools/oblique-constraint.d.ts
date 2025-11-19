/**
 * Oblique Constraint - The Entropy Injector
 *
 * This tool implements Brian Eno's Oblique Strategies and SCAMPER techniques.
 * It acts as a "Circuit Breaker" for linear rigidity by introducing
 * deliberate constraints that force creative thinking and pattern breaking.
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
     * Generates practical application hints for the constraint
     */
    private generateApplicationHints;
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
