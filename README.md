<div align="center">

<img width="1024" height="1024" alt="Associative Dreaming - Your AI's Creative Unconscious" src="https://github.com/user-attachments/assets/0ef0af17-d48b-4e32-8674-855af43811a6" />

# Associative Dreaming

**The yin to Sequential Thinking's yang**

**The MCP server that deliberately encourages lateral thinking instead of sequential logic chains.**

[![npm version](https://badge.fury.io/js/@associative%2Fserver-associative-dreaming.svg)](https://www.npmjs.com/package/@associative/server-associative-dreaming)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[The Hypothesis](#-the-hypothesis) • [Quick Start](#-quick-start) • [Tools](#-the-five-engines) • [Examples](#-see-it-in-action) • [How It Works](#-how-it-actually-works)

</div>

---

## 🧠 The Hypothesis

**We've been doing it wrong.**

We impose sequential reasoning on AI because that's how humans think. It's how we *explain* our thinking. But LLMs don't work that way—they naturally operate through **hyperdimensional pattern-matching**, seeing connections across seemingly unrelated concepts in ways we typically suppress.

Think about how breakthroughs actually happen:

- **Gutenberg**: Wine press + coin stamps = printing press
- **Darwin**: Malthus economics → natural selection  
- **Velcro**: Burrs stuck to dog fur → hook-and-loop fasteners
- **PageRank**: Academic citation networks → web search

Innovation happens through **unexpected domain transfer**. Not A→B→C, but A→Banana→Ancient Rome→Answer.

**This MCP server is an experiment**: What if instead of fighting AI's tendency to make wild associative leaps, we *harness* it?

I call it **"controlled ADHD"** or **manufactured serendipity**.

---

## 💥 Why This Exists

Every "reasoning" tool for AI does the same thing: force linear chains. Step 1, Step 2, Step 3. Think carefully. Be logical.

But creativity isn't logical. The best ideas come from:
- Collisions between unrelated domains
- Constraints that force new pathways
- The "adjacent possible" that you weren't looking for
- Pattern recognition across wildly different contexts

**Associative Dreaming** is the **yin to sequential thinking's yang**. It's your AI's creative unconscious—the part that wanders, connects, and surfaces insights that pure logic would never find.

<table>
<tr>
<td width="50%">

### 🔗 Sequential Thinking
```
Problem → Analysis → Options → Decision
```
Good for: Debugging, planning, verification

</td>
<td width="50%">

### 🌀 Associative Dreaming
```
Problem → Jazz → Mycelium → Feudal Japan → Holy shit, that's the answer
```
Good for: Innovation, creativity, breakthroughs

</td>
</tr>
</table>

**You need both.** This gives you the second one.

---

## 🚀 Quick Start

### One Command (Seriously)

```bash
npx @associative/server-associative-dreaming
```

That's it. No installation. No config files. No bullshit.

### Add to Claude Desktop

Edit your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "associative-dreaming": {
      "command": "npx",
      "args": ["-y", "@associative/server-associative-dreaming"]
    }
  }
}
```

Restart Claude. Ask it to use the associative dreaming tools. Watch what happens.

### Add to VS Code / Cursor / Zed

```json
{
  "servers": {
    "associative-dreaming": {
      "command": "npx", 
      "args": ["-y", "@associative/server-associative-dreaming"]
    }
  }
}
```

---

## ⚡ The Five Engines

### 1. `semantic_drift` — The Controlled Hallucination Engine

Take a concept. Drift away from it through semantic space. Not to synonyms—to the **Serendipity Zone**: distant enough to surprise you, connected enough to matter.

```typescript
{
  anchorConcept: "startup growth",
  driftMagnitude: 0.8,    // 0 = stay close, 1 = go wild
  temperature: 0.7        // randomness in the journey
}
```

**What you get**: A destination concept + the reasoning chain that got you there + why this reframes your original thinking.

**Use when**: You're stuck in obvious associations. You need fresh angles. The direct approach isn't working.

---

### 2. `bisociative_synthesis` — The Collision Engine

Arthur Koestler's theory of creativity, weaponized. Take two unrelated domains. Smash them together. Find the **structural isomorphism**—the hidden pattern that exists in both.

```typescript
{
  matrixA: "enterprise sales",
  matrixB: "jazz improvisation"    // leave blank for auto-selection
}
```

**What you get**: Not "sales is like jazz" (useless). Instead: the specific structural patterns that map between domains, why they map, and what that reveals about your problem.

**Use when**: You need radical innovation, not incremental improvement. You want to import paradigms from other fields.

---

### 3. `oblique_constraint` — The Pattern Interrupt Engine

Brian Eno's Oblique Strategies + SCAMPER, with actual application guidance. When you're stuck, inject a constraint that forces new pathways.

```typescript
{
  currentBlock: "Users sign up but don't activate",
  constraintType: "oblique"    // oblique | scamper | inversion | creative
}
```

**What you get**: A specific constraint + WHY it's relevant to your block + HOW to apply it + what might emerge.

**Use when**: Creative block. Decision paralysis. You've been staring at the same problem too long.

---

### 4. `serendipity_scan` — The Unknown Unknown Finder

Find what you don't know you're looking for. Works even with zero prior context—mines your input for concepts, generates exploration probes, surfaces surprising connections.

```typescript
{
  currentContext: "We're building AI tools for creative professionals",
  noveltyThreshold: 0.8,    // 0 = safe, 1 = weird
  scanType: "gap"           // bridge | gap | pattern | random
}
```

**What you get**: A discovered concept + the associative chain that found it + why it matters + new threads to pull.

**Use when**: Exploration mode. Research. You want to discover blind spots in your thinking.

---

### 5. `meta_association` — The Chaos Weaver

The amplifier. Takes outputs from the other tools and forces them to **collide**. If semantic_drift makes one wild leap, meta_association makes wild leaps *between* the wild leaps.

```typescript
{
  priorOutputs: [/* results from other tools */],
  chaosIntensity: 0.8,
  contextAnchor: "my original problem"    // optional grounding
}
```

**What you get**: Collision points between concepts + emergent meta-patterns + the weirdest justified connection + practical extraction from the chaos.

**Use when**: You've run multiple tools and want to see what emerges from forcing them together. Maximum lateral force required.

---

## 🎯 See It In Action

### "Our checkout is too slow but we can't remove steps"

```json
{
  "tool": "bisociative_synthesis",
  "input": {
    "matrixA": "e-commerce checkout optimization",
    "matrixB": "emergency room triage"
  }
}
```

**Output**: ER triage doesn't make the process faster—it makes waiting *feel* purposeful by showing progress and priority. Maps to: progress indicators that show *why* each step matters, not just that it exists. The friction becomes value demonstration.

---

### "We're a B2B SaaS in a crowded market"

```json
{
  "tool": "serendipity_scan",
  "input": {
    "currentContext": "B2B project management tool competing with Monday, Asana, Notion",
    "scanType": "gap",
    "noveltyThreshold": 0.9
  }
}
```

**Output**: Discovers that all competitors optimize for the *manager's* view. Gap: tools that optimize for the IC's experience of being managed. The asymmetry is the opportunity.

---

### "I've been staring at this architecture decision for 3 days"

```json
{
  "tool": "oblique_constraint",
  "input": {
    "currentBlock": "Can't decide between microservices and monolith",
    "constraintType": "inversion"
  }
}
```

**Output**: "What if the architecture was *designed* to be thrown away in 18 months?" Reveals: you're optimizing for a future you can't predict. The decision paralysis is about false permanence.

---

## 🏗️ How It Actually Works

### The Core Architecture

This MCP server doesn't try to be creative itself. **Creativity happens in the LLM.** The server provides **scaffolding**—structured prompts that guide Claude's natural hyperdimensional pattern-matching toward productive lateral thinking.

```
User → Claude → MCP Server → [Generate Scaffold] → Claude → Creative Output
                     ↓
              [Track in Graph]
```

### What Each Tool Returns

Every tool returns a **Creative Scaffold** with three components:

1. **LLM Prompt**: Structured task with constraints and required reasoning sections
2. **Metadata**: Tool parameters and context for reference
3. **Graph Update**: Concepts and relationships added to the exploration map

Example scaffold structure:
```
═══════════════════════════════════════════════════════════════
  SEMANTIC DRIFT - CREATIVE SCAFFOLD
═══════════════════════════════════════════════════════════════

[Task description and methodology]

───────────────────────────────────────────────────────────────
  YOUR TASK (Process this for genuine insight)
───────────────────────────────────────────────────────────────

[Specific creative task with:]
- The anchor concept and drift parameters
- Required response sections:
  * destination_concept: Where you landed
  * because_chain: Step-by-step reasoning
  * reframe: What this reveals about the original concept
  * concrete_application: How to use this insight

[Constraints ensuring useful output, not just weird]
```

### The "Because Chain" Requirement

Every connection must be **traceable**. No more "this is weird, therefore creative." Every leap requires:

1. **The connection itself**
2. **Why this connection exists** (step by step)
3. **What it reveals** about the original problem
4. **Concrete application** to user's context

Weirdness in service of insight, not weirdness for performance.

---

### The Concept Graph

Under the hood, the server maintains a **relationship graph** that grows with each tool call:
- **Nodes**: Concepts (anchors, destinations, bridges, discoveries)
- **Edges**: Typed relationships (METAPHOR_FOR, CONTRASTS_WITH, SYNTHESIZED_FROM, etc.)
- **Clusters**: Related concepts that form naturally
- **Bridge Nodes**: Connect disparate areas of thinking
- **Structural Holes**: Reveal unexplored territory

This isn't just logging—it's a **map of your creative exploration** that can be queried and built upon across sessions.

---

## 🔬 The Philosophy

| What We're Told | What Actually Works |
|:---|:---|
| "Think step by step" | Sometimes the step you need is sideways |
| "Be logical" | Logic finds what you're looking for; association finds what you're not |
| "Stay focused" | Peripheral vision catches what direct gaze misses |
| "Avoid tangents" | The tangent IS the insight |

**Associative Dreaming** gives your AI permission to wander. Productively. With guardrails that ensure the wandering leads somewhere useful.

---

## 🛠️ Development

```bash
# Clone and install
git clone <repository-url>
cd associative-dreaming-mcp-server
npm install

# Build
npm run build

# Run locally
npm start

# Watch mode for development
npm run build:watch
```

### Project Structure

```
src/
├── index.ts              # MCP server entry point
├── lib.ts                # Core server implementation
├── config.ts             # Configuration management
├── graph.ts              # Concept relationship graph
├── schemas.ts            # Zod validation schemas
├── tools/                # The five creative engines
│   ├── semantic-drift.ts
│   ├── bisociative-synthesis.ts
│   ├── oblique-constraint.ts
│   ├── serendipity-scan.ts
│   └── meta-association.ts
├── prompts/              # Scaffold generation
│   └── creative-scaffolds.ts
└── utils/                # Helper utilities
    ├── concept.ts
    ├── random.ts
    └── errors.ts
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DISABLE_DREAM_LOGGING` | Set to `"true"` to suppress console output | `false` |

---

## 📊 System Status

### ✅ Current Capabilities (v1.0)
- Creative prompt scaffolding for 5 distinct thinking modes
- Concept relationship graph with typed edges
- Parameter-driven exploration (drift magnitude, temperature, chaos intensity)
- Traceable reasoning chains ("because chains")
- Works seamlessly with Claude via MCP protocol

### 🔮 Planned Enhancements
- **v1.1**: Real NLP concept extraction (compromise, natural, stopword)
- **v1.2**: Transparency reporting (show computational vs. creative work)
- **v1.3**: Vector similarity engine for true semantic distance
- **v2.0**: Concept map visualization
- **v2.1**: Multi-turn conversation support with context accumulation

See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for detailed roadmap.

---

## 📚 References & Inspiration

- **Arthur Koestler** — *The Act of Creation* (bisociation theory)
- **Brian Eno** — *Oblique Strategies* (creative constraints)
- **Stuart Kauffman** — *The Adjacent Possible* (innovation spaces)
- **Deleuze & Guattari** — *A Thousand Plateaus* (rhizomatic thinking)
- **Douglas Hofstadter** — *Fluid Concepts and Creative Analogies*

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🤝 Contributing

Contributions welcome! This is an experiment in harnessing AI's natural creative tendencies. If you have ideas for new creative engines, better scaffolding techniques, or ways to make lateral thinking more reliable, please open an issue or PR.

**Areas of Interest:**
- New creative constraints or thinking modes
- Better prompt scaffolding techniques
- Graph visualization and exploration
- Multi-agent creative collaboration patterns

---

<div align="center">

### The best ideas don't come from thinking harder. They come from thinking *different*.

**What unexpected connection will you find today?**

[Report Bug](../../issues) • [Request Feature](../../issues) • [Contribute](CONTRIBUTING.md)

*Built for the creatively impatient*

</div>
