/**
 * Rhizomatic Graph - Core data structure for Associative Dreaming
 *
 * Unlike the linear thoughts of Sequential Thinking, this implements a network structure
 * where any node (concept) can connect to any other node through weighted, labeled edges.
 * This allows for non-linear exploration of the concept space.
 */
// Types of associative relationships between concepts
export var EdgeType;
(function (EdgeType) {
    EdgeType["METAPHOR_FOR"] = "metaphor_for";
    EdgeType["CONTRASTS_WITH"] = "contrasts_with";
    EdgeType["REMINDS_OF"] = "reminds_of";
    EdgeType["SYNTHESIZED_FROM"] = "synthesized_from";
    EdgeType["CONTAINS"] = "contains";
    EdgeType["SPECIALIZES"] = "specializes";
    EdgeType["TRANSFORMS_INTO"] = "transforms_into";
    EdgeType["CAUSES"] = "causes";
})(EdgeType || (EdgeType = {}));
/**
 * The Dream Graph - main data structure for Associative Dreaming
 * Implements a weighted, directed graph with typed edges
 */
export class DreamGraph {
    nodes = new Map();
    edges = [];
    traversalHistory = []; // Keeps track of the concept exploration path
    /**
     * Adds a concept node to the dream graph
     */
    addNode(node) {
        // Ensure the node ID is unique
        if (this.nodes.has(node.id)) {
            throw new Error(`Node with ID '${node.id}' already exists`);
        }
        // Set creation timestamp if not provided
        if (!node.creationTimestamp) {
            node.creationTimestamp = Date.now();
        }
        this.nodes.set(node.id, node);
    }
    /**
     * Creates a connection between two concept nodes
     */
    addEdge(edge) {
        // Validate that both nodes exist
        if (!this.nodes.has(edge.source)) {
            throw new Error(`Source node '${edge.source}' does not exist`);
        }
        if (!this.nodes.has(edge.target)) {
            throw new Error(`Target node '${edge.target}' does not exist`);
        }
        // Add the edge to the graph
        this.edges.push(edge);
    }
    /**
     * Records node visitation in the traversal path
     */
    visitNode(nodeId) {
        if (!this.nodes.has(nodeId)) {
            throw new Error(`Cannot visit node '${nodeId}' as it does not exist`);
        }
        this.traversalHistory.push(nodeId);
    }
    /**
     * Gets all outgoing edges from a node
     */
    getEdgesFrom(nodeId) {
        return this.edges.filter(edge => edge.source === nodeId);
    }
    /**
     * Gets all incoming edges to a node
     */
    getEdgesTo(nodeId) {
        return this.edges.filter(edge => edge.target === nodeId);
    }
    /**
     * Gets all edges of a specific type
     */
    getEdgesByType(type) {
        return this.edges.filter(edge => edge.type === type);
    }
    /**
     * Gets a specific node by ID
     */
    getNode(nodeId) {
        return this.nodes.get(nodeId);
    }
    /**
     * Gets all nodes in the graph
     */
    getAllNodes() {
        return Array.from(this.nodes.values());
    }
    /**
     * Gets all edges in the graph
     */
    getAllEdges() {
        return this.edges;
    }
    /**
     * Gets the traversal history (path of exploration)
     */
    getTraversalHistory() {
        return [...this.traversalHistory];
    }
    /**
     * Gets the current/last visited node
     */
    getCurrentNode() {
        if (this.traversalHistory.length === 0) {
            return undefined;
        }
        const currentNodeId = this.traversalHistory[this.traversalHistory.length - 1];
        return this.getNode(currentNodeId);
    }
    /**
     * Finds nodes that could serve as bridges between disconnected clusters
     * Used by the serendipity_scan tool to identify potential "bridging concepts"
     */
    findStructuralHoles() {
        // Simple implementation: find nodes with incoming but no outgoing edges
        const potentialBridges = [];
        for (const node of this.nodes.values()) {
            const incomingEdges = this.getEdgesTo(node.id);
            const outgoingEdges = this.getEdgesFrom(node.id);
            // Node has incoming connections but no outgoing ones
            if (incomingEdges.length > 0 && outgoingEdges.length === 0) {
                potentialBridges.push(node);
            }
        }
        return potentialBridges;
    }
    /**
     * Calculates the semantic diversity of the graph
     * Higher values indicate more diverse concepts
     */
    calculateDiversity() {
        // Simple implementation: use the number of different edge types as a proxy for diversity
        const uniqueEdgeTypes = new Set();
        for (const edge of this.edges) {
            uniqueEdgeTypes.add(edge.type);
        }
        // Normalize by max possible edge types
        return uniqueEdgeTypes.size / Object.keys(EdgeType).length;
    }
    /**
     * Exports the graph in a format suitable for visualization
     */
    exportGraph() {
        return {
            nodes: Array.from(this.nodes.values()),
            edges: this.edges,
            traversalHistory: this.traversalHistory,
            metrics: {
                nodeCount: this.nodes.size,
                edgeCount: this.edges.length,
                diversity: this.calculateDiversity(),
                structuralHoles: this.findStructuralHoles().length
            }
        };
    }
}
