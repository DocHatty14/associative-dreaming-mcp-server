/**
 * Configuration system for Associative Dreaming MCP Server
 *
 * Loads configuration from:
 * 1. Environment variables (highest priority)
 * 2. Config file (if exists)
 * 3. Default values (lowest priority)
 */
/**
 * Configuration interface for semantic drift tool
 */
export interface SemanticDriftConfig {
    defaultTemperature: number;
    defaultDriftMagnitude: number;
    targetBandwidth: number;
    maxDriftIterations: number;
    crossDomainChance: number;
    loopDetectionEnabled: boolean;
}
/**
 * Configuration interface for serendipity scan tool
 */
export interface SerendipityScanConfig {
    defaultNoveltyThreshold: number;
    recentHistoryWindow: number;
    bridgeBoost: number;
    temporalDiversityWindow: number;
    maxResults: number;
}
/**
 * Configuration interface for bisociative synthesis tool
 */
export interface BisociativeSynthesisConfig {
    defaultBlendIntensity: number;
    maxMappings: number;
    preferredPatterns: string[];
}
/**
 * Configuration interface for oblique constraint tool
 */
export interface ObliqueConstraintConfig {
    maxHints: number;
    preferContextual: boolean;
}
/**
 * Configuration interface for meta-association tool
 */
export interface MetaAssociationConfig {
    defaultChaosIntensity: number;
    minPriorOutputs: number;
    maxCollisionPoints: number;
    weirdnessThreshold: number;
}
/**
 * Configuration interface for graph operations
 */
export interface GraphConfig {
    clusterWeightThreshold: number;
    betweennessSampling: boolean;
    betweennessSampleSize: number;
    maxShortestPathDepth: number;
    cacheEnabled: boolean;
    cacheTTL: number;
}
/**
 * Configuration interface for logging
 */
export interface LoggingConfig {
    enabled: boolean;
    level: "debug" | "info" | "warn" | "error";
    colorized: boolean;
    includeTimestamp: boolean;
}
/**
 * Main configuration interface
 */
export interface DreamConfig {
    semanticDrift: SemanticDriftConfig;
    serendipityScan: SerendipityScanConfig;
    bisociativeSynthesis: BisociativeSynthesisConfig;
    obliqueConstraint: ObliqueConstraintConfig;
    metaAssociation: MetaAssociationConfig;
    graph: GraphConfig;
    logging: LoggingConfig;
}
/**
 * Load and return the configuration
 * Priority: Environment variables > config file > defaults
 */
export declare function loadConfig(configFilePath?: string): DreamConfig;
/**
 * Get current configuration (throws if not loaded)
 */
export declare function getConfig(): DreamConfig;
/**
 * Reset configuration (for testing)
 */
export declare function resetConfig(): void;
/**
 * Get default configuration
 */
export declare function getDefaultConfig(): DreamConfig;
