/**
 * Serendipity Scan - The Unknown Unknown Finder (V4.0 - ECHO CHAMBER FIX)
 *
 * This tool automates the search for "Unknown Unknowns" - connections and insights
 * that would normally be missed through linear thinking. It analyzes the dream graph
 * using sophisticated graph algorithms to identify structural holes, disconnected clusters,
 * and potential bridges that could connect these disparate ideas.
 *
 * V4.0 CRITICAL FIX - THE ECHO CHAMBER BUG:
 * - Filters out recently visited concepts from traversal history
 * - Implements temporal diversity scoring with configurable recency window
 * - Adds aging mechanism - older concepts gradually become eligible again
 * - Graceful fallback when all concepts are recent
 * - Ensures TRUE serendipity instead of echoing recent history
 *
 * V3.0 ENHANCEMENTS:
 * - TRUE cluster detection using DFS-based community finding
 * - Betweenness centrality for identifying bridge nodes
 * - Meaningful serendipity scoring based on novelty, relevance, and centrality
 * - Context-aware concept discovery with semantic relevance calculation
 * - Rich, formatted explanations for each discovery type
 */
import { DreamGraph } from '../graph.js';
export interface SerendipityScanInput {
    currentContext: string;
    noveltyThreshold?: number;
    scanType?: 'bridge' | 'gap' | 'pattern' | 'random';
    recentHistoryWindow?: number;
}
export interface SerendipityScanOutput {
    discoveredConcept: string;
    scanType: string;
    serendipityScore: number;
    relatedConcepts: string[];
    explanation: string;
}
/**
 * The Serendipity Scan tool (V3.0 - REWRITTEN)
 * Identifies surprising connections and bridges between disconnected concepts
 */
export declare class SerendipityScanTool {
    private dreamGraph;
    constructor(dreamGraph: DreamGraph);
    performScan(input: SerendipityScanInput): SerendipityScanOutput;
    /**
     * Gets recently visited node IDs from traversal history
     * V4.0: Core of the echo chamber fix
     */
    private getRecentNodeIds;
    /**
     * Filters nodes to exclude recently visited ones
     * V4.0: Ensures temporal diversity
     */
    private filterRecentNodes;
    /**
     * Calculates temporal diversity score based on node age and recency
     * V4.0: Aging mechanism - older concepts gradually become more eligible
     */
    private calculateTemporalDiversityScore;
    /**
     * BRIDGE: Find concepts connecting different idea clusters
     * V4.0: Now excludes recently visited concepts
     */
    private findBridgeConcept;
    /**
     * GAP: Find missing connections between related concepts
     * V4.0: Now excludes recently visited concepts
     */
    private findGapConcept;
    /**
     * PATTERN: Find recurring structural patterns in the graph
     * V4.0: Now excludes recently visited concepts from exemplars
     */
    private findPatternConcept;
    /**
     * RANDOM: High-diversity random concept
     * V4.0: THE CRITICAL FIX - Now excludes recently visited concepts
     */
    private findRandomConcept;
    /**
     * Calculate semantic relevance (simplified - uses keyword matching)
     * In production, could use embeddings or better NLP
     */
    private calculateRelevance;
    /**
     * Get concepts from cluster IDs
     */
    private getConceptsFromClusters;
    private explainBridgeDiscovery;
    private explainGapDiscovery;
    private explainPatternDiscovery;
    private explainRandomDiscovery;
}
