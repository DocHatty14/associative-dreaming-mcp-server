/**
 * Bisociative Synthesis - The Combinatorial Engine
 *
 * This tool forces the intersection of two unrelated matrices of thought.
 * Based on Arthur Koestler's theory of Bisociation and Conceptual Blending Theory,
 * it identifies structural similarities between disparate domains to generate
 * creative insights and bridge concepts.
 */

import { DreamGraph, Node, EdgeType } from '../graph.js';

// Domain categories for matrix B selection
// In a full implementation, these would be detailed domain knowledge bases
const DOMAINS = [
  {
    name: 'biology',
    concepts: ['evolution', 'ecosystem', 'cell', 'organism', 'adaptation', 'metabolism', 
               'symbiosis', 'homeostasis', 'mutation', 'natural selection', 'biodiversity'],
    structures: ['hierarchical organization', 'feedback loops', 'distributed networks', 
                 'emergent properties', 'specialization', 'redundancy', 'modularity']
  },
  {
    name: 'architecture',
    concepts: ['structure', 'form', 'function', 'space', 'material', 'aesthetic', 
               'context', 'scale', 'proportion', 'rhythm', 'balance'],
    structures: ['load-bearing systems', 'circulation patterns', 'modular components',
                 'layers', 'symmetry', 'negative space', 'environmental integration']
  },
  {
    name: 'music',
    concepts: ['harmony', 'rhythm', 'melody', 'timbre', 'composition', 'dynamics',
               'texture', 'tempo', 'counterpoint', 'resolution', 'theme'],
    structures: ['patterns', 'repetition with variation', 'layering', 'tension and release',
                 'call and response', 'transitions', 'development']
  },
  {
    name: 'economics',
    concepts: ['market', 'value', 'exchange', 'scarcity', 'efficiency', 'incentive',
               'competition', 'equilibrium', 'growth', 'distribution', 'trade'],
    structures: ['feedback mechanisms', 'flows', 'game theory', 'network effects',
                 'optimization', 'resource allocation', 'supply chains']
  },
  {
    name: 'mythology',
    concepts: ['archetype', 'hero', 'journey', 'transformation', 'symbol', 'ritual',
               'divine', 'mortal', 'underworld', 'creation', 'destruction'],
    structures: ['cyclical patterns', 'opposing forces', 'symbolic representations', 
                 'narrative arcs', 'thresholds', 'tests', 'metaphorical layers']
  },
  {
    name: 'game design',
    concepts: ['rules', 'mechanics', 'balance', 'progression', 'engagement', 'challenge',
               'feedback', 'player agency', 'reward', 'strategy', 'emergence'],
    structures: ['core loops', 'risk/reward systems', 'decision trees', 'progression curves', 
                 'balance triangles', 'economies', 'state machines']
  }
];

// Structural patterns that can be mapped across domains
const ISOMORPHIC_PATTERNS = [
  {
    name: 'hierarchy',
    description: 'Layered organization with relationships of control or composition',
    examples: {
      'biology': 'ecosystems → communities → populations → organisms → organs → cells',
      'computing': 'systems → applications → functions → algorithms → operations',
      'management': 'corporation → divisions → departments → teams → individuals'
    }
  },
  {
    name: 'network',
    description: 'Decentralized connections between nodes with pathways for exchange',
    examples: {
      'biology': 'neural networks, mycelial networks, food webs',
      'computing': 'internet, social networks, distributed systems',
      'transportation': 'highway systems, flight routes, shipping lanes'
    }
  },
  {
    name: 'cycle',
    description: 'Processes that return to their starting point creating loops',
    examples: {
      'biology': 'water cycle, carbon cycle, cell cycle',
      'economics': 'business cycles, circular economy',
      'mythology': 'hero\'s journey, death and rebirth'
    }
  },
  {
    name: 'emergence',
    description: 'Complex properties arising from simple components or rules',
    examples: {
      'biology': 'consciousness from neurons, flocking behavior',
      'computing': 'artificial intelligence, cellular automata',
      'sociology': 'cultural trends, market behavior'
    }
  },
  {
    name: 'feedback',
    description: 'Outputs of a system returning as inputs, creating loops',
    examples: {
      'biology': 'homeostasis, ecosystem balance',
      'engineering': 'control systems, audio feedback',
      'economics': 'price mechanisms, supply and demand'
    }
  },
  {
    name: 'symmetry-breaking',
    description: 'Transition from uniform to varied states',
    examples: {
      'physics': 'phase transitions, crystallization',
      'biology': 'embryonic development, cell differentiation',
      'art': 'contrast, focal points'
    }
  }
];

// Types for the bisociative synthesis tool
export interface BisociativeSynthesisInput {
  matrixA: string; // The problem domain
  matrixB?: string; // The stimulus domain (optional - will be auto-selected if not provided)
  blendType?: string; // Optional: specific structural pattern to use for mapping
}

export interface BisociativeSynthesisOutput {
  bridgeConcept: string;
  matrixA: string;
  matrixB: string;
  pattern: string;
  mapping: Record<string, string>; // Shows how concepts map between domains
  explanation: string;
}

/**
 * The Bisociative Synthesis tool
 * Combines concepts from different matrices of thought
 */
export class BisociativeSynthesisTool {
  private dreamGraph: DreamGraph;
  
  constructor(dreamGraph: DreamGraph) {
    this.dreamGraph = dreamGraph;
  }
  
  public performSynthesis(input: BisociativeSynthesisInput): BisociativeSynthesisOutput {
    const { matrixA, matrixB, blendType } = input;
    
    // Validate input
    if (!matrixA || matrixA.trim() === '') {
      throw new Error('Matrix A (problem domain) is required');
    }
    
    // If matrixB is not provided, select one randomly
    const selectedMatrixB = matrixB || this.selectRandomDomain(matrixA);
    
    // Identify patterns in the problem domain
    const patternA = this.identifyPatterns(matrixA);
    
    // Find matching patterns in the stimulus domain
    const patternB = this.identifyPatterns(selectedMatrixB);
    
    // Select the most promising isomorphism (structural similarity)
    // Use blendType if provided, otherwise find the best match
    const isomorphism = this.findIsomorphism(patternA, patternB, blendType);
    
    // Create a mapping between the domains
    const mapping = this.createMapping(matrixA, selectedMatrixB, isomorphism);
    
    // Generate the bridge concept
    const bridgeConcept = this.generateBridgeConcept(matrixA, selectedMatrixB, isomorphism, mapping);
    
    // Create explanation
    const explanation = this.createExplanation(matrixA, selectedMatrixB, isomorphism, mapping, bridgeConcept);
    
    // Update the dream graph
    this.updateDreamGraph(matrixA, selectedMatrixB, isomorphism, bridgeConcept);
    
    return {
      bridgeConcept,
      matrixA,
      matrixB: selectedMatrixB,
      pattern: isomorphism.name,
      mapping,
      explanation
    };
  }
  
  /**
   * Selects a random domain different from matrixA
   */
  private selectRandomDomain(matrixA: string): string {
    // Filter out domains that are too similar to matrixA
    const eligibleDomains = DOMAINS.filter(domain => 
      !matrixA.toLowerCase().includes(domain.name.toLowerCase()) && 
      !domain.name.toLowerCase().includes(matrixA.toLowerCase()));
    
    if (eligibleDomains.length === 0) {
      return DOMAINS[Math.floor(Math.random() * DOMAINS.length)].name;
    }
    
    return eligibleDomains[Math.floor(Math.random() * eligibleDomains.length)].name;
  }
  
  /**
   * Identifies patterns in a given domain
   */
  private identifyPatterns(domain: string): string[] {
    // In a full implementation, this would use NLP or knowledge graphs
    // For the simplified version, we'll use keyword matching
    
    const patterns: string[] = [];
    
    // Check for keywords related to each pattern
    for (const pattern of ISOMORPHIC_PATTERNS) {
      // Check if any examples contain the domain
      for (const [exampleDomain, example] of Object.entries(pattern.examples)) {
        if (
          domain.toLowerCase().includes(exampleDomain.toLowerCase()) ||
          exampleDomain.toLowerCase().includes(domain.toLowerCase())
        ) {
          patterns.push(pattern.name);
          break;
        }
      }
      
      // Check if the domain text itself hints at the pattern
      if (
        domain.toLowerCase().includes(pattern.name.toLowerCase()) ||
        pattern.description.toLowerCase().includes(domain.toLowerCase())
      ) {
        if (!patterns.includes(pattern.name)) {
          patterns.push(pattern.name);
        }
      }
    }
    
    // If no specific patterns identified, include some defaults
    if (patterns.length === 0) {
      patterns.push('hierarchy', 'network', 'feedback');
    }
    
    return patterns;
  }
  
  /**
   * Finds an isomorphic pattern between two domains
   */
  private findIsomorphism(patternsA: string[], patternsB: string[], preferredPattern?: string): typeof ISOMORPHIC_PATTERNS[0] {
    // If a preferred pattern is specified and it's valid, use that
    if (preferredPattern) {
      const pattern = ISOMORPHIC_PATTERNS.find(p => p.name.toLowerCase() === preferredPattern.toLowerCase());
      if (pattern) {
        return pattern;
      }
    }
    
    // Find patterns common to both domains
    const commonPatterns = patternsA.filter(p => patternsB.includes(p));
    
    if (commonPatterns.length > 0) {
      // Select a common pattern
      const selectedPatternName = commonPatterns[Math.floor(Math.random() * commonPatterns.length)];
      const pattern = ISOMORPHIC_PATTERNS.find(p => p.name === selectedPatternName);
      if (pattern) return pattern;
    }
    
    // If no common patterns, select a random one
    return ISOMORPHIC_PATTERNS[Math.floor(Math.random() * ISOMORPHIC_PATTERNS.length)];
  }
  
  /**
   * Creates a mapping between concepts in the two domains
   */
  private createMapping(domainA: string, domainB: string, pattern: typeof ISOMORPHIC_PATTERNS[0]): Record<string, string> {
    const mapping: Record<string, string> = {};
    
    // In a full implementation, this would use more sophisticated techniques
    // For the simplified version, we'll use some predefined mappings
    
    // Find the domain objects
    const domainBObj = DOMAINS.find(d => d.name.toLowerCase() === domainB.toLowerCase());
    
    if (domainBObj) {
      // For each pattern, create conceptual mappings
      switch (pattern.name) {
        case 'hierarchy':
          mapping['levels'] = 'hierarchy';
          mapping['organization'] = 'taxonomy';
          mapping['top-level'] = domainBObj.concepts[0] || 'system';
          mapping['components'] = domainBObj.concepts[2] || 'elements';
          break;
          
        case 'network':
          mapping['connections'] = 'relationships';
          mapping['nodes'] = domainBObj.concepts[1] || 'entities';
          mapping['paths'] = 'flows';
          mapping['clusters'] = 'communities';
          break;
          
        case 'cycle':
          mapping['process'] = 'transformation';
          mapping['stages'] = 'phases';
          mapping['repetition'] = 'rhythm';
          mapping['evolution'] = domainBObj.concepts[3] || 'development';
          break;
          
        case 'emergence':
          mapping['simple rules'] = 'basic patterns';
          mapping['complexity'] = 'sophistication';
          mapping['unexpected'] = 'surprising';
          mapping['higher order'] = domainBObj.concepts[4] || 'emergent';
          break;
          
        case 'feedback':
          mapping['input'] = 'stimulus';
          mapping['output'] = 'response';
          mapping['adjustment'] = 'calibration';
          mapping['balance'] = domainBObj.concepts[5] || 'equilibrium';
          break;
          
        case 'symmetry-breaking':
          mapping['uniformity'] = 'sameness';
          mapping['diversity'] = 'variation';
          mapping['transition'] = 'transformation';
          mapping['catalyst'] = domainBObj.concepts[6] || 'trigger';
          break;
          
        default:
          mapping['concept'] = domainBObj.concepts[0] || 'element';
          mapping['structure'] = domainBObj.structures[0] || 'pattern';
          mapping['process'] = 'method';
          mapping['goal'] = 'purpose';
      }
    } else {
      // Default mappings if domain not found
      mapping['element'] = 'component';
      mapping['process'] = 'method';
      mapping['structure'] = 'organization';
      mapping['relationship'] = 'connection';
    }
    
    return mapping;
  }
  
  /**
   * Generates a bridge concept connecting the two domains
   */
  private generateBridgeConcept(domainA: string, domainB: string, pattern: typeof ISOMORPHIC_PATTERNS[0], mapping: Record<string, string>): string {
    // In a real implementation, this would be more sophisticated
    // For now, we'll use a template-based approach
    
    const templates = [
      `The ${pattern.name} of ${domainA} as a ${domainB} system`,
      `${domainB}-inspired approach to ${domainA}`,
      `Reimagining ${domainA} through the lens of ${domainB} ${pattern.name}`,
      `${domainA} ${mapping['structure'] || 'structure'} based on ${domainB} principles`,
      `The ${domainB} model of ${domainA} development`,
      `${capitalize(domainA)} as a ${pattern.name}-driven ${domainB} process`,
      `${capitalize(domainB)}-like ${pattern.name} in ${domainA} systems`,
      `${capitalize(domainA)} ${mapping['process'] || 'processes'} through ${domainB} metaphors`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }
  
  /**
   * Creates an explanation of the bisociative synthesis
   */
  private createExplanation(domainA: string, domainB: string, pattern: typeof ISOMORPHIC_PATTERNS[0], mapping: Record<string, string>, bridgeConcept: string): string {
    const firstExampleKey = Object.keys(pattern.examples)[0] || '';
    const secondExampleKey = Object.keys(pattern.examples)[1] || '';
    const firstExample = firstExampleKey ? (pattern.examples as any)[firstExampleKey] : 'structured relationships';
    const secondExample = secondExampleKey ? (pattern.examples as any)[secondExampleKey] : 'organized components';

    return `
BISOCIATIVE SYNTHESIS: ${bridgeConcept}

PATTERN: ${pattern.name}
${pattern.description}

MAPPING:
${Object.entries(mapping).map(([key, value]) => `- ${key} in ${domainA} → ${value} in ${domainB}`).join('\n')}

EXPLANATION:
I've identified the "${pattern.name}" pattern as a common structure between ${domainA} and ${domainB}.
This pattern manifests in ${domainA} as ${firstExample}.
Similarly, in ${domainB} it appears as ${secondExample}.

By mapping concepts between these domains, we can see how the structure of ${domainB} offers 
a novel perspective on ${domainA}. The bridge concept "${bridgeConcept}" represents
this synthesis of ideas across conceptual boundaries.

This connection suggests new approaches such as:
1. Analyzing ${domainA} using ${domainB} frameworks
2. Applying ${domainB} principles to solve ${domainA} problems
3. Creating a new hybrid model that incorporates elements from both domains
`;
  }
  
  /**
   * Updates the dream graph with the bisociative synthesis
   */
  private updateDreamGraph(domainA: string, domainB: string, pattern: typeof ISOMORPHIC_PATTERNS[0], bridgeConcept: string): void {
    // Create IDs for the nodes
    const domainAId = `domain-${Date.now()}-${Math.floor(Math.random() * 1000)}-A`;
    const domainBId = `domain-${Date.now()}-${Math.floor(Math.random() * 1000)}-B`;
    const bridgeId = `bridge-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Add domain A node
    try {
      this.dreamGraph.addNode({
        id: domainAId,
        content: domainA,
        creationTimestamp: Date.now(),
        source: 'bisociative_synthesis',
        metadata: { isMatrixA: true, pattern: pattern.name }
      });
    } catch (error) {
      console.error('Error adding domain A node to graph:', error);
    }
    
    // Add domain B node
    try {
      this.dreamGraph.addNode({
        id: domainBId,
        content: domainB,
        creationTimestamp: Date.now(),
        source: 'bisociative_synthesis',
        metadata: { isMatrixB: true, pattern: pattern.name }
      });
    } catch (error) {
      console.error('Error adding domain B node to graph:', error);
    }
    
    // Add bridge concept node
    try {
      this.dreamGraph.addNode({
        id: bridgeId,
        content: bridgeConcept,
        creationTimestamp: Date.now(),
        source: 'bisociative_synthesis',
        metadata: { isBridgeConcept: true, pattern: pattern.name, domains: [domainA, domainB] }
      });
    } catch (error) {
      console.error('Error adding bridge concept node to graph:', error);
    }
    
    // Add edges
    try {
      // Domain A to Bridge
      this.dreamGraph.addEdge({
        source: domainAId,
        target: bridgeId,
        type: EdgeType.SYNTHESIZED_FROM,
        weight: 0.8,
        metadata: { pattern: pattern.name, role: 'problem domain' }
      });
      
      // Domain B to Bridge
      this.dreamGraph.addEdge({
        source: domainBId,
        target: bridgeId,
        type: EdgeType.SYNTHESIZED_FROM,
        weight: 0.8,
        metadata: { pattern: pattern.name, role: 'stimulus domain' }
      });
    } catch (error) {
      console.error('Error adding edges to graph:', error);
    }
    
    // Visit the bridge concept in the dream graph
    this.dreamGraph.visitNode(bridgeId);
  }
}

// Helper function to capitalize the first letter
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
