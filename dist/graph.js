/**
 * Rhizomatic Graph - Core data structure for Associative Dreaming
 *
 * OPTIMIZED VERSION:
 * - Pre-computed adjacency lists for O(1) edge lookups
 * - Approximate betweenness centrality using sampling (Brandes-inspired)
 * - Cached computations with invalidation
 * - O(n+m) shortest path instead of O(n³)
 */
import { getConfig } from "./config.js";
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
 *
 * OPTIMIZATIONS:
 * - Adjacency list for O(1) edge access
 * - Reverse adjacency for incoming edges
 * - Cached computations
 * - Sampled betweenness for large graphs
 */
export class DreamGraph {
    nodes = new Map();
    edges = [];
    traversalHistory = [];
    // Adjacency lists for O(1) edge lookups
    outgoingEdges = new Map();
    incomingEdges = new Map();
    // Cache for expensive computations
    cache = {
        betweenness: new Map(),
        clusters: null,
        bridgeNodes: null,
        lastInvalidation: Date.now(),
    };
    /**
     * Invalidate all cached computations
     */
    invalidateCache() {
        this.cache.betweenness.clear();
        this.cache.clusters = null;
        this.cache.bridgeNodes = null;
        this.cache.lastInvalidation = Date.now();
    }
    /**
     * Adds a concept node to the dream graph
     */
    addNode(node) {
        if (this.nodes.has(node.id)) {
            throw new Error(`Node with ID '${node.id}' already exists`);
        }
        if (!node.creationTimestamp) {
            node.creationTimestamp = Date.now();
        }
        this.nodes.set(node.id, node);
        this.outgoingEdges.set(node.id, []);
        this.incomingEdges.set(node.id, []);
        this.invalidateCache();
    }
    /**
     * Creates a connection between two concept nodes
     */
    addEdge(edge) {
        if (!this.nodes.has(edge.source)) {
            throw new Error(`Source node '${edge.source}' does not exist`);
        }
        if (!this.nodes.has(edge.target)) {
            throw new Error(`Target node '${edge.target}' does not exist`);
        }
        this.edges.push(edge);
        // Update adjacency lists
        this.outgoingEdges.get(edge.source).push(edge);
        this.incomingEdges.get(edge.target).push(edge);
        this.invalidateCache();
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
     * Gets all outgoing edges from a node - O(1)
     */
    getEdgesFrom(nodeId) {
        return this.outgoingEdges.get(nodeId) || [];
    }
    /**
     * Gets all incoming edges to a node - O(1)
     */
    getEdgesTo(nodeId) {
        return this.incomingEdges.get(nodeId) || [];
    }
    /**
     * Gets all edges of a specific type
     */
    getEdgesByType(type) {
        return this.edges.filter((edge) => edge.type === type);
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
     * Gets the traversal history
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
     */
    findStructuralHoles() {
        const potentialBridges = [];
        for (const node of this.nodes.values()) {
            const incoming = this.getEdgesTo(node.id);
            const outgoing = this.getEdgesFrom(node.id);
            if (incoming.length > 0 && outgoing.length === 0) {
                potentialBridges.push(node);
            }
        }
        return potentialBridges;
    }
    /**
     * Detects communities/clusters using edge-weight based clustering
     * Uses cached result if available
     */
    detectClusters(minWeight) {
        if (this.cache.clusters) {
            return this.cache.clusters;
        }
        const config = getConfig();
        const threshold = minWeight ?? config.graph.clusterWeightThreshold;
        const clusters = new Map();
        const visited = new Set();
        let clusterID = 0;
        for (const node of this.nodes.values()) {
            if (visited.has(node.id))
                continue;
            const cluster = new Set();
            this.dfs(node.id, visited, cluster, threshold);
            if (cluster.size > 0) {
                clusters.set(`cluster-${clusterID++}`, cluster);
            }
        }
        this.cache.clusters = clusters;
        return clusters;
    }
    /**
     * DFS helper for cluster detection - uses adjacency list
     */
    dfs(nodeId, visited, cluster, minWeight) {
        visited.add(nodeId);
        cluster.add(nodeId);
        const edges = this.getEdgesFrom(nodeId); // O(1) now
        for (const edge of edges) {
            if (!visited.has(edge.target) && edge.weight >= minWeight) {
                this.dfs(edge.target, visited, cluster, minWeight);
            }
        }
    }
    /**
     * OPTIMIZED: Single-source shortest path using BFS - O(n+m)
     * Returns distances from source to all reachable nodes
     */
    bfsDistances(sourceId) {
        const distances = new Map();
        const queue = [sourceId];
        distances.set(sourceId, 0);
        while (queue.length > 0) {
            const node = queue.shift();
            const currentDist = distances.get(node);
            for (const edge of this.getEdgesFrom(node)) {
                if (!distances.has(edge.target)) {
                    distances.set(edge.target, currentDist + 1);
                    queue.push(edge.target);
                }
            }
        }
        return distances;
    }
    /**
     * OPTIMIZED: Shortest path length between two nodes - O(n+m)
     */
    shortestPathLength(sourceId, targetId) {
        if (sourceId === targetId)
            return 0;
        const distances = this.bfsDistances(sourceId);
        return distances.get(targetId) ?? Infinity;
    }
    /**
     * OPTIMIZED: Approximate betweenness centrality using sampling
     * Based on Brandes' algorithm with random sampling for large graphs
     * Complexity: O(k * (n + m)) where k is sample size
     */
    calculateBetweenness(nodeId) {
        if (!this.nodes.has(nodeId))
            return 0;
        // Check cache
        if (this.cache.betweenness.has(nodeId)) {
            return this.cache.betweenness.get(nodeId);
        }
        const config = getConfig();
        const allNodes = Array.from(this.nodes.keys());
        const n = allNodes.length;
        if (n < 3) {
            this.cache.betweenness.set(nodeId, 0);
            return 0;
        }
        // For small graphs, compute exactly
        // For large graphs, use sampling
        const useSampling = config.graph.betweennessSampling &&
            n > config.graph.betweennessSampleSize;
        const sampleSize = useSampling
            ? Math.min(config.graph.betweennessSampleSize, n)
            : n;
        let betweenness = 0;
        let pairsChecked = 0;
        // Sample or iterate all sources
        const sources = useSampling
            ? this.randomSample(allNodes, sampleSize)
            : allNodes;
        for (const source of sources) {
            if (source === nodeId)
                continue;
            // BFS from source to find shortest paths
            const distances = new Map();
            const paths = new Map(); // Number of shortest paths to each node
            const predecessors = new Map(); // Predecessors on shortest paths
            const queue = [source];
            distances.set(source, 0);
            paths.set(source, 1);
            while (queue.length > 0) {
                const current = queue.shift();
                const currentDist = distances.get(current);
                for (const edge of this.getEdgesFrom(current)) {
                    const neighbor = edge.target;
                    if (!distances.has(neighbor)) {
                        // First time reaching this node
                        distances.set(neighbor, currentDist + 1);
                        paths.set(neighbor, 0);
                        predecessors.set(neighbor, []);
                        queue.push(neighbor);
                    }
                    // If this is a shortest path to neighbor
                    if (distances.get(neighbor) === currentDist + 1) {
                        paths.set(neighbor, paths.get(neighbor) + paths.get(current));
                        predecessors.get(neighbor).push(current);
                    }
                }
            }
            // Check if nodeId is on any shortest path
            for (const target of allNodes) {
                if (target === source || target === nodeId)
                    continue;
                if (!distances.has(target))
                    continue; // Not reachable
                const totalPaths = paths.get(target) || 0;
                if (totalPaths === 0)
                    continue;
                // Count paths through nodeId using dependency accumulation
                const pathsThroughNode = this.countPathsThrough(source, target, nodeId, distances, paths, predecessors);
                if (pathsThroughNode > 0) {
                    betweenness += pathsThroughNode / totalPaths;
                }
                pairsChecked++;
            }
        }
        // Normalize
        const maxPairs = (n - 1) * (n - 2);
        const normalizedBetweenness = maxPairs > 0 ? (betweenness * 2) / maxPairs : 0;
        // Scale if sampled
        const scaledBetweenness = useSampling
            ? normalizedBetweenness * (n / sampleSize)
            : normalizedBetweenness;
        const result = Math.min(1, scaledBetweenness);
        this.cache.betweenness.set(nodeId, result);
        return result;
    }
    /**
     * Count shortest paths from source to target that pass through nodeId
     */
    countPathsThrough(source, target, nodeId, distances, paths, predecessors) {
        const nodeIdDist = distances.get(nodeId);
        const targetDist = distances.get(target);
        if (nodeIdDist === undefined || targetDist === undefined)
            return 0;
        if (nodeIdDist >= targetDist)
            return 0; // nodeId not on path to target
        // Check if nodeId is actually on a shortest path
        const pathsToNode = paths.get(nodeId) || 0;
        if (pathsToNode === 0)
            return 0;
        // Count paths from nodeId to target
        const pathsFromNode = this.countPathsFromTo(nodeId, target, distances, paths, predecessors);
        return pathsToNode * pathsFromNode;
    }
    /**
     * Count shortest paths from intermediate to target
     */
    countPathsFromTo(intermediate, target, distances, paths, predecessors) {
        if (intermediate === target)
            return 1;
        const interDist = distances.get(intermediate);
        const targetDist = distances.get(target);
        if (interDist === undefined || targetDist === undefined)
            return 0;
        if (interDist >= targetDist)
            return 0;
        // Check if intermediate is a predecessor of target (recursively)
        let count = 0;
        const targetPreds = predecessors.get(target) || [];
        for (const pred of targetPreds) {
            if (pred === intermediate) {
                count += 1;
            }
            else if (distances.get(pred) > interDist) {
                count += this.countPathsFromTo(intermediate, pred, distances, paths, predecessors);
            }
        }
        return count;
    }
    /**
     * Random sampling helper
     */
    randomSample(array, size) {
        const result = [];
        const copy = [...array];
        for (let i = 0; i < size && copy.length > 0; i++) {
            const idx = Math.floor(Math.random() * copy.length);
            result.push(copy[idx]);
            copy.splice(idx, 1);
        }
        return result;
    }
    /**
     * Finds bridge nodes connecting different clusters
     * Uses cached result if available
     */
    findBridgeNodes() {
        if (this.cache.bridgeNodes) {
            return this.cache.bridgeNodes;
        }
        const clusters = this.detectClusters();
        const bridges = [];
        // Build reverse map: nodeId -> clusterIds
        const nodeToCluster = new Map();
        for (const [clusterID, nodeSet] of clusters.entries()) {
            for (const nodeId of nodeSet) {
                if (!nodeToCluster.has(nodeId)) {
                    nodeToCluster.set(nodeId, []);
                }
                nodeToCluster.get(nodeId).push(clusterID);
            }
        }
        // Find nodes connecting multiple clusters
        for (const node of this.nodes.values()) {
            const edges = this.getEdgesFrom(node.id);
            const connectedClusters = new Set();
            for (const edge of edges) {
                const targetClusters = nodeToCluster.get(edge.target) || [];
                targetClusters.forEach((c) => connectedClusters.add(c));
            }
            if (connectedClusters.size >= 2) {
                bridges.push({
                    nodeId: node.id,
                    connectsClusters: Array.from(connectedClusters),
                    betweenness: this.calculateBetweenness(node.id),
                });
            }
        }
        const sorted = bridges.sort((a, b) => b.betweenness - a.betweenness);
        this.cache.bridgeNodes = sorted;
        return sorted;
    }
    /**
     * Finds structural gaps - concepts that should be connected but aren't
     */
    findStructuralGaps() {
        const gaps = [];
        const nodes = Array.from(this.nodes.values());
        // Build edge set for O(1) connection check
        const edgeSet = new Set();
        for (const edge of this.edges) {
            edgeSet.add(`${edge.source}:${edge.target}`);
        }
        const isConnected = (a, b) => edgeSet.has(`${a}:${b}`) || edgeSet.has(`${b}:${a}`);
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];
                if (isConnected(node1.id, node2.id))
                    continue;
                const sharedSource = node1.source === node2.source && node1.source !== undefined;
                const similarDrift = Math.abs((node1.driftDistance || 0) - (node2.driftDistance || 0)) <
                    0.2;
                if (sharedSource || similarDrift) {
                    gaps.push({
                        concept1: node1.content,
                        concept2: node2.content,
                        reason: sharedSource
                            ? "same generation tool"
                            : "similar semantic distance",
                    });
                }
            }
        }
        return gaps.slice(0, 10);
    }
    /**
     * Calculates the semantic diversity of the graph
     */
    calculateDiversity() {
        const uniqueEdgeTypes = new Set();
        for (const edge of this.edges) {
            uniqueEdgeTypes.add(edge.type);
        }
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
                structuralHoles: this.findStructuralHoles().length,
            },
        };
    }
}
