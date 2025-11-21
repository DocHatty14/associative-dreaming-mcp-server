/**
 * Rhizomatic Graph - Core data structure for Associative Dreaming
 *
 * OPTIMIZED VERSION:
 * - Pre-computed adjacency lists for O(1) edge lookups
 * - Approximate betweenness centrality using sampling (Brandes-inspired)
 * - Cached computations with invalidation
 * - O(n+m) shortest path instead of O(n³)
 */
export interface Edge {
    source: string;
    target: string;
    type: EdgeType;
    weight: number;
    metadata?: Record<string, any>;
}
export declare enum EdgeType {
    METAPHOR_FOR = "metaphor_for",
    CONTRASTS_WITH = "contrasts_with",
    REMINDS_OF = "reminds_of",
    SYNTHESIZED_FROM = "synthesized_from",
    CONTAINS = "contains",
    SPECIALIZES = "specializes",
    TRANSFORMS_INTO = "transforms_into",
    CAUSES = "causes"
}
export interface Node {
    id: string;
    content: string;
    creationTimestamp: number;
    semanticVector?: number[];
    driftDistance?: number;
    source?: string;
    metadata?: Record<string, any>;
}
/**
 * The Dream Graph - main data structure for Associative Dreaming
 * Implements a weighted, directed graph with typed edges
 *
 * OPTIMIZATIONS:
 * - Adjacency list for O(1) edge access
 * - Reverse adjacency for incoming edges
 * - Cached computations
 * - Sampled betweenness for large graphs
 */
export declare class DreamGraph {
    private nodes;
    private edges;
    private traversalHistory;
    private outgoingEdges;
    private incomingEdges;
    private cache;
    /**
     * Invalidate all cached computations
     */
    private invalidateCache;
    /**
     * Adds a concept node to the dream graph
     */
    addNode(node: Node): void;
    /**
     * Creates a connection between two concept nodes
     */
    addEdge(edge: Edge): void;
    /**
     * Records node visitation in the traversal path
     */
    visitNode(nodeId: string): void;
    /**
     * Gets all outgoing edges from a node - O(1)
     */
    getEdgesFrom(nodeId: string): Edge[];
    /**
     * Gets all incoming edges to a node - O(1)
     */
    getEdgesTo(nodeId: string): Edge[];
    /**
     * Gets all edges of a specific type
     */
    getEdgesByType(type: EdgeType): Edge[];
    /**
     * Gets a specific node by ID
     */
    getNode(nodeId: string): Node | undefined;
    /**
     * Gets all nodes in the graph
     */
    getAllNodes(): Node[];
    /**
     * Gets all edges in the graph
     */
    getAllEdges(): Edge[];
    /**
     * Gets the traversal history
     */
    getTraversalHistory(): string[];
    /**
     * Gets the current/last visited node
     */
    getCurrentNode(): Node | undefined;
    /**
     * Finds nodes that could serve as bridges between disconnected clusters
     */
    findStructuralHoles(): Node[];
    /**
     * Detects communities/clusters using edge-weight based clustering
     * Uses cached result if available
     */
    detectClusters(minWeight?: number): Map<string, Set<string>>;
    /**
     * DFS helper for cluster detection - uses adjacency list
     */
    private dfs;
    /**
     * OPTIMIZED: Single-source shortest path using BFS - O(n+m)
     * Returns distances from source to all reachable nodes
     */
    private bfsDistances;
    /**
     * OPTIMIZED: Shortest path length between two nodes - O(n+m)
     */
    shortestPathLength(sourceId: string, targetId: string): number;
    /**
     * OPTIMIZED: Approximate betweenness centrality using sampling
     * Based on Brandes' algorithm with random sampling for large graphs
     * Complexity: O(k * (n + m)) where k is sample size
     */
    calculateBetweenness(nodeId: string): number;
    /**
     * Count shortest paths from source to target that pass through nodeId
     */
    private countPathsThrough;
    /**
     * Count shortest paths from intermediate to target
     */
    private countPathsFromTo;
    /**
     * Random sampling helper
     */
    private randomSample;
    /**
     * Finds bridge nodes connecting different clusters
     * Uses cached result if available
     */
    findBridgeNodes(): Array<{
        nodeId: string;
        connectsClusters: string[];
        betweenness: number;
    }>;
    /**
     * Finds structural gaps - concepts that should be connected but aren't
     */
    findStructuralGaps(): Array<{
        concept1: string;
        concept2: string;
        reason: string;
    }>;
    /**
     * Calculates the semantic diversity of the graph
     */
    calculateDiversity(): number;
    /**
     * Exports the graph in a format suitable for visualization
     */
    exportGraph(): {
        nodes: Node[];
        edges: Edge[];
        traversalHistory: string[];
        metrics: {
            nodeCount: number;
            edgeCount: number;
            diversity: number;
            structuralHoles: number;
        };
    };
}
