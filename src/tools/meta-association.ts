/**
 * Meta-Association - The Chaos Weaver (V2.0 - LLM-SCAFFOLDED)
 *
 * "A→Banana→Your ex's apartment→Ancient Rome→Answer"
 *
 * V2.0 MAJOR REFACTOR:
 * - EVERY collision now requires a traceable "because chain"
 * - Weirdness must serve insight, not just performance
 * - Outputs include practical extraction even from maximum chaos
 * - The LLM does the creative collision; server provides structure
 *
 * PHILOSOPHY (UNCHANGED):
 * This is the AMPLIFIER, not the dampener. While the other 4 tools generate
 * creative leaps from a single starting point, this tool takes MULTIPLE prior
 * outputs and forces EVEN MORE bizarre connections between them.
 *
 * KEY CHANGE:
 * Old: Random collision → Template phrase → "weirdness score"
 * New: Structured collision → LLM-generated insight → Justified weirdness
 */

import { DreamGraph, Node, EdgeType } from "../graph.js";
import {
  generateMetaCollisionScaffold,
  formatScaffoldAsPrompt,
  CreativeScaffold,
  PriorOutput,
} from "../prompts/creative-scaffolds.js";

/**
 * Prior output from any Associative Dreaming tool
 */
export interface PriorAssociativeOutput {
  tool:
    | "semantic_drift"
    | "bisociative_synthesis"
    | "oblique_constraint"
    | "serendipity_scan";
  result: {
    // Common fields
    newConcept?: string;
    bridgeConcept?: string;
    constraint?: string;
    discoveredConcept?: string;
    explanation?: string;

    // Tool-specific metadata
    driftPath?: string[];
    driftDistance?: number;
    mapping?: any;
    application?: string;
    insight?: string;
    [key: string]: any;
  };
  timestamp?: number;
}

export interface MetaAssociationInput {
  priorOutputs: PriorAssociativeOutput[];
  chaosIntensity?: number; // 0.0 to 1.0 (default: 0.7)
  contextAnchor?: string; // Optional grounding concept
}

export interface MetaAssociationOutput {
  /** LLM scaffold for meta-collision */
  scaffold: CreativeScaffold;

  /** Formatted prompt ready for Claude */
  llmPrompt: string;

  /** The emergent meta-pattern (placeholder until LLM fills) */
  metaPattern: string;

  /** Collision map showing what concepts will collide */
  collisionMap: CollisionDescription[];

  /** Extracted concepts from prior outputs */
  extractedConcepts: ExtractedConcept[];

  /** Weirdness target (not actual score - that comes from LLM) */
  weirdnessTarget: number;

  /** Structure for rhizome visualization */
  rhizomeStructure: RhizomeNode[];

  /** The practical extraction prompt */
  practicalExtractionPrompt: string;

  /** Full explanation */
  explanation: string;
}

interface CollisionDescription {
  concept1: string;
  concept2: string;
  collisionPrompt: string; // What the LLM should explore
}

interface ExtractedConcept {
  text: string;
  source: string;
  type: "primary" | "secondary" | "metadata";
}

interface RhizomeNode {
  id: string;
  content: string;
  connections: string[];
}

/**
 * The Meta-Association Tool (V2.0 - LLM-SCAFFOLDED)
 * Forces prior outputs to collide with justified "because chains"
 */
export class MetaAssociationTool {
  private dreamGraph: DreamGraph;

  constructor(dreamGraph: DreamGraph) {
    this.dreamGraph = dreamGraph;
  }

  /**
   * Main meta-association method
   */
  public associate(input: MetaAssociationInput): MetaAssociationOutput {
    const { priorOutputs, chaosIntensity = 0.7, contextAnchor } = input;

    // Validate we have enough to collide
    if (!priorOutputs || priorOutputs.length < 2) {
      throw new Error(
        "Meta-association requires at least 2 prior outputs to collide",
      );
    }

    // Extract concepts from prior outputs
    const extractedConcepts = this.extractConcepts(priorOutputs);

    // Generate collision map
    const collisionMap = this.generateCollisionMap(
      extractedConcepts,
      chaosIntensity,
    );

    // Convert to format expected by scaffold
    const priorOutputsForScaffold: PriorOutput[] = extractedConcepts
      .filter((c) => c.type === "primary")
      .map((c) => ({
        tool: c.source,
        concept: c.text,
        timestamp: Date.now(),
      }));

    // Generate LLM scaffold
    const scaffold = generateMetaCollisionScaffold(
      priorOutputsForScaffold,
      chaosIntensity,
      contextAnchor,
    );

    // Format as prompt
    const llmPrompt = formatScaffoldAsPrompt(scaffold);

    // Generate provisional meta-pattern
    const provisionalPattern = this.generateProvisionalPattern(
      extractedConcepts,
      collisionMap,
      chaosIntensity,
      contextAnchor,
    );

    // Build rhizome structure
    const rhizomeStructure = this.buildRhizomeStructure(
      extractedConcepts,
      collisionMap,
    );

    // Generate practical extraction prompt
    const practicalExtractionPrompt = this.generatePracticalExtractionPrompt(
      extractedConcepts,
      contextAnchor,
      chaosIntensity,
    );

    // Create explanation
    const explanation = this.createExplanation(
      extractedConcepts,
      collisionMap,
      chaosIntensity,
      contextAnchor,
    );

    // Update dream graph
    this.updateDreamGraph(extractedConcepts, collisionMap, provisionalPattern);

    return {
      scaffold,
      llmPrompt,
      metaPattern: provisionalPattern,
      collisionMap,
      extractedConcepts,
      weirdnessTarget: chaosIntensity,
      rhizomeStructure,
      practicalExtractionPrompt,
      explanation,
    };
  }

  /**
   * Extract concepts from prior outputs
   */
  private extractConcepts(
    priorOutputs: PriorAssociativeOutput[],
  ): ExtractedConcept[] {
    const concepts: ExtractedConcept[] = [];

    for (const output of priorOutputs) {
      const { tool, result } = output;

      // Extract primary concept
      let primaryConcept = "";
      switch (tool) {
        case "semantic_drift":
          primaryConcept = result.newConcept || "";
          break;
        case "bisociative_synthesis":
          primaryConcept = result.bridgeConcept || "";
          break;
        case "oblique_constraint":
          primaryConcept = result.constraint || "";
          break;
        case "serendipity_scan":
          primaryConcept = result.discoveredConcept || "";
          break;
      }

      if (primaryConcept) {
        concepts.push({
          text: primaryConcept,
          source: tool,
          type: "primary",
        });
      }

      // Extract secondary concepts from paths, mappings, etc.
      if (result.driftPath && Array.isArray(result.driftPath)) {
        for (const step of result.driftPath.slice(1, -1)) {
          // Exclude first and last
          if (typeof step === "string" && !step.startsWith("[")) {
            concepts.push({
              text: step,
              source: tool,
              type: "secondary",
            });
          }
        }
      }

      if (result.mapping && typeof result.mapping === "object") {
        for (const [key, value] of Object.entries(result.mapping)) {
          concepts.push({
            text: `${key} ↔ ${value}`,
            source: tool,
            type: "metadata",
          });
        }
      }
    }

    return concepts;
  }

  /**
   * Generate collision map - which concepts should collide and how
   */
  private generateCollisionMap(
    concepts: ExtractedConcept[],
    chaosIntensity: number,
  ): CollisionDescription[] {
    const collisions: CollisionDescription[] = [];
    const primaryConcepts = concepts.filter((c) => c.type === "primary");

    // Generate all pairwise collisions for primary concepts
    for (let i = 0; i < primaryConcepts.length; i++) {
      for (let j = i + 1; j < primaryConcepts.length; j++) {
        const c1 = primaryConcepts[i];
        const c2 = primaryConcepts[j];

        const collisionPrompt = this.generateCollisionPrompt(
          c1,
          c2,
          chaosIntensity,
        );

        collisions.push({
          concept1: c1.text,
          concept2: c2.text,
          collisionPrompt,
        });
      }
    }

    // For high chaos, add some cross-type collisions
    if (chaosIntensity > 0.7) {
      const secondaryConcepts = concepts.filter((c) => c.type === "secondary");
      if (secondaryConcepts.length > 0 && primaryConcepts.length > 0) {
        const randomPrimary =
          primaryConcepts[Math.floor(Math.random() * primaryConcepts.length)];
        const randomSecondary =
          secondaryConcepts[
            Math.floor(Math.random() * secondaryConcepts.length)
          ];

        collisions.push({
          concept1: randomPrimary.text,
          concept2: randomSecondary.text,
          collisionPrompt: this.generateCollisionPrompt(
            randomPrimary,
            randomSecondary,
            chaosIntensity,
          ),
        });
      }
    }

    return collisions;
  }

  /**
   * Generate a collision prompt for a pair of concepts
   */
  private generateCollisionPrompt(
    c1: ExtractedConcept,
    c2: ExtractedConcept,
    chaosIntensity: number,
  ): string {
    const prompts = [
      // Bisociative collision
      `What structural pattern exists in BOTH "${c1.text}" and "${c2.text}"? Find the isomorphism.`,

      // Paradoxical collision
      `"${c1.text}" and "${c2.text}" seem contradictory. What emerges if you hold both as true?`,

      // Metaphorical collision
      `If "${c1.text}" is the lens, what does it reveal about "${c2.text}"?`,

      // Causal collision
      `Invent a causal chain: How could "${c1.text}" lead to "${c2.text}"? What's the mechanism?`,

      // Absurdist collision (high chaos only)
      `"${c1.text}" is the dream; "${c2.text}" is the dreamer. What does the dream mean?`,
    ];

    // Select based on chaos intensity
    if (chaosIntensity > 0.8) {
      return prompts[Math.floor(Math.random() * prompts.length)];
    } else if (chaosIntensity > 0.5) {
      return prompts[Math.floor(Math.random() * 3)]; // Exclude absurdist
    } else {
      return prompts[Math.floor(Math.random() * 2)]; // Only bisociative and paradoxical
    }
  }

  /**
   * Generate provisional meta-pattern
   */
  private generateProvisionalPattern(
    concepts: ExtractedConcept[],
    collisions: CollisionDescription[],
    chaosIntensity: number,
    contextAnchor?: string,
  ): string {
    const primaryCount = concepts.filter((c) => c.type === "primary").length;
    const collisionCount = collisions.length;
    const chaosDesc =
      chaosIntensity > 0.7
        ? "maximum"
        : chaosIntensity > 0.4
          ? "moderate"
          : "structured";

    let pattern = `[PENDING LLM META-PATTERN] Colliding ${primaryCount} primary concepts across ${collisionCount} collision points at ${chaosDesc} chaos intensity.`;

    if (contextAnchor) {
      pattern += ` Grounded in "${contextAnchor}".`;
    }

    pattern +=
      " Awaiting emergence of justified weird connections with traceable 'because chains'.";

    return pattern;
  }

  /**
   * Build rhizome structure for visualization
   */
  private buildRhizomeStructure(
    concepts: ExtractedConcept[],
    collisions: CollisionDescription[],
  ): RhizomeNode[] {
    const nodes: RhizomeNode[] = [];
    const nodeMap = new Map<string, RhizomeNode>();

    // Create nodes for each concept
    for (let i = 0; i < concepts.length; i++) {
      const concept = concepts[i];
      const id = `node-${i}`;
      const node: RhizomeNode = {
        id,
        content: concept.text,
        connections: [],
      };
      nodes.push(node);
      nodeMap.set(concept.text, node);
    }

    // Add connections based on collisions
    for (const collision of collisions) {
      const node1 = nodeMap.get(collision.concept1);
      const node2 = nodeMap.get(collision.concept2);

      if (node1 && node2) {
        node1.connections.push(node2.id);
        node2.connections.push(node1.id);
      }
    }

    return nodes;
  }

  /**
   * Generate practical extraction prompt
   */
  private generatePracticalExtractionPrompt(
    concepts: ExtractedConcept[],
    contextAnchor: string | undefined,
    chaosIntensity: number,
  ): string {
    const primaryConcepts = concepts
      .filter((c) => c.type === "primary")
      .map((c) => c.text);

    if (contextAnchor) {
      return `After all collisions, extract PRACTICAL INSIGHT for "${contextAnchor}":
- What action does the meta-pattern suggest?
- What question should be asked that wasn't before?
- What assumption should be questioned?

Primary concepts colliding: ${primaryConcepts.join(", ")}
Chaos intensity: ${(chaosIntensity * 100).toFixed(0)}%

Even at maximum chaos, there should be an actionable extraction.`;
    } else {
      return `After all collisions, identify the MOST SURPRISING insight:
- Which collision produced the most unexpected connection?
- What "unknown unknown" became visible?
- What would you not have thought of without this meta-view?

Primary concepts colliding: ${primaryConcepts.join(", ")}`;
    }
  }

  /**
   * Create explanation
   */
  private createExplanation(
    concepts: ExtractedConcept[],
    collisions: CollisionDescription[],
    chaosIntensity: number,
    contextAnchor?: string,
  ): string {
    const primaryConcepts = concepts.filter((c) => c.type === "primary");
    const secondaryConcepts = concepts.filter((c) => c.type === "secondary");

    return `META-ASSOCIATION SCAFFOLD (V2.0)

This output forces prior tool results to COLLIDE and reveal meta-patterns.

CONCEPTS TO COLLIDE:
Primary (${primaryConcepts.length}):
${primaryConcepts.map((c) => `  • "${c.text}" (from ${c.source})`).join("\n")}

${
  secondaryConcepts.length > 0
    ? `Secondary (${secondaryConcepts.length}):
${secondaryConcepts
  .slice(0, 5)
  .map((c) => `  • "${c.text}"`)
  .join("\n")}`
    : ""
}

COLLISION MATRIX (${collisions.length} collisions):
${collisions.map((c) => `  ⚡ "${c.concept1}" × "${c.concept2}"`).join("\n")}

CHAOS INTENSITY: ${(chaosIntensity * 100).toFixed(0)}%
${contextAnchor ? `GROUNDING ANCHOR: "${contextAnchor}"` : "NO ANCHOR - maximum exploratory chaos"}

KEY IMPROVEMENTS FROM V1:
1. Every collision requires a traceable "because chain"
2. Weirdness must serve insight, not just performance
3. Practical extraction is required even at maximum chaos
4. The LLM generates the actual insights; server provides structure

The 'llmPrompt' field will guide Claude to:
- Execute each collision with reasoning
- Identify the emergent meta-pattern
- Justify the weirdest connection step-by-step
- Extract practical insight from the chaos`;
  }

  /**
   * Update dream graph with meta-association
   */
  private updateDreamGraph(
    concepts: ExtractedConcept[],
    collisions: CollisionDescription[],
    metaPattern: string,
  ): void {
    const timestamp = Date.now();
    const metaNodeId = `meta-association-${timestamp}`;

    try {
      // Create meta-node for the pattern
      this.dreamGraph.addNode({
        id: metaNodeId,
        content: metaPattern,
        creationTimestamp: timestamp,
        source: "meta_association",
        metadata: {
          collisionCount: collisions.length,
          conceptCount: concepts.length,
          concepts: concepts
            .filter((c) => c.type === "primary")
            .map((c) => c.text),
          isPending: true,
        },
      });

      // Link all primary concepts to the meta-node
      const primaryConcepts = concepts.filter((c) => c.type === "primary");
      primaryConcepts.forEach((concept, i) => {
        const conceptId = `meta-input-${i}-${timestamp}`;

        try {
          this.dreamGraph.addNode({
            id: conceptId,
            content: concept.text,
            creationTimestamp: timestamp - i * 100,
            source: concept.source,
            metadata: { type: concept.type },
          });

          this.dreamGraph.addEdge({
            source: conceptId,
            target: metaNodeId,
            type: EdgeType.SYNTHESIZED_FROM,
            weight: 0.7,
            metadata: {
              associationType: "meta_collision",
            },
          });
        } catch (error) {
          // Ignore node creation errors
        }
      });

      this.dreamGraph.visitNode(metaNodeId);
    } catch (error) {
      // Ignore graph update errors
    }
  }
}
