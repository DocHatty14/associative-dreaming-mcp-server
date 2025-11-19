/**
 * Rhizomatic Graph - Core data structure for Associative Dreaming
 *
 * Unlike the linear thoughts of Sequential Thinking, this implements a network structure
 * where any node (concept) can connect to any other node through weighted, labeled edges.
 * This allows for non-linear exploration of the concept space.
 */
export interface Edge {
    source: string;
    target: string;
    type: EdgeType;
    weight: number;
    metadata?: Record<string, any>;
}
export declare enum EdgeType {
    METAPHOR_FOR = "metaphor_for",// Concept A is a metaphor for concept B
    CONTRASTS_WITH = "contrasts_with",// Concept A is opposite of concept B
    REMINDS_OF = "reminds_of",// Concept A triggers memory of concept B
    SYNTHESIZED_FROM = "synthesized_from",// Concept C was created from concepts A and B
    CONTAINS = "contains",// Concept A is a superset of concept B
    SPECIALIZES = "specializes",// Concept A is a specific instance of concept B
    TRANSFORMS_INTO = "transforms_into",// Concept A can become concept B
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
 */
export declare class DreamGraph {
    private nodes;
    private edges;
    private traversalHistory;
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
     * Gets all outgoing edges from a node
     */
    getEdgesFrom(nodeId: string): Edge[];
    /**
     * Gets all incoming edges to a node
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
     * Gets the traversal history (path of exploration)
     */
    getTraversalHistory(): string[];
    /**
     * Gets the current/last visited node
     */
    getCurrentNode(): Node | undefined;
    /**
     * Finds nodes that could serve as bridges between disconnected clusters
     * Used by the serendipity_scan tool to identify potential "bridging concepts"
     */
    findStructuralHoles(): Node[];
    /**
     * Calculates the semantic diversity of the graph
     * Higher values indicate more diverse concepts
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
