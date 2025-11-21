/**
 * Error handling system with error codes and structured errors
 */

/**
 * Error codes for the Associative Dreaming server
 */
export enum ErrorCode {
  // Input validation errors (1xx)
  INVALID_INPUT = 'E100',
  MISSING_REQUIRED_FIELD = 'E101',
  INVALID_FIELD_TYPE = 'E102',
  FIELD_OUT_OF_RANGE = 'E103',
  INVALID_ENUM_VALUE = 'E104',

  // Graph errors (2xx)
  NODE_NOT_FOUND = 'E200',
  NODE_ALREADY_EXISTS = 'E201',
  EDGE_NOT_FOUND = 'E202',
  INVALID_EDGE = 'E203',
  GRAPH_EMPTY = 'E204',

  // Tool errors (3xx)
  UNKNOWN_TOOL = 'E300',
  TOOL_EXECUTION_FAILED = 'E301',
  INSUFFICIENT_INPUTS = 'E302',
  NO_ASSOCIATIONS_FOUND = 'E303',
  DRIFT_FAILED = 'E304',
  SYNTHESIS_FAILED = 'E305',

  // Data errors (4xx)
  DATA_FILE_NOT_FOUND = 'E400',
  INVALID_DATA_FORMAT = 'E401',
  DATA_LOAD_FAILED = 'E402',

  // Configuration errors (5xx)
  INVALID_CONFIG = 'E500',
  MISSING_CONFIG = 'E501',

  // Internal errors (9xx)
  INTERNAL_ERROR = 'E900',
  NOT_IMPLEMENTED = 'E901',
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
export class DreamError extends Error {
  public readonly code: ErrorCode;
  public readonly context: ErrorContext;
  public readonly timestamp: number;
  public readonly recoverable: boolean;

  constructor(
    code: ErrorCode,
    message: string,
    context: ErrorContext = {},
    recoverable = false
  ) {
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
  public toJSON(): Record<string, unknown> {
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
  public toString(): string {
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
  invalidInput: (field: string, expected: string, received: unknown) =>
    new DreamError(
      ErrorCode.INVALID_INPUT,
      `Invalid value for '${field}': expected ${expected}`,
      { field, expected, received }
    ),

  missingField: (field: string) =>
    new DreamError(
      ErrorCode.MISSING_REQUIRED_FIELD,
      `Missing required field: '${field}'`,
      { field }
    ),

  outOfRange: (field: string, min: number, max: number, received: number) =>
    new DreamError(
      ErrorCode.FIELD_OUT_OF_RANGE,
      `'${field}' must be between ${min} and ${max}, got ${received}`,
      { field, expected: `${min}-${max}`, received }
    ),

  nodeNotFound: (nodeId: string) =>
    new DreamError(
      ErrorCode.NODE_NOT_FOUND,
      `Node '${nodeId}' not found in graph`,
      { nodeId }
    ),

  nodeExists: (nodeId: string) =>
    new DreamError(
      ErrorCode.NODE_ALREADY_EXISTS,
      `Node '${nodeId}' already exists`,
      { nodeId }
    ),

  unknownTool: (tool: string) =>
    new DreamError(
      ErrorCode.UNKNOWN_TOOL,
      `Unknown tool: '${tool}'`,
      { tool }
    ),

  toolFailed: (tool: string, reason: string) =>
    new DreamError(
      ErrorCode.TOOL_EXECUTION_FAILED,
      `Tool '${tool}' failed: ${reason}`,
      { tool, reason },
      true // Often recoverable
    ),

  noAssociations: (concept: string) =>
    new DreamError(
      ErrorCode.NO_ASSOCIATIONS_FOUND,
      `No associations found for concept: '${concept}'`,
      { concept },
      true
    ),

  dataNotFound: (file: string) =>
    new DreamError(
      ErrorCode.DATA_FILE_NOT_FOUND,
      `Data file not found: ${file}`,
      { file }
    ),

  internal: (message: string) =>
    new DreamError(
      ErrorCode.INTERNAL_ERROR,
      message,
      {}
    ),
};

/**
 * Check if an error is a DreamError
 */
export function isDreamError(error: unknown): error is DreamError {
  return error instanceof DreamError;
}

/**
 * Wrap unknown errors into DreamError
 */
export function wrapError(error: unknown, context: ErrorContext = {}): DreamError {
  if (isDreamError(error)) {
    return error;
  }

  const message = error instanceof Error ? error.message : String(error);
  return new DreamError(ErrorCode.INTERNAL_ERROR, message, context);
}

/**
 * Try-catch wrapper that converts errors to DreamError
 */
export function tryCatch<T>(
  fn: () => T,
  context: ErrorContext = {}
): T | DreamError {
  try {
    return fn();
  } catch (error) {
    return wrapError(error, context);
  }
}

/**
 * Async try-catch wrapper
 */
export async function tryCatchAsync<T>(
  fn: () => Promise<T>,
  context: ErrorContext = {}
): Promise<T | DreamError> {
  try {
    return await fn();
  } catch (error) {
    return wrapError(error, context);
  }
}
