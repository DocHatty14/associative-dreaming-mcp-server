# 🚀 PHASE 1 INSTALLATION GUIDE

## Step 1: Install NLP Dependencies

Run these commands in your project root:

```bash
npm install compromise natural stopword
npm install --save-dev @types/natural
```

**What these do:**
- `compromise` (Real NLP): Part-of-speech tagging, noun phrase extraction, named entity recognition
- `natural` (Statistical NLP): TF-IDF, tokenization, stemming
- `stopword` (Noise removal): Remove common words like "the", "a", "is"

---

## Step 2: Verify Installation

After installation, verify your `package.json` includes:

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.22.0",
    "chalk": "^5.3.0",
    "compromise": "^14.x",
    "natural": "^7.x",
    "stopword": "^3.x",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/natural": "^5.x",
    "@types/node": "^22.19.1",
    "@vitest/coverage-v8": "^2.1.5",
    "typescript": "^5.7.2",
    "vitest": "^2.1.5"
  }
}
```

---

## Step 3: Create New Files

I've already created these files for you:

1. ✅ `src/utils/concept-extractor.ts` - Real NLP concept extraction
2. ✅ `src/utils/transparency.ts` - Honest transparency reporting

---

## Step 4: Integrate Into Tools

Now we need to integrate these into your existing tools. Here's the integration pattern:

### Example Integration (semantic-drift.ts)

```typescript
// Add imports at top
import { conceptExtractor, ExtractedConcept } from '../utils/concept-extractor.js';
import { createTransparencyReport } from '../utils/transparency.js';

// In your tool's main function
export async function semanticDrift(input: SemanticDriftInput): Promise<SemanticDriftOutput> {
  // 1. Create transparency tracker
  const transparency = createTransparencyReport('semantic-drift');
  
  // 2. Extract concepts using REAL NLP
  const startExtraction = Date.now();
  const extraction = conceptExtractor.extractConcepts(input.anchorConcept, {
    maxConcepts: 5,
    minImportance: 0.3,
  });
  const extractionTime = Date.now() - startExtraction;
  
  transparency.addComputation(
    `Extracted ${extraction.concepts.length} concepts from anchor`,
    extraction.extractionMethod,
    extraction.confidence,
    extractionTime
  );
  
  // 3. Add LLM dependency markers
  transparency.addLLMDependency(
    'Generate creative semantic leap',
    'Creative reasoning requires LLM to explore conceptual space',
    'required',
    2000 // estimated 2 seconds
  );
  
  // 4. Add warnings if needed
  if (extraction.fallbackUsed) {
    transparency.addWarning('Used fallback extraction method - concept quality may vary');
  }
  
  // 5. Build final report
  const transparencyReport = transparency.build(
    extraction.confidence * 0.7, // Overall confidence (penalized for LLM dependency)
    'Based on NLP extraction quality and LLM requirement'
  );
  
  // 6. Return with transparency
  return {
    // ... your existing output fields ...
    transparency: transparencyReport,
  };
}
```

---

## Step 5: Update Output Schemas

Add transparency field to your output types:

```typescript
import { TransparencyReport } from '../utils/transparency.js';

export interface SemanticDriftOutput {
  // ... existing fields ...
  
  /** Transparency report showing what was computed vs. what needs LLM */
  transparency?: TransparencyReport;
}
```

---

## Step 6: Test Everything

```bash
# Rebuild
npm run build

# Run tests
npm test

# Try it out
npm start
```

---

## Step 7: Verify Output

When you run a tool, you should now see:

```json
{
  "scaffold": { ... },
  "llmPrompt": "...",
  "transparency": {
    "summary": "Completed 3 computational operations in 45ms. Requires LLM completion (2 required operations, ~4000ms).",
    "computationalWork": [
      {
        "description": "Extracted 8 concepts from anchor",
        "method": "compromise-nlp + tfidf",
        "confidence": 0.82,
        "timingMs": 23
      }
    ],
    "llmDependencies": [
      {
        "description": "Generate creative semantic leap",
        "rationale": "Creative reasoning requires LLM to explore conceptual space",
        "criticality": "required",
        "estimatedTimingMs": 2000
      }
    ],
    "confidenceGrounding": {
      "score": 0.67,
      "reasoning": "Strong computational foundation, high LLM dependency",
      "factors": [
        "Computation confidence: 82% (based on 3 operations)",
        "LLM dependencies: 2 (affects final quality)"
      ]
    },
    "timing": {
      "totalComputationMs": 45,
      "estimatedLLMMs": 4000,
      "breakdown": {
        "server-computation": 45,
        "llm-1-generate-creative-semantic-leap": 2000,
        "llm-2-construct-because-chain": 2000
      }
    },
    "warnings": [],
    "metadata": {
      "timestamp": 1734123456789,
      "toolName": "semantic-drift",
      "version": "1.0.0"
    }
  }
}
```

---

## Step 8: Integration Checklist

- [ ] NPM packages installed
- [ ] concept-extractor.ts created
- [ ] transparency.ts created
- [ ] semantic-drift.ts integrated
- [ ] bisociative-synthesis.ts integrated
- [ ] meta-association.ts integrated
- [ ] oblique-constraint.ts integrated
- [ ] serendipity-scan.ts integrated
- [ ] Output schemas updated
- [ ] Tests passing
- [ ] Documentation updated

---

## 🎯 Expected Results

**Before Phase 1:**
- Template strings with `[PENDING LLM...]`
- `Math.random()` for scores
- No transparency about methods
- Users confused about what's real

**After Phase 1:**
- Real NLP concept extraction
- Honest confidence scores
- Full transparency reports
- Users know exactly what's computed vs. what needs LLM

---

## 🆘 Troubleshooting

### "Cannot find module 'compromise'"
- Run: `npm install` again
- Check: package.json has compromise listed
- Try: Delete node_modules and reinstall

### "Property 'transparency' does not exist"
- Update your output interfaces to include `transparency?: TransparencyReport`
- Make sure you're importing from `../utils/transparency.js`

### "Tests failing"
- Update test mocks to include transparency field
- Add test cases for concept extraction
- Check that all tools return TransparencyReport

---

## 🚀 Next Steps After Phase 1

Once Phase 1 is complete, you can optionally add:

1. **Vector Engine** (Phase 1.5)
   - Real semantic similarity
   - True distance calculation
   - Vector space navigation

2. **Performance Optimization** (Phase 2)
   - Caching for frequent concepts
   - Parallel processing
   - Streaming outputs

3. **Visualization** (Phase 3)
   - Concept maps
   - Drift visualization
   - Transparency dashboards

---

**Need help?** Check the integration examples in each tool file, or refer to the transparency.ts documentation.
