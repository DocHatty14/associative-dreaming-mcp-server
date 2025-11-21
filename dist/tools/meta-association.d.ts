/**
 * Meta-Association - The Chaos Weaver (V2.0 - LLM-SCAFFOLDED)
 *
 * "A→Banana→Your ex's apartment→Ancient Rome→Answer"
 *
 * V2.0 MAJOR REFACTOR:
 * - EVERY collision now requires a traceable "because chain"
 * - Weirdness must serve insight, not just performance
 * - Outputs include practical extraction even from maximum chaos
 * - The LLM does the creative collision; server provides structure
 *
 * PHILOSOPHY (UNCHANGED):
 * This is the AMPLIFIER, not the dampener. While the other 4 tools generate
 * creative leaps from a single starting point, this tool takes MULTIPLE prior
 * outputs and forces EVEN MORE bizarre connections between them.
 *
 * KEY CHANGE:
 * Old: Random collision → Template phrase → "weirdness score"
 * New: Structured collision → LLM-generated insight → Justified weirdness
 */
import { DreamGraph } from "../graph.js";
import { CreativeScaffold } from "../prompts/creative-scaffolds.js";
/**
 * Prior output from any Associative Dreaming tool
 */
export interface PriorAssociativeOutput {
    tool: "semantic_drift" | "bisociative_synthesis" | "oblique_constraint" | "serendipity_scan";
    result: {
        newConcept?: string;
        bridgeConcept?: string;
        constraint?: string;
        discoveredConcept?: string;
        explanation?: string;
        driftPath?: string[];
        driftDistance?: number;
        mapping?: any;
        application?: string;
        insight?: string;
        [key: string]: any;
    };
    timestamp?: number;
}
export interface MetaAssociationInput {
    priorOutputs: PriorAssociativeOutput[];
    chaosIntensity?: number;
    contextAnchor?: string;
}
export interface MetaAssociationOutput {
    /** LLM scaffold for meta-collision */
    scaffold: CreativeScaffold;
    /** Formatted prompt ready for Claude */
    llmPrompt: string;
    /** The emergent meta-pattern (placeholder until LLM fills) */
    metaPattern: string;
    /** Collision map showing what concepts will collide */
    collisionMap: CollisionDescription[];
    /** Extracted concepts from prior outputs */
    extractedConcepts: ExtractedConcept[];
    /** Weirdness target (not actual score - that comes from LLM) */
    weirdnessTarget: number;
    /** Structure for rhizome visualization */
    rhizomeStructure: RhizomeNode[];
    /** The practical extraction prompt */
    practicalExtractionPrompt: string;
    /** Full explanation */
    explanation: string;
}
interface CollisionDescription {
    concept1: string;
    concept2: string;
    collisionPrompt: string;
}
interface ExtractedConcept {
    text: string;
    source: string;
    type: "primary" | "secondary" | "metadata";
}
interface RhizomeNode {
    id: string;
    content: string;
    connections: string[];
}
/**
 * The Meta-Association Tool (V2.0 - LLM-SCAFFOLDED)
 * Forces prior outputs to collide with justified "because chains"
 */
export declare class MetaAssociationTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    /**
     * Main meta-association method
     */
    associate(input: MetaAssociationInput): MetaAssociationOutput;
    /**
     * Extract concepts from prior outputs
     */
    private extractConcepts;
    /**
     * Generate collision map - which concepts should collide and how
     */
    private generateCollisionMap;
    /**
     * Generate a collision prompt for a pair of concepts
     */
    private generateCollisionPrompt;
    /**
     * Generate provisional meta-pattern
     */
    private generateProvisionalPattern;
    /**
     * Build rhizome structure for visualization
     */
    private buildRhizomeStructure;
    /**
     * Generate practical extraction prompt
     */
    private generatePracticalExtractionPrompt;
    /**
     * Create explanation
     */
    private createExplanation;
    /**
     * Update dream graph with meta-association
     */
    private updateDreamGraph;
}
export {};
