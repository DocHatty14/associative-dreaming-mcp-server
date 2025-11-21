/**
 * Error handling system with error codes and structured errors
 */
/**
 * Error codes for the Associative Dreaming server
 */
export declare enum ErrorCode {
    INVALID_INPUT = "E100",
    MISSING_REQUIRED_FIELD = "E101",
    INVALID_FIELD_TYPE = "E102",
    FIELD_OUT_OF_RANGE = "E103",
    INVALID_ENUM_VALUE = "E104",
    NODE_NOT_FOUND = "E200",
    NODE_ALREADY_EXISTS = "E201",
    EDGE_NOT_FOUND = "E202",
    INVALID_EDGE = "E203",
    GRAPH_EMPTY = "E204",
    UNKNOWN_TOOL = "E300",
    TOOL_EXECUTION_FAILED = "E301",
    INSUFFICIENT_INPUTS = "E302",
    NO_ASSOCIATIONS_FOUND = "E303",
    DRIFT_FAILED = "E304",
    SYNTHESIS_FAILED = "E305",
    DATA_FILE_NOT_FOUND = "E400",
    INVALID_DATA_FORMAT = "E401",
    DATA_LOAD_FAILED = "E402",
    INVALID_CONFIG = "E500",
    MISSING_CONFIG = "E501",
    INTERNAL_ERROR = "E900",
    NOT_IMPLEMENTED = "E901"
}
/**
 * Context for structured error information
 */
export interface ErrorContext {
    field?: string;
    expected?: string | number | string[];
    received?: unknown;
    tool?: string;
    nodeId?: string;
    [key: string]: unknown;
}
/**
 * Custom error class for Associative Dreaming
 */
export declare class DreamError extends Error {
    readonly code: ErrorCode;
    readonly context: ErrorContext;
    readonly timestamp: number;
    readonly recoverable: boolean;
    constructor(code: ErrorCode, message: string, context?: ErrorContext, recoverable?: boolean);
    /**
     * Convert to JSON for API responses
     */
    toJSON(): Record<string, unknown>;
    /**
     * Create human-readable string
     */
    toString(): string;
}
/**
 * Factory functions for common errors
 */
export declare const Errors: {
    invalidInput: (field: string, expected: string, received: unknown) => DreamError;
    missingField: (field: string) => DreamError;
    outOfRange: (field: string, min: number, max: number, received: number) => DreamError;
    nodeNotFound: (nodeId: string) => DreamError;
    nodeExists: (nodeId: string) => DreamError;
    unknownTool: (tool: string) => DreamError;
    toolFailed: (tool: string, reason: string) => DreamError;
    noAssociations: (concept: string) => DreamError;
    dataNotFound: (file: string) => DreamError;
    internal: (message: string) => DreamError;
};
/**
 * Check if an error is a DreamError
 */
export declare function isDreamError(error: unknown): error is DreamError;
/**
 * Wrap unknown errors into DreamError
 */
export declare function wrapError(error: unknown, context?: ErrorContext): DreamError;
/**
 * Try-catch wrapper that converts errors to DreamError
 */
export declare function tryCatch<T>(fn: () => T, context?: ErrorContext): T | DreamError;
/**
 * Async try-catch wrapper
 */
export declare function tryCatchAsync<T>(fn: () => Promise<T>, context?: ErrorContext): Promise<T | DreamError>;
