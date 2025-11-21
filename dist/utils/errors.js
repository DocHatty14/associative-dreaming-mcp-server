/**
 * Error handling system with error codes and structured errors
 */
/**
 * Error codes for the Associative Dreaming server
 */
export var ErrorCode;
(function (ErrorCode) {
    // Input validation errors (1xx)
    ErrorCode["INVALID_INPUT"] = "E100";
    ErrorCode["MISSING_REQUIRED_FIELD"] = "E101";
    ErrorCode["INVALID_FIELD_TYPE"] = "E102";
    ErrorCode["FIELD_OUT_OF_RANGE"] = "E103";
    ErrorCode["INVALID_ENUM_VALUE"] = "E104";
    // Graph errors (2xx)
    ErrorCode["NODE_NOT_FOUND"] = "E200";
    ErrorCode["NODE_ALREADY_EXISTS"] = "E201";
    ErrorCode["EDGE_NOT_FOUND"] = "E202";
    ErrorCode["INVALID_EDGE"] = "E203";
    ErrorCode["GRAPH_EMPTY"] = "E204";
    // Tool errors (3xx)
    ErrorCode["UNKNOWN_TOOL"] = "E300";
    ErrorCode["TOOL_EXECUTION_FAILED"] = "E301";
    ErrorCode["INSUFFICIENT_INPUTS"] = "E302";
    ErrorCode["NO_ASSOCIATIONS_FOUND"] = "E303";
    ErrorCode["DRIFT_FAILED"] = "E304";
    ErrorCode["SYNTHESIS_FAILED"] = "E305";
    // Data errors (4xx)
    ErrorCode["DATA_FILE_NOT_FOUND"] = "E400";
    ErrorCode["INVALID_DATA_FORMAT"] = "E401";
    ErrorCode["DATA_LOAD_FAILED"] = "E402";
    // Configuration errors (5xx)
    ErrorCode["INVALID_CONFIG"] = "E500";
    ErrorCode["MISSING_CONFIG"] = "E501";
    // Internal errors (9xx)
    ErrorCode["INTERNAL_ERROR"] = "E900";
    ErrorCode["NOT_IMPLEMENTED"] = "E901";
})(ErrorCode || (ErrorCode = {}));
/**
 * Custom error class for Associative Dreaming
 */
export class DreamError extends Error {
    code;
    context;
    timestamp;
    recoverable;
    constructor(code, message, context = {}, recoverable = false) {
        super(message);
        this.name = 'DreamError';
        this.code = code;
        this.context = context;
        this.timestamp = Date.now();
        this.recoverable = recoverable;
        // Maintain proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DreamError);
        }
    }
    /**
     * Convert to JSON for API responses
     */
    toJSON() {
        return {
            error: true,
            code: this.code,
            message: this.message,
            context: this.context,
            recoverable: this.recoverable,
            timestamp: new Date(this.timestamp).toISOString(),
        };
    }
    /**
     * Create human-readable string
     */
    toString() {
        const contextStr = Object.keys(this.context).length > 0
            ? ` (${JSON.stringify(this.context)})`
            : '';
        return `[${this.code}] ${this.message}${contextStr}`;
    }
}
/**
 * Factory functions for common errors
 */
export const Errors = {
    invalidInput: (field, expected, received) => new DreamError(ErrorCode.INVALID_INPUT, `Invalid value for '${field}': expected ${expected}`, { field, expected, received }),
    missingField: (field) => new DreamError(ErrorCode.MISSING_REQUIRED_FIELD, `Missing required field: '${field}'`, { field }),
    outOfRange: (field, min, max, received) => new DreamError(ErrorCode.FIELD_OUT_OF_RANGE, `'${field}' must be between ${min} and ${max}, got ${received}`, { field, expected: `${min}-${max}`, received }),
    nodeNotFound: (nodeId) => new DreamError(ErrorCode.NODE_NOT_FOUND, `Node '${nodeId}' not found in graph`, { nodeId }),
    nodeExists: (nodeId) => new DreamError(ErrorCode.NODE_ALREADY_EXISTS, `Node '${nodeId}' already exists`, { nodeId }),
    unknownTool: (tool) => new DreamError(ErrorCode.UNKNOWN_TOOL, `Unknown tool: '${tool}'`, { tool }),
    toolFailed: (tool, reason) => new DreamError(ErrorCode.TOOL_EXECUTION_FAILED, `Tool '${tool}' failed: ${reason}`, { tool, reason }, true // Often recoverable
    ),
    noAssociations: (concept) => new DreamError(ErrorCode.NO_ASSOCIATIONS_FOUND, `No associations found for concept: '${concept}'`, { concept }, true),
    dataNotFound: (file) => new DreamError(ErrorCode.DATA_FILE_NOT_FOUND, `Data file not found: ${file}`, { file }),
    internal: (message) => new DreamError(ErrorCode.INTERNAL_ERROR, message, {}),
};
/**
 * Check if an error is a DreamError
 */
export function isDreamError(error) {
    return error instanceof DreamError;
}
/**
 * Wrap unknown errors into DreamError
 */
export function wrapError(error, context = {}) {
    if (isDreamError(error)) {
        return error;
    }
    const message = error instanceof Error ? error.message : String(error);
    return new DreamError(ErrorCode.INTERNAL_ERROR, message, context);
}
/**
 * Try-catch wrapper that converts errors to DreamError
 */
export function tryCatch(fn, context = {}) {
    try {
        return fn();
    }
    catch (error) {
        return wrapError(error, context);
    }
}
/**
 * Async try-catch wrapper
 */
export async function tryCatchAsync(fn, context = {}) {
    try {
        return await fn();
    }
    catch (error) {
        return wrapError(error, context);
    }
}
