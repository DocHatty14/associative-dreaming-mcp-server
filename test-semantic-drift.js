/**
 * Test script for Semantic Drift v2.0
 * Tests the enhanced implementation with various drift magnitudes
 */

import { AssociativeDreamingServer } from './dist/lib.js';

const server = new AssociativeDreamingServer();

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║     SEMANTIC DRIFT v2.0 - ENHANCEMENT TEST SUITE         ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

// Test cases that were previously failing
const testCases = [
  {
    name: 'Test 1: Neural Networks (Low Drift)',
    input: {
      tool: 'semantic_drift',
      input: {
        anchorConcept: 'neural networks',
        driftMagnitude: 0.3,
        temperature: 0.5
      }
    }
  },
  {
    name: 'Test 2: Network (Medium Drift)',
    input: {
      tool: 'semantic_drift',
      input: {
        anchorConcept: 'network',
        driftMagnitude: 0.5,
        temperature: 0.6
      }
    }
  },
  {
    name: 'Test 3: Algorithm (HIGH Drift)',
    input: {
      tool: 'semantic_drift',
      input: {
        anchorConcept: 'algorithm',
        driftMagnitude: 0.8,
        temperature: 0.7
      }
    }
  },
  {
    name: 'Test 4: Creativity (High Drift)',
    input: {
      tool: 'semantic_drift',
      input: {
        anchorConcept: 'creativity',
        driftMagnitude: 0.7,
        temperature: 0.8
      }
    }
  },
  {
    name: 'Test 5: AI (Very High Drift + High Chaos)',
    input: {
      tool: 'semantic_drift',
      input: {
        anchorConcept: 'AI',
        driftMagnitude: 0.9,
        temperature: 0.9
      }
    }
  },
  {
    name: 'Test 6: Blockchain (Medium-High Drift)',
    input: {
      tool: 'semantic_drift',
      input: {
        anchorConcept: 'blockchain',
        driftMagnitude: 0.6,
        temperature: 0.7
      }
    }
  }
];

// Run all tests
for (const testCase of testCases) {
  console.log('\n' + '═'.repeat(63));
  console.log(`${testCase.name}`);
  console.log('═'.repeat(63));

  try {
    const result = server.processDream(testCase.input);

    if (result.isError) {
      console.log('❌ ERROR:', result.content[0].text);
    } else {
      const parsed = JSON.parse(result.content[0].text);
      console.log('\n📍 ANCHOR:', testCase.input.input.anchorConcept);
      console.log('🎯 RESULT:', parsed.newConcept);
      console.log('📏 DISTANCE:', (parsed.driftDistance * 100).toFixed(0) + '%');
      console.log('🛤️  PATH:', parsed.driftPath.join(' → '));
      console.log('\n' + parsed.explanation);
    }
  } catch (error) {
    console.log('❌ TEST FAILED:', error.message);
    console.log(error.stack);
  }
}

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║                   TEST SUITE COMPLETE                     ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');
