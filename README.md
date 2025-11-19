<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/0ef0af17-d48b-4e32-8674-855af43811a6" />

A creative, lateral thinking counterpart to the Sequential Thinking server. While Sequential Thinking represents "Yang" - convergent, logical, linear thinking - Associative Dreaming provides the "Yin" - divergent, intuitive, rhizomatic exploration of concept spaces.

## Features

- **Rhizomatic Graph Structure**: Unlike the linear history of Sequential Thinking, maintains a network of concepts and connections
- **Semantic Drift**: Controlled hallucination through stochastic random walks in concept space
- **Bisociative Synthesis**: Creates novel connections by merging unrelated matrices of thought
- **Oblique Constraints**: Injects productive constraints to break linear thinking patterns
- **Serendipity Scan**: Automates the search for "unknown unknowns" in your thinking

## Installation

### Using NPX (Recommended)

You can run the server directly using npx:

```bash
npx @associative/server-associative-dreaming
```

### Local Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the server:
   ```bash
   npm run build
   ```
4. Run the server:
   ```bash
   npm start
   ```

## Configuration

### Claude Desktop Integration

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "associative-dreaming": {
      "command": "npx",
      "args": [
        "-y",
        "@associative/server-associative-dreaming"
      ]
    }
  }
}
```

### VS Code Integration

Add this to your VS Code MCP configuration:

```json
{
  "servers": {
    "associative-dreaming": {
      "command": "npx",
      "args": [
        "-y",
        "@associative/server-associative-dreaming"
      ]
    }
  }
}
```

## Tools

### semantic_drift

The Controlled Hallucination Engine - A stochastic random walk through concept space.

This tool explores semantically distant yet contextually relevant concepts. Unlike nearest-neighbor searches that find synonyms, semantic drift deliberately seeks concepts in the "Serendipity Zone" (not too close, not too far) to promote lateral thinking.

**Parameters:**
- `anchorConcept`: The starting point for semantic drift (required)
- `driftMagnitude`: How far to drift from the anchor (0.0-1.0, higher = more distant)
- `temperature`: Additional randomness in selection (0.0-1.0)

### bisociative_synthesis

The Combinatorial Engine - Forces the intersection of unrelated matrices of thought.

This tool identifies structural similarities between disparate domains to generate creative insights. Based on Arthur Koestler's theory of Bisociation, it maps patterns from one domain onto another, creating conceptual bridges that can lead to innovation.

**Parameters:**
- `matrixA`: The problem domain (required)
- `matrixB`: The stimulus domain (optional - will auto-select if not provided)
- `blendType`: Specific structural pattern to use for mapping (optional)

### oblique_constraint

The Entropy Injector - Introduces creative constraints to break linear thinking.

This tool implements Brian Eno's Oblique Strategies and SCAMPER techniques to act as a "Circuit Breaker" for rigid thinking. By introducing deliberate constraints, it forces creative thinking and pattern breaking when you're stuck.

**Parameters:**
- `currentBlock`: Description of the impasse or block you're facing (required)
- `constraintType`: Type of constraint (oblique, scamper, creative, or random)

### serendipity_scan

The Unknown Unknown Finder - Searches for surprising connections and insights.

This tool automates the search for "Unknown Unknowns" - connections and insights that would typically be missed through linear thinking. It analyzes the dream graph for structural holes and disconnected clusters, then identifies potential bridges.

**Parameters:**
- `currentContext`: Description of your current focus or exploration area (required)
- `noveltyThreshold`: How novel vs. relevant results should be (0.0-1.0)
- `scanType`: The type of serendipitous insight to find (bridge, gap, pattern, random)

## Usage Examples

### Example: Semantic Drift

```json
{
  "tool": "semantic_drift",
  "input": {
    "anchorConcept": "neural network",
    "driftMagnitude": 0.6
  }
}
```

### Example: Bisociative Synthesis

```json
{
  "tool": "bisociative_synthesis",
  "input": {
    "matrixA": "software development",
    "matrixB": "ecology"
  }
}
```

### Example: Oblique Constraint

```json
{
  "tool": "oblique_constraint",
  "input": {
    "currentBlock": "I'm stuck on designing a user interface that's both simple and powerful",
    "constraintType": "oblique"
  }
}
```

### Example: Serendipity Scan

```json
{
  "tool": "serendipity_scan",
  "input": {
    "currentContext": "I'm researching how AI can enhance human creativity",
    "scanType": "bridge"
  }
}
```

## Development

To run in development mode:

```bash
npm run build:watch
```

### Environment Variables

- `DISABLE_DREAM_LOGGING`: Set to "true" to disable logging of dream tool executions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
