/**
 * Serendipity Scan - The Unknown Unknown Finder
 *
 * This tool automates the search for "Unknown Unknowns" - connections and insights
 * that would normally be missed through linear thinking. It analyzes the dream graph
 * for structural holes and disconnected clusters, then identifies potential bridges
 * that could connect these disparate ideas.
 */
import { EdgeType } from '../graph.js';
/**
 * The Serendipity Scan tool
 * Identifies surprising connections and bridges between disconnected concepts
 */
export class SerendipityScanTool {
    dreamGraph;
    constructor(dreamGraph) {
        this.dreamGraph = dreamGraph;
    }
    performScan(input) {
        const { currentContext, noveltyThreshold = 0.7, scanType = 'bridge' } = input;
        // Validate input
        if (noveltyThreshold < 0 || noveltyThreshold > 1) {
            throw new Error('Novelty threshold must be between 0.0 and 1.0');
        }
        // Get the current state of the dream graph
        const allNodes = this.dreamGraph.getAllNodes();
        // If the graph is too small, we need to generate a fallback
        if (allNodes.length < 3) {
            return this.generateFallbackResult(currentContext, noveltyThreshold, scanType);
        }
        // Find potential bridges or gaps based on scan type
        let discoveredNode;
        let relatedNodes = [];
        let explanation = '';
        switch (scanType) {
            case 'bridge':
                // Find nodes that can bridge disconnected clusters
                const potentialBridges = this.dreamGraph.findStructuralHoles();
                if (potentialBridges.length > 0) {
                    // Select a bridge based on novelty threshold
                    // Higher novelty = more random selection
                    const randomIndex = Math.floor(potentialBridges.length * noveltyThreshold);
                    discoveredNode = potentialBridges[Math.min(randomIndex, potentialBridges.length - 1)];
                    // Find related nodes (connected through incoming edges)
                    relatedNodes = this.findRelatedNodes(discoveredNode.id);
                    explanation = `I've identified "${discoveredNode.content}" as a potential bridge concept. This concept has connections to multiple clusters in your thinking but hasn't been fully explored yet. By developing this bridge, you may discover new pathways between seemingly unrelated ideas.`;
                }
                break;
            case 'gap':
                // Find isolated nodes or concepts with few connections
                const isolatedNodes = allNodes.filter(node => {
                    const incomingEdges = this.dreamGraph.getEdgesTo(node.id);
                    const outgoingEdges = this.dreamGraph.getEdgesFrom(node.id);
                    return (incomingEdges.length + outgoingEdges.length) <= 1;
                });
                if (isolatedNodes.length > 0) {
                    // Select an isolated node based on novelty threshold
                    const randomIndex = Math.floor(isolatedNodes.length * noveltyThreshold);
                    discoveredNode = isolatedNodes[Math.min(randomIndex, isolatedNodes.length - 1)];
                    // Find all other nodes to identify potential connections
                    relatedNodes = allNodes.filter(n => n.id !== discoveredNode.id)
                        .slice(0, 3); // Limit to a few examples
                    explanation = `I've identified "${discoveredNode.content}" as an isolated concept in your thinking. This idea has been mentioned but not connected to your other thoughts. Consider how this concept might relate to other ideas you're exploring.`;
                }
                break;
            case 'pattern':
                // Find recurring patterns/themes across the graph
                // This is simplified - in a full implementation would use more sophisticated pattern recognition
                const edgeTypes = new Set();
                this.dreamGraph.getAllEdges().forEach(edge => edgeTypes.add(edge.type));
                // Find the most common edge type
                let mostCommonType = EdgeType.REMINDS_OF;
                let highestCount = 0;
                edgeTypes.forEach(type => {
                    const count = this.dreamGraph.getEdgesByType(type).length;
                    if (count > highestCount) {
                        highestCount = count;
                        mostCommonType = type;
                    }
                });
                // Find nodes connected by this type
                const patternsNodes = allNodes.filter(node => {
                    const outgoingEdges = this.dreamGraph.getEdgesFrom(node.id);
                    return outgoingEdges.some(edge => edge.type === mostCommonType);
                });
                if (patternsNodes.length > 0) {
                    // Select a pattern node
                    const randomIndex = Math.floor(patternsNodes.length * noveltyThreshold);
                    discoveredNode = patternsNodes[Math.min(randomIndex, patternsNodes.length - 1)];
                    // Find related nodes (connected through the common edge type)
                    const relatedEdges = this.dreamGraph.getEdgesFrom(discoveredNode.id)
                        .filter(edge => edge.type === mostCommonType);
                    relatedNodes = relatedEdges.map(edge => this.dreamGraph.getNode(edge.target)).filter((node) => node !== undefined);
                    explanation = `I've identified a pattern involving "${discoveredNode.content}" in your thinking. This concept frequently connects to others through a "${mostCommonType}" relationship. This recurring pattern might reveal an underlying theme or approach that could be applied more broadly.`;
                }
                break;
            case 'random':
            default:
                // Select a random node and find unexpected connections
                const randomIndex = Math.floor(allNodes.length * noveltyThreshold);
                discoveredNode = allNodes[Math.min(randomIndex, allNodes.length - 1)];
                // Find nodes that are semantically distant but potentially related
                relatedNodes = allNodes
                    .filter(n => n.id !== discoveredNode.id)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3);
                explanation = `I've randomly selected "${discoveredNode.content}" to introduce an element of serendipity. Sometimes the most insightful connections come from exploring concepts that aren't obviously related to your current focus. Consider how this concept might offer a fresh perspective.`;
                break;
        }
        // If we couldn't find anything in the graph, fall back to generated content
        if (!discoveredNode) {
            return this.generateFallbackResult(currentContext, noveltyThreshold, scanType);
        }
        // Calculate a "serendipity score" based on novelty and relevance
        // High novelty + some relevance = high serendipity
        const novelty = noveltyThreshold;
        const relevance = 1 - (noveltyThreshold * 0.5); // Higher threshold = slightly lower relevance
        const serendipityScore = (novelty * 0.7) + (relevance * 0.3);
        // Update the dream graph with the serendipitous discovery
        const relatedConceptIds = relatedNodes.map(node => node.id);
        this.updateDreamGraph(discoveredNode, relatedConceptIds, scanType, serendipityScore);
        return {
            discoveredConcept: discoveredNode.content,
            scanType,
            serendipityScore,
            relatedConcepts: relatedNodes.map(node => node.content),
            explanation
        };
    }
    /**
     * Finds nodes related to a given node
     */
    findRelatedNodes(nodeId) {
        // Get incoming edges to this node
        const incomingEdges = this.dreamGraph.getEdgesTo(nodeId);
        // Get the source nodes of those edges
        const relatedNodes = [];
        incomingEdges.forEach(edge => {
            const sourceNode = this.dreamGraph.getNode(edge.source);
            if (sourceNode) {
                relatedNodes.push(sourceNode);
            }
        });
        // If we don't have enough related nodes, also check outgoing edges
        if (relatedNodes.length < 2) {
            const outgoingEdges = this.dreamGraph.getEdgesFrom(nodeId);
            outgoingEdges.forEach(edge => {
                const targetNode = this.dreamGraph.getNode(edge.target);
                if (targetNode) {
                    relatedNodes.push(targetNode);
                }
            });
        }
        return relatedNodes;
    }
    /**
     * Updates the dream graph with the serendipitous discovery
     */
    updateDreamGraph(discoveredNode, relatedNodeIds, scanType, serendipityScore) {
        // We'll mark this node as a serendipitous discovery by updating its metadata
        const nodeWithUpdatedMetadata = {
            ...discoveredNode,
            metadata: {
                ...discoveredNode.metadata,
                isSerendipitousDiscovery: true,
                scanType,
                serendipityScore,
                discoveryTimestamp: Date.now()
            }
        };
        // In a real implementation, we would update the node in the graph
        // Here, we just visit it to mark it as the current focus
        this.dreamGraph.visitNode(discoveredNode.id);
        // In a full implementation, we would also create new edges showing
        // potential connections between this node and other relevant nodes
    }
    /**
     * Generates a fallback result when the graph is too small
     */
    generateFallbackResult(currentContext, noveltyThreshold, scanType) {
        // Generate a serendipitous concept based on the current context
        let discoveredConcept = "";
        let explanation = "";
        let relatedConcepts = [];
        // Extract key terms from the current context
        const contextWords = currentContext.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 3);
        // Select a key word if possible
        let keyWord = "concept";
        if (contextWords.length > 0) {
            keyWord = contextWords[Math.floor(Math.random() * contextWords.length)];
        }
        // Create a serendipitous concept based on scan type
        switch (scanType) {
            case 'bridge':
                discoveredConcept = `Unexpected connection between ${keyWord} and ${this.getOppositeWord(keyWord)}`;
                relatedConcepts = [keyWord, this.getOppositeWord(keyWord), "synthesis", "connection"];
                explanation = `I've identified a potential bridge between the concept of "${keyWord}" and its seeming opposite. Though these ideas appear unrelated, there may be a hidden connection that could lead to novel insights.`;
                break;
            case 'gap':
                discoveredConcept = `Unexplored aspect of ${keyWord}: ${this.getRelatedWord(keyWord)}`;
                relatedConcepts = [keyWord, this.getRelatedWord(keyWord), "depth", "nuance"];
                explanation = `I've identified an unexplored aspect of "${keyWord}" that hasn't been considered yet. This dimension adds complexity and nuance to your understanding of the concept.`;
                break;
            case 'pattern':
                discoveredConcept = `Recurring pattern: ${this.getAbstractWord(keyWord)}`;
                relatedConcepts = [keyWord, this.getAbstractWord(keyWord), "recurrence", "theme"];
                explanation = `I've identified an abstract pattern that seems to recur in your thinking about "${keyWord}". This underlying theme might connect to other areas in ways you haven't considered.`;
                break;
            case 'random':
            default:
                discoveredConcept = `Random association: ${keyWord} → ${this.getRandomWord()}`;
                relatedConcepts = [keyWord, this.getRandomWord(), "possibility", "chance"];
                explanation = `I've made a random association to introduce serendipity into your thinking about "${keyWord}". Sometimes the most creative insights come from unexpected connections.`;
                break;
        }
        // Calculate serendipity score
        const novelty = noveltyThreshold;
        const relevance = 1 - (noveltyThreshold * 0.5);
        const serendipityScore = (novelty * 0.7) + (relevance * 0.3);
        // Create a node for this in the dream graph
        const nodeId = `discovery-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        try {
            this.dreamGraph.addNode({
                id: nodeId,
                content: discoveredConcept,
                creationTimestamp: Date.now(),
                source: 'serendipity_scan',
                metadata: {
                    isSerendipitousDiscovery: true,
                    scanType,
                    serendipityScore,
                    isGenerated: true
                }
            });
            // Visit this node
            this.dreamGraph.visitNode(nodeId);
        }
        catch (error) {
            console.error('Error adding node to graph:', error);
        }
        return {
            discoveredConcept,
            scanType,
            serendipityScore,
            relatedConcepts,
            explanation
        };
    }
    /**
     * Gets a word that is conceptually opposite to the input
     */
    getOppositeWord(word) {
        const opposites = {
            "problem": "solution",
            "challenge": "opportunity",
            "complexity": "simplicity",
            "chaos": "order",
            "logic": "intuition",
            "analysis": "synthesis",
            "detail": "big picture",
            "concrete": "abstract",
            "digital": "analog",
            "technical": "creative",
            "rigid": "flexible",
            "focused": "diffuse"
        };
        return opposites[word.toLowerCase()] || "complementary concept";
    }
    /**
     * Gets a word that is related to but different from the input
     */
    getRelatedWord(word) {
        const related = {
            "problem": "root cause",
            "challenge": "resistance",
            "complexity": "emergence",
            "chaos": "dynamism",
            "logic": "rationality",
            "analysis": "decomposition",
            "detail": "minutiae",
            "concrete": "tangible",
            "digital": "computational",
            "technical": "methodological",
            "rigid": "structured",
            "focused": "attentional"
        };
        return related[word.toLowerCase()] || "related dimension";
    }
    /**
     * Gets a more abstract/general word related to the input
     */
    getAbstractWord(word) {
        const abstractions = {
            "problem": "tension",
            "challenge": "constraint",
            "complexity": "intricacy",
            "chaos": "unpredictability",
            "logic": "reasoning",
            "analysis": "examination",
            "detail": "specificity",
            "concrete": "manifestation",
            "digital": "discretization",
            "technical": "expertise",
            "rigid": "inflexibility",
            "focused": "concentration"
        };
        return abstractions[word.toLowerCase()] || "meta-pattern";
    }
    /**
     * Gets a random word for serendipitous connections
     */
    getRandomWord() {
        const randomWords = [
            "butterfly", "quantum", "shadow", "echo", "paradox",
            "horizon", "nebula", "catalyst", "mosaic", "labyrinth",
            "fractal", "osmosis", "resonance", "entropy", "synergy"
        ];
        return randomWords[Math.floor(Math.random() * randomWords.length)];
    }
}
