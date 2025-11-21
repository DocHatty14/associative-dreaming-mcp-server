/**
 * Oblique Constraint - The Entropy Injector (V3.0 - LLM-SCAFFOLDED)
 *
 * This tool implements Brian Eno's Oblique Strategies and SCAMPER techniques
 * to act as a "Circuit Breaker" for rigid thinking.
 *
 * V3.0 MAJOR REFACTOR:
 * - Outputs LLM SCAFFOLDS with actionable application guidance
 * - Each constraint includes HOW TO APPLY IT (not just the constraint)
 * - "What might emerge" section forces productive speculation
 * - Constraints are grounded in user's actual block, not generic
 */
import { EdgeType } from "../graph.js";
import { generateConstraintReframeScaffold, formatScaffoldAsPrompt, } from "../prompts/creative-scaffolds.js";
/**
 * Curated Oblique Strategies with application guidance
 * Each strategy includes HOW to apply it, not just the cryptic phrase
 */
const OBLIQUE_STRATEGIES = [
    // Process strategies
    {
        text: "Honor thy error as a hidden intention",
        category: "process",
        applicationPattern: "Take your most recent mistake or unexpected result. Treat it as if you meant to do it. What would that intention imply about your direction?",
        whenUseful: "When stuck on 'fixing' something that might actually be a feature",
    },
    {
        text: "Use an old idea",
        category: "process",
        applicationPattern: "What approach did you abandon earlier? Revisit it with your current knowledge. What do you see differently now?",
        whenUseful: "When you've been iterating too long without checking the fundamentals",
    },
    {
        text: "What would your closest friend do?",
        category: "perspective",
        applicationPattern: "Think of someone who approaches problems very differently from you. How would they tackle this? What would they prioritize?",
        whenUseful: "When you're too deep in your own perspective",
    },
    {
        text: "What wouldn't you do?",
        category: "inversion",
        applicationPattern: "List 3 things you would never do in this situation. Now consider: what if one of those is actually the answer?",
        whenUseful: "When conventional approaches have been exhausted",
    },
    {
        text: "Emphasize the flaws",
        category: "destruction",
        applicationPattern: "What's the weakest part of your current approach? Make it MORE prominent. What does that reveal?",
        whenUseful: "When you're trying to hide or minimize something",
    },
    {
        text: "Remove ambiguities and convert to specifics",
        category: "subtraction",
        applicationPattern: "Where are you being vague? Force yourself to state exact numbers, names, dates. What changes?",
        whenUseful: "When fuzzy thinking is masking unclear requirements",
    },
    {
        text: "Remove specifics and convert to ambiguities",
        category: "addition",
        applicationPattern: "Where are you being too precise? Zoom out. What's the broader pattern you're trying to achieve?",
        whenUseful: "When you're over-engineering or premature optimizing",
    },
    {
        text: "What is the reality of the situation?",
        category: "meta",
        applicationPattern: "Set aside your plans and assumptions. What is actually happening right now? What evidence do you have?",
        whenUseful: "When you've been operating on untested assumptions",
    },
    {
        text: "Faced with a choice, do both",
        category: "process",
        applicationPattern: "You're debating between two options. What if you did both? What would that look like? What does it reveal about the false dichotomy?",
        whenUseful: "When stuck in either/or thinking",
    },
    {
        text: "The inconsistency principle",
        category: "destruction",
        applicationPattern: "Introduce a deliberate inconsistency. Where could you break your own rules productively?",
        whenUseful: "When your rules or patterns have become a prison",
    },
    {
        text: "Imagine the problem is solved. How did you solve it?",
        category: "inversion",
        applicationPattern: "Fast-forward to success. Describe what you did. Now work backwards. What was the first step?",
        whenUseful: "When you can't see the path forward",
    },
    {
        text: "What would happen if you did nothing?",
        category: "meta",
        applicationPattern: "Stop all action. What would naturally happen? Sometimes the best intervention is non-intervention.",
        whenUseful: "When you might be over-acting or creating problems",
    },
    {
        text: "Make what was important no longer important",
        category: "destruction",
        applicationPattern: "What constraint are you treating as sacred? Imagine it doesn't exist. What options open up?",
        whenUseful: "When you're constrained by assumptions you haven't questioned",
    },
    {
        text: "Ask people to work against their better judgment",
        category: "perspective",
        applicationPattern: "What would someone who disagrees with you do? Try their approach genuinely, not as a strawman.",
        whenUseful: "When you're in an echo chamber",
    },
    {
        text: "Discover the recipes you are using and abandon them",
        category: "meta",
        applicationPattern: "What patterns are you repeating unconsciously? Name them. Now deliberately break one.",
        whenUseful: "When you're on autopilot",
    },
];
const SCAMPER_OPERATIONS = [
    {
        letter: "S",
        name: "Substitute",
        question: "What can you substitute? What can take the place of this?",
        applicationPattern: "List the key components. For each one, brainstorm 3 alternatives. Which substitution changes the game?",
    },
    {
        letter: "C",
        name: "Combine",
        question: "What can you combine? What can be merged?",
        applicationPattern: "What two elements, if merged, would create something new? Look for unlikely combinations.",
    },
    {
        letter: "A",
        name: "Adapt",
        question: "What can you adapt? What else is like this?",
        applicationPattern: "What successful approach from another field could you borrow? What's the parallel in a different domain?",
    },
    {
        letter: "M",
        name: "Modify/Magnify",
        question: "What can you modify? What can you make bigger or more extreme?",
        applicationPattern: "Take one element and make it 10x larger/more intense. What breaks? What becomes possible?",
    },
    {
        letter: "P",
        name: "Put to other uses",
        question: "What other uses could this have? Who else could use this?",
        applicationPattern: "Who would find this valuable that you haven't considered? What problem does this accidentally solve?",
    },
    {
        letter: "E",
        name: "Eliminate",
        question: "What can you eliminate? What's unnecessary?",
        applicationPattern: "Remove something you think is essential. Can it work without it? What does its absence reveal?",
    },
    {
        letter: "R",
        name: "Reverse/Rearrange",
        question: "What can you reverse? What can you rearrange?",
        applicationPattern: "Flip the order. Start from the end. Do the opposite. What if the effect was the cause?",
    },
];
/**
 * The Oblique Constraint tool (V3.0 - LLM-SCAFFOLDED)
 */
export class ObliqueConstraintTool {
    dreamGraph;
    constructor(dreamGraph) {
        this.dreamGraph = dreamGraph;
    }
    generateConstraint(input) {
        const { currentBlock, constraintType = "random" } = input;
        if (!currentBlock || currentBlock.trim() === "") {
            throw new Error("Current block description is required");
        }
        // Select constraint based on type
        const selectedConstraint = this.selectConstraint(currentBlock, constraintType);
        // Generate LLM scaffold
        // Map 'creative' to 'random' for scaffold generation since scaffold only supports 4 types
        const scaffoldType = constraintType === "creative" ? "random" : constraintType;
        const scaffold = generateConstraintReframeScaffold(currentBlock, scaffoldType === "random"
            ? this.chooseRandomType()
            : scaffoldType, currentBlock);
        // Format as prompt
        const llmPrompt = formatScaffoldAsPrompt(scaffold);
        // Generate application hints
        const applicationHints = this.generateApplicationHints(selectedConstraint, currentBlock);
        // Create explanation
        const explanation = this.createExplanation(selectedConstraint, currentBlock, constraintType);
        // Update graph
        this.updateDreamGraph(currentBlock, selectedConstraint.constraint, constraintType);
        return {
            scaffold,
            llmPrompt,
            constraint: selectedConstraint.constraint,
            constraintType: selectedConstraint.type,
            applicationHints,
            useCase: selectedConstraint.useCase,
            explanation,
        };
    }
    /**
     * Select a constraint based on type and block content
     */
    selectConstraint(block, constraintType) {
        const normalized = block.toLowerCase();
        switch (constraintType) {
            case "oblique": {
                // Score strategies by relevance to the block
                const scored = OBLIQUE_STRATEGIES.map((strategy) => {
                    let score = Math.random() * 10; // Base randomness
                    // Boost score if whenUseful seems relevant
                    const keywords = strategy.whenUseful.toLowerCase().split(" ");
                    for (const keyword of keywords) {
                        if (keyword.length > 4 && normalized.includes(keyword)) {
                            score += 5;
                        }
                    }
                    return { strategy, score };
                });
                scored.sort((a, b) => b.score - a.score);
                const selected = scored[0].strategy;
                return {
                    constraint: selected.text,
                    type: `oblique (${selected.category})`,
                    application: selected.applicationPattern,
                    useCase: selected.whenUseful,
                };
            }
            case "scamper": {
                // Pick a SCAMPER operation that might be relevant
                const operation = SCAMPER_OPERATIONS[Math.floor(Math.random() * SCAMPER_OPERATIONS.length)];
                return {
                    constraint: `[${operation.letter}] ${operation.name}: ${operation.question}`,
                    type: `scamper (${operation.name})`,
                    application: operation.applicationPattern,
                    useCase: `Systematic creative exploration via the ${operation.name} lens`,
                };
            }
            case "creative": {
                // Generate a context-specific creative constraint
                const creativeConstraints = this.generateCreativeConstraints(normalized);
                const selected = creativeConstraints[Math.floor(Math.random() * creativeConstraints.length)];
                return {
                    constraint: selected.text,
                    type: "creative (contextual)",
                    application: selected.application,
                    useCase: "Generated specifically for this block",
                };
            }
            case "random":
            default: {
                // Mix of oblique and scamper
                if (Math.random() > 0.5) {
                    return this.selectConstraint(block, "oblique");
                }
                else {
                    return this.selectConstraint(block, "scamper");
                }
            }
        }
    }
    /**
     * Generate context-specific creative constraints
     */
    generateCreativeConstraints(normalizedBlock) {
        const constraints = [];
        // Time-based constraints
        constraints.push({
            text: "You have 5 minutes. What's the one thing you'd do?",
            application: "Artificial urgency reveals priorities. What would you do if you had almost no time?",
        });
        // Stakeholder constraints
        constraints.push({
            text: "Explain this block to a child. What simplification reveals?",
            application: "Forced simplification often exposes unnecessary complexity or unclear thinking.",
        });
        // Resource constraints
        constraints.push({
            text: "Solve this with half the resources. What changes?",
            application: "Constraints breed creativity. What would you do differently with severe limitations?",
        });
        // Inversion constraints
        constraints.push({
            text: "Make this problem worse on purpose. Then stop doing that.",
            application: "Sometimes seeing what makes things worse reveals what would make them better.",
        });
        // Perspective constraints
        constraints.push({
            text: "You're consulting for your competitor. What would you tell them?",
            application: "Distance creates objectivity. What advice would you give if it wasn't your problem?",
        });
        // Scale constraints
        constraints.push({
            text: "This affects 1 million people. What changes? 10 people?",
            application: "Scale changes what matters. What's important at different magnitudes?",
        });
        return constraints;
    }
    /**
     * Helper to choose random constraint type
     */
    chooseRandomType() {
        const types = [
            "oblique",
            "scamper",
            "inversion",
        ];
        return types[Math.floor(Math.random() * types.length)];
    }
    /**
     * Generate application hints specific to the block
     */
    generateApplicationHints(constraint, block) {
        return [
            "Step 1: " + constraint.application,
            "Step 2: Apply the result specifically to your stated block",
            "Step 3: Note what shifts in your thinking - even if it feels wrong",
            "Step 4: If nothing shifts, the constraint isn't working - try another",
        ];
    }
    /**
     * Create explanation
     */
    createExplanation(constraint, block, requestedType) {
        return `OBLIQUE CONSTRAINT SCAFFOLD

This output provides a creative constraint with APPLICATION GUIDANCE.

YOUR BLOCK: "${block}"

THE CONSTRAINT: "${constraint.constraint}"
TYPE: ${constraint.type}

WHY THIS CONSTRAINT:
${constraint.useCase}

HOW TO APPLY:
${constraint.application}

KEY IMPROVEMENT FROM V2:
- Constraints now come with HOW TO APPLY THEM
- Each constraint is selected/generated with your specific block in mind
- The LLM scaffold ensures the constraint is ACTIONABLE, not just clever

The 'llmPrompt' field contains a prompt that will:
1. Apply this constraint to your specific block
2. Generate concrete steps you can take
3. Speculate on what might emerge
4. Provide an escape hatch if this constraint isn't working`;
    }
    /**
     * Update dream graph
     */
    updateDreamGraph(block, constraint, constraintType) {
        const timestamp = Date.now();
        const blockId = `constraint-block-${timestamp}`;
        const constraintId = `constraint-${timestamp}`;
        try {
            this.dreamGraph.addNode({
                id: blockId,
                content: block.substring(0, 200),
                creationTimestamp: timestamp,
                source: "oblique_constraint",
                metadata: { role: "block", constraintType },
            });
            this.dreamGraph.addNode({
                id: constraintId,
                content: constraint,
                creationTimestamp: timestamp + 1,
                source: "oblique_constraint",
                metadata: { role: "constraint", constraintType },
            });
            this.dreamGraph.addEdge({
                source: blockId,
                target: constraintId,
                type: EdgeType.CONTRASTS_WITH,
                weight: 0.7,
                metadata: { constraintType },
            });
            this.dreamGraph.visitNode(constraintId);
        }
        catch (error) {
            // Ignore errors
        }
    }
}
