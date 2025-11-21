/**
 * Serendipity Scan - The Unknown Unknown Finder (V3.0 - LLM-SCAFFOLDED)
 *
 * This tool automates the search for "Unknown Unknowns" - connections and insights
 * that would typically be missed through linear thinking.
 *
 * V3.0 MAJOR REFACTOR:
 * - NOW WORKS ON EMPTY GRAPHS - mines user context directly
 * - Outputs LLM scaffolds instead of template strings
 * - Context-mining mode: extracts concepts from user input when graph is empty
 * - Seed generation: identifies high-potential entry points for exploration
 * - "Because chains" for all discoveries
 */

import { DreamGraph, Node, EdgeType } from "../graph.js";
import {
  generateSerendipityMiningScaffold,
  formatScaffoldAsPrompt,
  CreativeScaffold,
  GraphStateContext,
} from "../prompts/creative-scaffolds.js";

// Concept extraction patterns for mining user context
const CONCEPT_EXTRACTION_PATTERNS = [
  // Technical concepts
  {
    pattern:
      /\b(algorithm|system|process|method|approach|framework|architecture|design|pattern|model)\b/gi,
    weight: 0.8,
  },
  // Domain concepts
  {
    pattern:
      /\b(market|customer|user|product|service|platform|tool|solution|challenge|problem|opportunity)\b/gi,
    weight: 0.7,
  },
  // Action concepts
  {
    pattern:
      /\b(create|build|optimize|improve|transform|connect|integrate|automate|scale|grow)\b/gi,
    weight: 0.6,
  },
  // Abstract concepts
  {
    pattern:
      /\b(innovation|creativity|efficiency|value|impact|change|growth|strategy|vision|goal)\b/gi,
    weight: 0.9,
  },
  // Relationship concepts
  {
    pattern:
      /\b(relationship|connection|network|community|collaboration|partnership|ecosystem)\b/gi,
    weight: 0.75,
  },
];

// Seed domains for empty-graph exploration
const SEED_DOMAINS = [
  {
    name: "structural",
    probes: [
      "What underlying structure does this have?",
      "What patterns repeat?",
      "What's the hierarchy?",
    ],
    concepts: [
      "architecture",
      "framework",
      "layers",
      "modules",
      "dependencies",
      "flow",
    ],
  },
  {
    name: "temporal",
    probes: [
      "What changes over time?",
      "What are the phases?",
      "What cycles exist?",
    ],
    concepts: [
      "lifecycle",
      "evolution",
      "rhythm",
      "seasons",
      "decay",
      "growth",
      "momentum",
    ],
  },
  {
    name: "relational",
    probes: [
      "What connects to what?",
      "What depends on what?",
      "Who affects whom?",
    ],
    concepts: [
      "network",
      "ecosystem",
      "symbiosis",
      "competition",
      "collaboration",
      "hierarchy",
    ],
  },
  {
    name: "transformational",
    probes: [
      "What transforms into what?",
      "What's the input/output?",
      "What catalyzes change?",
    ],
    concepts: [
      "catalyst",
      "threshold",
      "metamorphosis",
      "conversion",
      "emergence",
      "crystallization",
    ],
  },
  {
    name: "oppositional",
    probes: ["What's the opposite?", "What's in tension?", "What's missing?"],
    concepts: [
      "shadow",
      "complement",
      "paradox",
      "absence",
      "void",
      "negative space",
    ],
  },
  {
    name: "analogical",
    probes: [
      "What else works like this?",
      "Where have I seen this pattern?",
      "What's this a metaphor for?",
    ],
    concepts: [
      "isomorphism",
      "parallel",
      "mirror",
      "translation",
      "mapping",
      "correspondence",
    ],
  },
];

// Types for the serendipity scan tool
export interface SerendipityScanInput {
  currentContext: string;
  noveltyThreshold?: number; // 0.0 to 1.0
  scanType?: "bridge" | "gap" | "pattern" | "random";
}

export interface SerendipityScanOutput {
  /** LLM scaffold for serendipitous discovery */
  scaffold: CreativeScaffold;

  /** Formatted prompt ready for Claude to process */
  llmPrompt: string;

  /** Discovered concept (placeholder or extracted) */
  discoveredConcept: string;

  /** The scan type used */
  scanType: string;

  /** Serendipity score estimate */
  serendipityScore: number;

  /** Concepts extracted from context (for empty graph) */
  extractedConcepts: string[];

  /** Seed probes for exploration */
  seedProbes: string[];

  /** Related concepts from graph (if available) */
  relatedConcepts: string[];

  /** Full explanation */
  explanation: string;
}

/**
 * The Serendipity Scan tool (V3.0 - LLM-SCAFFOLDED)
 * Now works on empty graphs by mining user context
 */
export class SerendipityScanTool {
  private dreamGraph: DreamGraph;

  constructor(dreamGraph: DreamGraph) {
    this.dreamGraph = dreamGraph;
  }

  public performScan(input: SerendipityScanInput): SerendipityScanOutput {
    const {
      currentContext,
      noveltyThreshold = 0.7,
      scanType = "random",
    } = input;

    if (!currentContext || currentContext.trim() === "") {
      throw new Error("Current context is required for serendipity scanning");
    }

    // Get graph state
    const graphState = this.getGraphState();
    const isEmptyGraph = graphState.nodeCount === 0;

    // Extract concepts from user context (works even on empty graph)
    const extractedConcepts = this.extractConceptsFromContext(currentContext);

    // Get seed probes based on context analysis
    const seedProbes = this.generateSeedProbes(currentContext, scanType);

    // Get related concepts from graph (if not empty)
    const relatedConcepts = isEmptyGraph
      ? []
      : this.findRelatedConcepts(currentContext, scanType);

    // Generate the LLM scaffold
    const scaffold = generateSerendipityMiningScaffold(
      currentContext,
      noveltyThreshold,
      scanType,
      isEmptyGraph ? undefined : graphState,
    );

    // Format as prompt
    const llmPrompt = formatScaffoldAsPrompt(scaffold);

    // Generate provisional discovery
    const provisionalDiscovery = this.generateProvisionalDiscovery(
      currentContext,
      extractedConcepts,
      seedProbes,
      scanType,
      isEmptyGraph,
    );

    // Calculate estimated serendipity score
    const serendipityScore = this.estimateSerendipityScore(
      noveltyThreshold,
      extractedConcepts.length,
      relatedConcepts.length,
    );

    // Create explanation
    const explanation = this.createExplanation(
      isEmptyGraph,
      extractedConcepts,
      seedProbes,
      scanType,
      noveltyThreshold,
    );

    // Update graph with discovery seeds
    this.updateDreamGraph(
      currentContext,
      extractedConcepts,
      provisionalDiscovery,
    );

    return {
      scaffold,
      llmPrompt,
      discoveredConcept: provisionalDiscovery,
      scanType,
      serendipityScore,
      extractedConcepts,
      seedProbes,
      relatedConcepts,
      explanation,
    };
  }

  /**
   * Get current graph state for context
   */
  private getGraphState(): GraphStateContext {
    const nodes = this.dreamGraph.getAllNodes();
    const edges = this.dreamGraph.getAllEdges();
    const clusters = this.dreamGraph.detectClusters();
    const bridges = this.dreamGraph.findBridgeNodes();

    return {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      clusters: Array.from(clusters.values()).map((set) => Array.from(set)),
      bridges: bridges.map((b) => {
        const node = this.dreamGraph.getNode(b.nodeId);
        return node?.content || b.nodeId;
      }),
      recentConcepts: nodes
        .sort((a, b) => b.creationTimestamp - a.creationTimestamp)
        .slice(0, 10)
        .map((n) => n.content),
    };
  }

  /**
   * Extract concepts from user context text
   * This is the key to working on empty graphs
   */
  private extractConceptsFromContext(context: string): string[] {
    const concepts = new Set<string>();
    const normalized = context.toLowerCase();

    // Apply extraction patterns
    for (const { pattern, weight } of CONCEPT_EXTRACTION_PATTERNS) {
      const matches = context.match(pattern);
      if (matches) {
        for (const match of matches) {
          concepts.add(match.toLowerCase());
        }
      }
    }

    // Extract noun phrases (simplified - looks for capitalized words and quoted phrases)
    const capitalizedWords = context.match(
      /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g,
    );
    if (capitalizedWords) {
      for (const word of capitalizedWords) {
        if (
          word.length > 3 &&
          ![
            "The",
            "This",
            "That",
            "What",
            "When",
            "Where",
            "Why",
            "How",
          ].includes(word)
        ) {
          concepts.add(word.toLowerCase());
        }
      }
    }

    // Extract quoted phrases
    const quotedPhrases = context.match(/"([^"]+)"/g);
    if (quotedPhrases) {
      for (const phrase of quotedPhrases) {
        concepts.add(phrase.replace(/"/g, "").toLowerCase());
      }
    }

    // Extract technical terms (CamelCase, hyphenated)
    const technicalTerms = context.match(
      /\b[a-z]+(?:-[a-z]+)+\b|\b[A-Z][a-z]+[A-Z][a-zA-Z]+\b/g,
    );
    if (technicalTerms) {
      for (const term of technicalTerms) {
        concepts.add(term.toLowerCase());
      }
    }

    // If we still have too few concepts, extract significant words
    if (concepts.size < 5) {
      const words = context.split(/\s+/);
      const wordFreq = new Map<string, number>();

      for (const word of words) {
        const clean = word.toLowerCase().replace(/[^a-z]/g, "");
        if (clean.length > 5) {
          // Longer words tend to be more meaningful
          wordFreq.set(clean, (wordFreq.get(clean) || 0) + 1);
        }
      }

      // Add most frequent significant words
      const sorted = Array.from(wordFreq.entries()).sort((a, b) => b[1] - a[1]);
      for (const [word] of sorted.slice(0, 10)) {
        concepts.add(word);
      }
    }

    return Array.from(concepts).slice(0, 15); // Return top 15 concepts
  }

  /**
   * Generate seed probes for exploration based on context
   */
  private generateSeedProbes(context: string, scanType: string): string[] {
    const probes: string[] = [];
    const normalized = context.toLowerCase();

    // Select relevant seed domains
    const relevantDomains = SEED_DOMAINS.filter((domain) => {
      return (
        domain.concepts.some((c) => normalized.includes(c)) ||
        Math.random() > 0.5
      );
    });

    // Take probes from relevant domains
    for (const domain of relevantDomains.slice(0, 3)) {
      probes.push(...domain.probes.slice(0, 2));
    }

    // Add scan-type specific probes
    switch (scanType) {
      case "bridge":
        probes.push("What concept could connect the disconnected parts?");
        probes.push("What shared structure exists across different elements?");
        break;
      case "gap":
        probes.push("What's conspicuously missing from this picture?");
        probes.push("What question isn't being asked that should be?");
        break;
      case "pattern":
        probes.push("What pattern repeats across different scales?");
        probes.push("What rhythm or cycle underlies this?");
        break;
      case "random":
        probes.push(
          "What does this remind me of from a completely different domain?",
        );
        probes.push(
          "If this were a metaphor, what would it be a metaphor for?",
        );
        break;
    }

    return probes.slice(0, 6); // Return up to 6 probes
  }

  /**
   * Find related concepts from graph
   */
  private findRelatedConcepts(context: string, scanType: string): string[] {
    const nodes = this.dreamGraph.getAllNodes();
    if (nodes.length === 0) return [];

    const normalized = context.toLowerCase();
    const related: Array<{ content: string; relevance: number }> = [];

    for (const node of nodes) {
      let relevance = 0;
      const nodeContent = node.content.toLowerCase();

      // Check for keyword overlap
      const contextWords = normalized.split(/\s+/);
      const nodeWords = nodeContent.split(/\s+/);

      for (const cw of contextWords) {
        if (
          cw.length > 3 &&
          nodeWords.some((nw) => nw.includes(cw) || cw.includes(nw))
        ) {
          relevance += 0.2;
        }
      }

      // Check for structural similarity based on scan type
      if (scanType === "bridge") {
        // Bridges get higher relevance for nodes with many connections
        const edges = this.dreamGraph.getEdgesFrom(node.id);
        relevance += edges.length * 0.1;
      }

      if (relevance > 0.1) {
        related.push({ content: node.content, relevance });
      }
    }

    // Sort by relevance and return top concepts
    return related
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5)
      .map((r) => r.content);
  }

  /**
   * Generate provisional discovery based on context mining
   */
  private generateProvisionalDiscovery(
    context: string,
    extractedConcepts: string[],
    seedProbes: string[],
    scanType: string,
    isEmptyGraph: boolean,
  ): string {
    if (isEmptyGraph) {
      // For empty graphs, identify the most promising entry point
      const seedDomain =
        SEED_DOMAINS[Math.floor(Math.random() * SEED_DOMAINS.length)];
      const seedConcept =
        seedDomain.concepts[
          Math.floor(Math.random() * seedDomain.concepts.length)
        ];

      return `[PENDING LLM DISCOVERY] Seed exploration via "${seedConcept}" (${seedDomain.name} lens) - extracted ${extractedConcepts.length} concepts from context`;
    } else {
      // For populated graphs, suggest a gap or bridge
      const scanDescriptions: Record<string, string> = {
        bridge: "potential bridge connecting disconnected clusters",
        gap: "structural gap requiring attention",
        pattern: "recurring pattern across concept clusters",
        random: "serendipitous entry point for lateral exploration",
      };

      return `[PENDING LLM DISCOVERY] Identified ${scanDescriptions[scanType]} - ${extractedConcepts.slice(0, 3).join(", ")} as key concepts`;
    }
  }

  /**
   * Estimate serendipity score
   */
  private estimateSerendipityScore(
    noveltyThreshold: number,
    extractedCount: number,
    relatedCount: number,
  ): number {
    // Base score from novelty threshold
    let score = noveltyThreshold;

    // More extracted concepts = more exploration space = higher potential
    score += Math.min(0.2, extractedCount * 0.02);

    // Fewer related concepts in graph = more uncharted territory
    score += Math.max(0, 0.1 - relatedCount * 0.02);

    // Add small random factor
    score += (Math.random() - 0.5) * 0.1;

    return Math.max(0, Math.min(1, score));
  }

  /**
   * Create explanation of the output
   */
  private createExplanation(
    isEmptyGraph: boolean,
    extractedConcepts: string[],
    seedProbes: string[],
    scanType: string,
    noveltyThreshold: number,
  ): string {
    if (isEmptyGraph) {
      return `SERENDIPITY SCAN - CONTEXT MINING MODE

The dream graph is empty, so we're mining your context directly for serendipitous discoveries.

EXTRACTED CONCEPTS (${extractedConcepts.length}):
${extractedConcepts.map((c) => `  • ${c}`).join("\n")}

SEED PROBES:
${seedProbes.map((p) => `  ? ${p}`).join("\n")}

SCAN TYPE: ${scanType.toUpperCase()}
NOVELTY TARGET: ${(noveltyThreshold * 100).toFixed(0)}%

HOW THIS WORKS:
Instead of returning "No concepts in graph yet" (useless), we:
1. Extract meaningful concepts from your context
2. Generate seed probes to guide LLM exploration
3. Provide a scaffold for Claude to discover genuinely unexpected connections

The 'llmPrompt' field contains a complete prompt that will guide Claude toward serendipitous discovery grounded in YOUR context.`;
    } else {
      return `SERENDIPITY SCAN - GRAPH EXPLORATION MODE

Mining for unknown unknowns in a graph with ${extractedConcepts.length} relevant entry points.

SCAN TYPE: ${scanType.toUpperCase()}
${scanType === "bridge" ? "→ Looking for concepts that connect disconnected clusters" : ""}
${scanType === "gap" ? "→ Looking for what's conspicuously missing" : ""}
${scanType === "pattern" ? "→ Looking for hidden patterns and rhythms" : ""}
${scanType === "random" ? "→ Free-associating for lateral discoveries" : ""}

NOVELTY TARGET: ${(noveltyThreshold * 100).toFixed(0)}%

SEED PROBES:
${seedProbes.map((p) => `  ? ${p}`).join("\n")}

The 'llmPrompt' guides Claude toward discoveries that:
• Connect to your context (not random)
• Are genuinely surprising (not obvious)
• Open new avenues (not dead ends)`;
    }
  }

  /**
   * Update dream graph with discovery context
   */
  private updateDreamGraph(
    context: string,
    extractedConcepts: string[],
    discovery: string,
  ): void {
    const timestamp = Date.now();
    const scanId = `serendipity-${timestamp}`;

    try {
      // Add context node
      this.dreamGraph.addNode({
        id: `${scanId}-context`,
        content:
          context.substring(0, 200) + (context.length > 200 ? "..." : ""),
        creationTimestamp: timestamp,
        source: "serendipity_scan",
        metadata: {
          role: "scan_context",
          extractedConcepts,
          fullContextLength: context.length,
        },
      });

      // Add discovery node
      this.dreamGraph.addNode({
        id: `${scanId}-discovery`,
        content: discovery,
        creationTimestamp: timestamp + 1,
        source: "serendipity_scan",
        metadata: {
          role: "discovery",
          isPending: true,
        },
      });

      // Link them
      this.dreamGraph.addEdge({
        source: `${scanId}-context`,
        target: `${scanId}-discovery`,
        type: EdgeType.REMINDS_OF,
        weight: 0.6,
        metadata: { scanType: "serendipity" },
      });

      this.dreamGraph.visitNode(`${scanId}-discovery`);
    } catch (error) {
      // Ignore graph update errors
    }
  }
}
