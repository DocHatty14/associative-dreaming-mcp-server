#!/usr/bin/env node

/**
 * Associative Dreaming MCP Server - Entry Point
 * 
 * This is the main entry point for the Associative Dreaming MCP server.
 * It sets up the server, registers the tools, and connects to the MCP transport.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { AssociativeDreamingServer } from './lib.js';

// Define the four core tools of Associative Dreaming
const SEMANTIC_DRIFT_TOOL: Tool = {
  name: "semantic_drift",
  description: `The Controlled Hallucination Engine - A stochastic random walk through concept space.

This tool explores semantically distant yet contextually relevant concepts. Unlike nearest-neighbor 
searches that find synonyms, semantic drift deliberately seeks concepts in the "Serendipity Zone" 
(not too close, not too far) to promote lateral thinking.

When to use this tool:
- When you're stuck in repetitive thinking patterns
- When you need fresh perspectives on a familiar problem
- When you want to explore alternative framings
- When direct approaches have failed to yield insights
- When you're in the divergent phase of ideation

Parameters:
- anchorConcept: The starting point for the semantic drift (required)
- driftMagnitude: How far to drift from the anchor (0.0-1.0, higher = more distant)
- temperature: Additional randomness in the selection process (0.0-1.0)

The tool will return a new concept that's semantically distant but contextually relevant,
along with the path taken to reach it and an explanation of the connections.`,
  inputSchema: {
    type: "object",
    properties: {
      anchorConcept: {
        type: "string",
        description: "The starting concept for semantic drift"
      },
      driftMagnitude: {
        type: "number",
        description: "How far to drift semantically (0.0 to 1.0, higher = more distant)",
        minimum: 0,
        maximum: 1
      },
      temperature: {
        type: "number",
        description: "Additional randomness in selection (0.0 to 1.0)",
        minimum: 0,
        maximum: 1
      }
    },
    required: ["anchorConcept"]
  }
};

const BISOCIATIVE_SYNTHESIS_TOOL: Tool = {
  name: "bisociative_synthesis",
  description: `The Combinatorial Engine - Forces the intersection of unrelated matrices of thought.

This tool identifies structural similarities between disparate domains to generate creative insights.
Based on Arthur Koestler's theory of Bisociation, it maps patterns from one domain onto another,
creating conceptual bridges that can lead to innovation.

When to use this tool:
- When you need radical innovation rather than incremental improvement
- When you want to reframe a problem using an entirely different perspective
- When looking for innovative solutions by importing paradigms from other fields
- When you're stuck and need to break out of domain-specific thinking patterns
- When you want to create new metaphors for understanding complex problems

Parameters:
- matrixA: The problem domain (required)
- matrixB: The stimulus domain (optional - will auto-select if not provided)
- blendType: Specific structural pattern to use for mapping (optional)

The tool will create a "bridge concept" that connects the two domains, explaining how
concepts from one domain can be mapped onto the other to generate novel insights.`,
  inputSchema: {
    type: "object",
    properties: {
      matrixA: {
        type: "string",
        description: "The problem domain (the context you're working in)"
      },
      matrixB: {
        type: "string",
        description: "The stimulus domain (optional - will auto-select if not provided)"
      },
      blendType: {
        type: "string",
        description: "Specific structural pattern to use (e.g., hierarchy, network, cycle)"
      }
    },
    required: ["matrixA"]
  }
};

const OBLIQUE_CONSTRAINT_TOOL: Tool = {
  name: "oblique_constraint",
  description: `The Entropy Injector - Introduces creative constraints to break linear thinking.

This tool implements Brian Eno's Oblique Strategies and SCAMPER techniques to act as a
"Circuit Breaker" for rigid thinking. By introducing deliberate constraints, it forces
creative thinking and pattern breaking when you're stuck.

When to use this tool:
- When you're experiencing writer's block or creative impasse
- When you need to break out of conventional thinking patterns
- When logical approaches have reached diminishing returns
- When you want to introduce controlled chaos into your thinking
- When you feel you've exhausted all obvious solutions

Parameters:
- currentBlock: Description of the impasse or block you're facing (required)
- constraintType: Type of constraint (oblique, scamper, creative, or random)

The tool will provide a specific constraint and suggestions for how to apply it
to your current problem, forcing you to approach it from a new angle.`,
  inputSchema: {
    type: "object",
    properties: {
      currentBlock: {
        type: "string",
        description: "Description of the impasse/block you're facing"
      },
      constraintType: {
        type: "string",
        description: "Type of constraint (oblique, scamper, creative, or random)",
        enum: ["oblique", "scamper", "creative", "random"]
      }
    },
    required: ["currentBlock"]
  }
};

const SERENDIPITY_SCAN_TOOL: Tool = {
  name: "serendipity_scan",
  description: `The Unknown Unknown Finder - Searches for surprising connections and insights.

This tool automates the search for "Unknown Unknowns" - connections and insights that
would typically be missed through linear thinking. It analyzes the dream graph for
structural holes and disconnected clusters, then identifies potential bridges.

When to use this tool:
- When you want to discover blind spots in your thinking
- When you're looking for unexpected connections between ideas
- When you need to break out of a mental rut
- When you want to inject serendipity into your creative process
- When you're in an exploratory rather than problem-solving mode

Parameters:
- currentContext: Description of your current focus or exploration area (required)
- noveltyThreshold: How novel vs. relevant results should be (0.0-1.0)
- scanType: The type of serendipitous insight to find (bridge, gap, pattern, random)

The tool will discover unexpected concepts or connections based on your current
context, with an explanation of why they might be valuable to consider.`,
  inputSchema: {
    type: "object",
    properties: {
      currentContext: {
        type: "string",
        description: "Description of your current focus or exploration area"
      },
      noveltyThreshold: {
        type: "number",
        description: "How novel vs. relevant results should be (0.0-1.0, higher = more novel)",
        minimum: 0,
        maximum: 1
      },
      scanType: {
        type: "string",
        description: "Type of serendipitous insight to find",
        enum: ["bridge", "gap", "pattern", "random"]
      }
    },
    required: ["currentContext"]
  }
};

// Create the MCP server
const server = new Server(
  {
    name: "associative-dreaming-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize the Associative Dreaming server
const dreamingServer = new AssociativeDreamingServer();

// Register the tools with the MCP server
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    SEMANTIC_DRIFT_TOOL,
    BISOCIATIVE_SYNTHESIS_TOOL,
    OBLIQUE_CONSTRAINT_TOOL,
    SERENDIPITY_SCAN_TOOL
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  
  if (
    toolName === "semantic_drift" ||
    toolName === "bisociative_synthesis" ||
    toolName === "oblique_constraint" ||
    toolName === "serendipity_scan"
  ) {
    return dreamingServer.processDream({
      tool: toolName,
      input: request.params.arguments
    });
  }

  return {
    content: [{
      type: "text",
      text: `Unknown tool: ${toolName}`
    }],
    isError: true
  };
});

// Start the server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Associative Dreaming MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
