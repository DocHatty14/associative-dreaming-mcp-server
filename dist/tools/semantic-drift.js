/**
 * Semantic Drift - Controlled Hallucination Engine
 *
 * This tool implements a stochastic random walk through the concept space,
 * seeking semantically distant yet contextually relevant concepts.
 *
 * Unlike nearest-neighbor searches that find synonyms or closely related concepts,
 * semantic drift deliberately searches for concepts that are in a "Serendipity Zone"
 * (not too close, not too far) to promote lateral thinking.
 */
import { EdgeType } from '../graph.js';
// Simple semantic categories for the simplified implementation
// In a full implementation, this would use actual vector embeddings
const SEMANTIC_CATEGORIES = [
    'nature', 'technology', 'art', 'science', 'philosophy', 'history',
    'mathematics', 'literature', 'music', 'architecture', 'psychology',
    'physics', 'biology', 'chemistry', 'economics', 'politics', 'religion',
    'medicine', 'engineering', 'design', 'education', 'environment', 'society'
];
// Word associations for simplified semantic drift
// In a full implementation, this would use actual word embeddings or a vector DB
const WORD_ASSOCIATIONS = {
    'water': ['flow', 'river', 'ocean', 'liquid', 'drink', 'life', 'clean', 'blue', 'waves'],
    'tree': ['forest', 'leaves', 'roots', 'growth', 'wood', 'branches', 'green', 'shade', 'oxygen'],
    'algorithm': ['computation', 'steps', 'solution', 'code', 'process', 'efficiency', 'logic', 'sequence', 'optimization'],
    'creativity': ['imagination', 'innovation', 'art', 'expression', 'originality', 'design', 'ideas', 'inspiration', 'vision'],
    'network': ['connections', 'graph', 'nodes', 'internet', 'social', 'links', 'web', 'communication', 'system'],
    'pattern': ['repetition', 'design', 'structure', 'recognition', 'order', 'template', 'arrangement', 'symmetry', 'motif'],
    'problem': ['solution', 'challenge', 'difficulty', 'obstacle', 'issue', 'question', 'puzzle', 'dilemma', 'complexity'],
    'insight': ['understanding', 'revelation', 'clarity', 'perception', 'awareness', 'realization', 'discovery', 'intuition', 'epiphany']
};
/**
 * The Semantic Drift tool
 * Generates concepts that are semantically distant but contextually relevant
 */
export class SemanticDriftTool {
    dreamGraph;
    constructor(dreamGraph) {
        this.dreamGraph = dreamGraph;
    }
    performDrift(input) {
        const { anchorConcept, driftMagnitude, temperature = 0.7 } = input;
        // Validate input
        if (driftMagnitude < 0 || driftMagnitude > 1) {
            throw new Error('Drift magnitude must be between 0.0 and 1.0');
        }
        // For the simplified implementation, we'll use the word associations
        // and a random categorical drift based on the magnitude
        let driftPath = [anchorConcept];
        let currentConcept = anchorConcept;
        let explanation = `Starting from concept: "${anchorConcept}"\n`;
        // Determine how many "hops" to make based on drift magnitude
        // Higher magnitude = more hops = further drift
        const numberOfHops = Math.max(1, Math.round(driftMagnitude * 3));
        // Perform the drift
        for (let i = 0; i < numberOfHops; i++) {
            // Find associations for the current concept
            let associations = this.findAssociations(currentConcept);
            // If we can't find direct associations, use a random category
            if (associations.length === 0) {
                const randomCategory = SEMANTIC_CATEGORIES[Math.floor(Math.random() * SEMANTIC_CATEGORIES.length)];
                explanation += `No direct associations found. Jumping to random category: ${randomCategory}\n`;
                currentConcept = randomCategory;
                driftPath.push(currentConcept);
                continue;
            }
            // Calculate a "serendipity zone" based on temperature and drift magnitude
            // Higher temperature = more randomness in selection
            const serendipityIndex = Math.floor(associations.length * (0.3 + (temperature * 0.7)));
            currentConcept = associations[serendipityIndex % associations.length];
            explanation += `Drifting to: "${currentConcept}" (association hop ${i + 1})\n`;
            driftPath.push(currentConcept);
        }
        // The final concept after the drift
        const newConcept = driftPath[driftPath.length - 1];
        // Add nodes and edges to the graph
        this.updateDreamGraph(anchorConcept, newConcept, driftPath, driftMagnitude);
        return {
            newConcept,
            driftPath,
            driftDistance: driftMagnitude,
            explanation
        };
    }
    /**
     * Finds semantic associations for a concept
     */
    findAssociations(concept) {
        // First check direct word associations
        if (concept.toLowerCase() in WORD_ASSOCIATIONS) {
            return WORD_ASSOCIATIONS[concept.toLowerCase()];
        }
        // If not found in direct associations, check if the word is in any associations lists
        for (const [word, associations] of Object.entries(WORD_ASSOCIATIONS)) {
            if (associations.includes(concept.toLowerCase())) {
                // Return the source word plus other associations, but not the concept itself
                return [word, ...associations.filter(a => a !== concept.toLowerCase())];
            }
        }
        // If no associations found, return an empty array
        return [];
    }
    /**
     * Updates the dream graph with new nodes and edges from the drift
     */
    updateDreamGraph(anchorConcept, newConcept, driftPath, driftMagnitude) {
        // Create a unique ID for the anchor node if it doesn't exist yet
        const anchorId = `concept-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const newConceptId = `concept-${Date.now()}-${Math.floor(Math.random() * 1000)}-drift`;
        // Add the anchor node if it's not in the graph already
        try {
            this.dreamGraph.addNode({
                id: anchorId,
                content: anchorConcept,
                creationTimestamp: Date.now(),
                source: 'semantic_drift',
                metadata: { isDriftAnchor: true }
            });
        }
        catch (error) {
            // Node might already exist, get existing nodes by content
            const nodes = this.dreamGraph.getAllNodes();
            const existingAnchorNode = nodes.find(n => n.content === anchorConcept);
            if (existingAnchorNode) {
                // Use the existing node ID
            }
        }
        // Add the new concept node
        try {
            this.dreamGraph.addNode({
                id: newConceptId,
                content: newConcept,
                creationTimestamp: Date.now(),
                driftDistance: driftMagnitude,
                source: 'semantic_drift',
                metadata: { driftPath }
            });
        }
        catch (error) {
            // Handle potential errors
            console.error('Error adding node to graph:', error);
        }
        // Add an edge between the anchor and the drifted concept
        try {
            this.dreamGraph.addEdge({
                source: anchorId,
                target: newConceptId,
                type: EdgeType.TRANSFORMS_INTO,
                weight: 1.0 - driftMagnitude, // Higher drift = lower weight
                metadata: { driftPath }
            });
        }
        catch (error) {
            // Handle potential errors
            console.error('Error adding edge to graph:', error);
        }
        // Visit the new concept in the dream graph
        this.dreamGraph.visitNode(newConceptId);
    }
}
