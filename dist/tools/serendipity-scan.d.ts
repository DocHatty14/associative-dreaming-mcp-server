/**
 * Serendipity Scan - The Unknown Unknown Finder
 *
 * This tool automates the search for "Unknown Unknowns" - connections and insights
 * that would normally be missed through linear thinking. It analyzes the dream graph
 * for structural holes and disconnected clusters, then identifies potential bridges
 * that could connect these disparate ideas.
 */
import { DreamGraph } from '../graph.js';
export interface SerendipityScanInput {
    currentContext: string;
    noveltyThreshold?: number;
    scanType?: 'bridge' | 'gap' | 'pattern' | 'random';
}
export interface SerendipityScanOutput {
    discoveredConcept: string;
    scanType: string;
    serendipityScore: number;
    relatedConcepts: string[];
    explanation: string;
}
/**
 * The Serendipity Scan tool
 * Identifies surprising connections and bridges between disconnected concepts
 */
export declare class SerendipityScanTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performScan(input: SerendipityScanInput): SerendipityScanOutput;
    /**
     * Finds nodes related to a given node
     */
    private findRelatedNodes;
    /**
     * Updates the dream graph with the serendipitous discovery
     */
    private updateDreamGraph;
    /**
     * Generates a fallback result when the graph is too small
     */
    private generateFallbackResult;
    /**
     * Gets a word that is conceptually opposite to the input
     */
    private getOppositeWord;
    /**
     * Gets a word that is related to but different from the input
     */
    private getRelatedWord;
    /**
     * Gets a more abstract/general word related to the input
     */
    private getAbstractWord;
    /**
     * Gets a random word for serendipitous connections
     */
    private getRandomWord;
}
