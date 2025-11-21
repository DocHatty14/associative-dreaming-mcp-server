/**
 * Zod schemas for input validation - replaces manual isValid* methods
 */
import { z } from "zod";
/**
 * Semantic Drift input schema
 */
export const SemanticDriftInputSchema = z.object({
    anchorConcept: z.string().min(1, "anchorConcept cannot be empty"),
    driftMagnitude: z.number().min(0).max(1).optional().default(0.5),
    temperature: z.number().min(0).max(1).optional().default(0.7),
});
/**
 * Bisociative Synthesis input schema
 */
export const BisociativeSynthesisInputSchema = z.object({
    matrixA: z.string().min(1, "matrixA cannot be empty"),
    matrixB: z.string().optional(),
    blendType: z.string().optional(),
});
/**
 * Oblique Constraint input schema
 */
export const ObliqueConstraintInputSchema = z.object({
    currentBlock: z.string().min(1, "currentBlock cannot be empty"),
    constraintType: z
        .enum(["oblique", "scamper", "creative", "random"])
        .optional()
        .default("random"),
});
/**
 * Serendipity Scan input schema
 */
export const SerendipityScanInputSchema = z.object({
    currentContext: z.string().min(1, "currentContext cannot be empty"),
    noveltyThreshold: z.number().min(0).max(1).optional().default(0.5),
    scanType: z
        .enum(["bridge", "gap", "pattern", "random"])
        .optional()
        .default("random"),
    recentHistoryWindow: z.number().int().min(0).optional().default(10),
});
/**
 * Prior output schema for meta-association
 */
export const PriorOutputSchema = z.object({
    tool: z.enum([
        "semantic_drift",
        "bisociative_synthesis",
        "oblique_constraint",
        "serendipity_scan",
    ]),
    result: z.record(z.string(), z.unknown()),
    timestamp: z.number().optional(),
});
/**
 * Meta Association input schema
 */
export const MetaAssociationInputSchema = z.object({
    priorOutputs: z
        .array(PriorOutputSchema)
        .min(2, "At least 2 prior outputs required"),
    chaosIntensity: z.number().min(0).max(1).optional().default(0.7),
    contextAnchor: z.string().optional(),
});
/**
 * Tool name enum
 */
export const ToolNameSchema = z.enum([
    "semantic_drift",
    "bisociative_synthesis",
    "oblique_constraint",
    "serendipity_scan",
    "meta_association",
]);
/**
 * Generic validation function with detailed error messages
 */
export function validateInput(schema, data, toolName) {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    const errorMessages = result.error.issues.map((issue) => {
        const path = issue.path.join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
    });
    const prefix = toolName
        ? `Invalid ${toolName} input: `
        : "Validation failed: ";
    return {
        success: false,
        error: prefix + errorMessages.join("; "),
        details: result.error.issues,
    };
}
/**
 * Map of tool names to their schemas
 */
export const ToolSchemas = {
    semantic_drift: SemanticDriftInputSchema,
    bisociative_synthesis: BisociativeSynthesisInputSchema,
    oblique_constraint: ObliqueConstraintInputSchema,
    serendipity_scan: SerendipityScanInputSchema,
    meta_association: MetaAssociationInputSchema,
};
/**
 * Validate input for a specific tool
 */
export function validateToolInput(toolName, input) {
    const toolNameResult = ToolNameSchema.safeParse(toolName);
    if (!toolNameResult.success) {
        return {
            success: false,
            error: `Unknown tool: ${toolName}`,
            details: [],
        };
    }
    const schema = ToolSchemas[toolNameResult.data];
    return validateInput(schema, input, toolName);
}
