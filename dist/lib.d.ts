/**
 * Associative Dreaming Server - Main Implementation
 *
 * This is the core implementation of the Associative Dreaming MCP server.
 * Unlike the Sequential Thinking server which maintains a linear thought history,
 * this server manages a rhizomatic "Dream Graph" that allows for non-linear,
 * associative exploration of the concept space.
 */
import { SemanticDriftInput } from './tools/semantic-drift.js';
import { BisociativeSynthesisInput } from './tools/bisociative-synthesis.js';
import { ObliqueConstraintInput } from './tools/oblique-constraint.js';
import { SerendipityScanInput } from './tools/serendipity-scan.js';
/**
 * Input type for the server that encapsulates all possible tool inputs
 */
export type AssociativeDreamingInput = {
    tool: 'semantic_drift';
    input: SemanticDriftInput;
} | {
    tool: 'bisociative_synthesis';
    input: BisociativeSynthesisInput;
} | {
    tool: 'oblique_constraint';
    input: ObliqueConstraintInput;
} | {
    tool: 'serendipity_scan';
    input: SerendipityScanInput;
};
/**
 * Main server class that manages the dream graph and tools
 */
export declare class AssociativeDreamingServer {
    private dreamGraph;
    private semanticDriftTool;
    private bisociativeSynthesisTool;
    private obliqueConstraintTool;
    private serendipityScanTool;
    private disableDreamLogging;
    constructor();
    /**
     * Process a request to the Associative Dreaming server
     */
    processDream(input: unknown): {
        content: Array<{
            type: string;
            text: string;
        }>;
        isError?: boolean;
    };
    /**
     * Validates and normalizes the input
     */
    private validateInput;
    /**
     * Executes the appropriate tool based on the input
     */
    private executeToolRequest;
    /**
     * Logs dream tool executions with colorized output
     */
    private logDream;
    /**
     * Gets statistics about the current dream graph
     */
    private getDreamGraphStatistics;
    /**
     * Input validation helpers
     */
    private isValidSemanticDriftInput;
    private isValidBisociativeSynthesisInput;
    private isValidObliqueConstraintInput;
    private isValidSerendipityScanInput;
}
