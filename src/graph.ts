/**
 * Rhizomatic Graph - Core data structure for Associative Dreaming
 * 
 * Unlike the linear thoughts of Sequential Thinking, this implements a network structure
 * where any node (concept) can connect to any other node through weighted, labeled edges.
 * This allows for non-linear exploration of the concept space.
 */

// Edge type representing connections between concepts
export interface Edge {
  source: string;        // ID of the source node
  target: string;        // ID of the target node
  type: EdgeType;        // Type of relationship
  weight: number;        // Connection strength (0.0 to 1.0)
  metadata?: Record<string, any>; // Additional properties
}

// Types of associative relationships between concepts
export enum EdgeType {
  METAPHOR_FOR = 'metaphor_for',        // Concept A is a metaphor for concept B
  CONTRASTS_WITH = 'contrasts_with',    // Concept A is opposite of concept B
  REMINDS_OF = 'reminds_of',            // Concept A triggers memory of concept B
  SYNTHESIZED_FROM = 'synthesized_from', // Concept C was created from concepts A and B
  CONTAINS = 'contains',                // Concept A is a superset of concept B
  SPECIALIZES = 'specializes',          // Concept A is a specific instance of concept B
  TRANSFORMS_INTO = 'transforms_into',  // Concept A can become concept B
  CAUSES = 'causes',                    // Concept A leads to concept B
}

// Node representing a concept in the dream space
export interface Node {
  id: string;               // Unique identifier
  content: string;          // The concept text/description
  creationTimestamp: number; // When the concept was generated
  semanticVector?: number[];  // Optional embedding representation
  driftDistance?: number;   // How far from original anchor (0.0 to 1.0)
  source?: string;          // Which tool generated this (drift/bisociation/etc)
  metadata?: Record<string, any>; // Additional tool-specific properties
}

/**
 * The Dream Graph - main data structure for Associative Dreaming
 * Implements a weighted, directed graph with typed edges
 */
export class DreamGraph {
  private nodes: Map<string, Node> = new Map();
  private edges: Edge[] = [];
  private traversalHistory: string[] = []; // Keeps track of the concept exploration path
  
  /**
   * Adds a concept node to the dream graph
   */
  public addNode(node: Node): void {
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
  public addEdge(edge: Edge): void {
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
  public visitNode(nodeId: string): void {
    if (!this.nodes.has(nodeId)) {
      throw new Error(`Cannot visit node '${nodeId}' as it does not exist`);
    }
    
    this.traversalHistory.push(nodeId);
  }
  
  /**
   * Gets all outgoing edges from a node
   */
  public getEdgesFrom(nodeId: string): Edge[] {
    return this.edges.filter(edge => edge.source === nodeId);
  }
  
  /**
   * Gets all incoming edges to a node
   */
  public getEdgesTo(nodeId: string): Edge[] {
    return this.edges.filter(edge => edge.target === nodeId);
  }
  
  /**
   * Gets all edges of a specific type
   */
  public getEdgesByType(type: EdgeType): Edge[] {
    return this.edges.filter(edge => edge.type === type);
  }
  
  /**
   * Gets a specific node by ID
   */
  public getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }
  
  /**
   * Gets all nodes in the graph
   */
  public getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }
  
  /**
   * Gets all edges in the graph
   */
  public getAllEdges(): Edge[] {
    return this.edges;
  }
  
  /**
   * Gets the traversal history (path of exploration)
   */
  public getTraversalHistory(): string[] {
    return [...this.traversalHistory];
  }
  
  /**
   * Gets the current/last visited node
   */
  public getCurrentNode(): Node | undefined {
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
  public findStructuralHoles(): Node[] {
    // Simple implementation: find nodes with incoming but no outgoing edges
    const potentialBridges: Node[] = [];
    
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
  public calculateDiversity(): number {
    // Simple implementation: use the number of different edge types as a proxy for diversity
    const uniqueEdgeTypes = new Set<EdgeType>();
    
    for (const edge of this.edges) {
      uniqueEdgeTypes.add(edge.type);
    }
    
    // Normalize by max possible edge types
    return uniqueEdgeTypes.size / Object.keys(EdgeType).length;
  }
  
  /**
   * Exports the graph in a format suitable for visualization
   */
  public exportGraph() {
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
