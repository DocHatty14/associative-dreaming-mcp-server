/**
 * Zod schemas for input validation - replaces manual isValid* methods
 */
import { z } from "zod";
/**
 * Semantic Drift input schema
 */
export declare const SemanticDriftInputSchema: z.ZodObject<{
    anchorConcept: z.ZodString;
    driftMagnitude: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    temperature: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export type SemanticDriftInput = z.infer<typeof SemanticDriftInputSchema>;
/**
 * Bisociative Synthesis input schema
 */
export declare const BisociativeSynthesisInputSchema: z.ZodObject<{
    matrixA: z.ZodString;
    matrixB: z.ZodOptional<z.ZodString>;
    blendType: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type BisociativeSynthesisInput = z.infer<typeof BisociativeSynthesisInputSchema>;
/**
 * Oblique Constraint input schema
 */
export declare const ObliqueConstraintInputSchema: z.ZodObject<{
    currentBlock: z.ZodString;
    constraintType: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        random: "random";
        oblique: "oblique";
        scamper: "scamper";
        creative: "creative";
    }>>>;
}, z.core.$strip>;
export type ObliqueConstraintInput = z.infer<typeof ObliqueConstraintInputSchema>;
/**
 * Serendipity Scan input schema
 */
export declare const SerendipityScanInputSchema: z.ZodObject<{
    currentContext: z.ZodString;
    noveltyThreshold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    scanType: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        bridge: "bridge";
        gap: "gap";
        pattern: "pattern";
        random: "random";
    }>>>;
    recentHistoryWindow: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export type SerendipityScanInput = z.infer<typeof SerendipityScanInputSchema>;
/**
 * Prior output schema for meta-association
 */
export declare const PriorOutputSchema: z.ZodObject<{
    tool: z.ZodEnum<{
        semantic_drift: "semantic_drift";
        bisociative_synthesis: "bisociative_synthesis";
        oblique_constraint: "oblique_constraint";
        serendipity_scan: "serendipity_scan";
    }>;
    result: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    timestamp: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Meta Association input schema
 */
export declare const MetaAssociationInputSchema: z.ZodObject<{
    priorOutputs: z.ZodArray<z.ZodObject<{
        tool: z.ZodEnum<{
            semantic_drift: "semantic_drift";
            bisociative_synthesis: "bisociative_synthesis";
            oblique_constraint: "oblique_constraint";
            serendipity_scan: "serendipity_scan";
        }>;
        result: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        timestamp: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    chaosIntensity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    contextAnchor: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MetaAssociationInput = z.infer<typeof MetaAssociationInputSchema>;
/**
 * Tool name enum
 */
export declare const ToolNameSchema: z.ZodEnum<{
    semantic_drift: "semantic_drift";
    bisociative_synthesis: "bisociative_synthesis";
    oblique_constraint: "oblique_constraint";
    serendipity_scan: "serendipity_scan";
    meta_association: "meta_association";
}>;
export type ToolName = z.infer<typeof ToolNameSchema>;
/**
 * Generic validation function with detailed error messages
 */
export declare function validateInput<T>(schema: z.ZodSchema<T>, data: unknown, toolName?: string): {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
    details: z.ZodIssue[];
};
/**
 * Map of tool names to their schemas
 */
export declare const ToolSchemas: Record<ToolName, z.ZodSchema>;
/**
 * Validate input for a specific tool
 */
export declare function validateToolInput(toolName: string, input: unknown): {
    success: true;
    data: unknown;
} | {
    success: false;
    error: string;
    details: z.ZodIssue[];
};
