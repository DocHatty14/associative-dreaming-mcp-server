/**
 * Configuration system for Associative Dreaming MCP Server
 *
 * Loads configuration from:
 * 1. Environment variables (highest priority)
 * 2. Config file (if exists)
 * 3. Default values (lowest priority)
 */
import * as fs from "fs";
import * as path from "path";
/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
    semanticDrift: {
        defaultTemperature: 0.7,
        defaultDriftMagnitude: 0.5,
        targetBandwidth: 0.25,
        maxDriftIterations: 10,
        crossDomainChance: 0.3,
        loopDetectionEnabled: true,
    },
    serendipityScan: {
        defaultNoveltyThreshold: 0.5,
        recentHistoryWindow: 10,
        bridgeBoost: 0.2,
        temporalDiversityWindow: 5,
        maxResults: 10,
    },
    bisociativeSynthesis: {
        defaultBlendIntensity: 0.5,
        maxMappings: 5,
        preferredPatterns: ["hierarchy", "network", "cycle", "emergence"],
    },
    obliqueConstraint: {
        maxHints: 3,
        preferContextual: true,
    },
    metaAssociation: {
        defaultChaosIntensity: 0.7,
        minPriorOutputs: 2,
        maxCollisionPoints: 5,
        weirdnessThreshold: 0.3,
    },
    graph: {
        clusterWeightThreshold: 0.5,
        betweennessSampling: true,
        betweennessSampleSize: 100,
        maxShortestPathDepth: 10,
        cacheEnabled: true,
        cacheTTL: 300,
    },
    logging: {
        enabled: true,
        level: "info",
        colorized: true,
        includeTimestamp: false,
    },
};
/**
 * Parse boolean from environment variable
 */
function parseBoolean(value, defaultValue) {
    if (value === undefined)
        return defaultValue;
    return value.toLowerCase() === "true" || value === "1";
}
/**
 * Parse number from environment variable
 */
function parseNumber(value, defaultValue) {
    if (value === undefined)
        return defaultValue;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
}
/**
 * Parse array from environment variable (comma-separated)
 */
function parseArray(value, defaultValue) {
    if (value === undefined)
        return defaultValue;
    return value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
}
/**
 * Load configuration from environment variables
 */
function loadFromEnv(defaults) {
    return {
        semanticDrift: {
            defaultTemperature: parseNumber(process.env.DRIFT_TEMPERATURE, defaults.semanticDrift.defaultTemperature),
            defaultDriftMagnitude: parseNumber(process.env.DRIFT_MAGNITUDE, defaults.semanticDrift.defaultDriftMagnitude),
            targetBandwidth: parseNumber(process.env.DRIFT_BANDWIDTH, defaults.semanticDrift.targetBandwidth),
            maxDriftIterations: parseNumber(process.env.DRIFT_MAX_ITERATIONS, defaults.semanticDrift.maxDriftIterations),
            crossDomainChance: parseNumber(process.env.DRIFT_CROSS_DOMAIN_CHANCE, defaults.semanticDrift.crossDomainChance),
            loopDetectionEnabled: parseBoolean(process.env.DRIFT_LOOP_DETECTION, defaults.semanticDrift.loopDetectionEnabled),
        },
        serendipityScan: {
            defaultNoveltyThreshold: parseNumber(process.env.SERENDIPITY_NOVELTY, defaults.serendipityScan.defaultNoveltyThreshold),
            recentHistoryWindow: parseNumber(process.env.SERENDIPITY_HISTORY_WINDOW, defaults.serendipityScan.recentHistoryWindow),
            bridgeBoost: parseNumber(process.env.SERENDIPITY_BRIDGE_BOOST, defaults.serendipityScan.bridgeBoost),
            temporalDiversityWindow: parseNumber(process.env.SERENDIPITY_TEMPORAL_WINDOW, defaults.serendipityScan.temporalDiversityWindow),
            maxResults: parseNumber(process.env.SERENDIPITY_MAX_RESULTS, defaults.serendipityScan.maxResults),
        },
        bisociativeSynthesis: {
            defaultBlendIntensity: parseNumber(process.env.SYNTHESIS_BLEND_INTENSITY, defaults.bisociativeSynthesis.defaultBlendIntensity),
            maxMappings: parseNumber(process.env.SYNTHESIS_MAX_MAPPINGS, defaults.bisociativeSynthesis.maxMappings),
            preferredPatterns: parseArray(process.env.SYNTHESIS_PATTERNS, defaults.bisociativeSynthesis.preferredPatterns),
        },
        obliqueConstraint: {
            maxHints: parseNumber(process.env.OBLIQUE_MAX_HINTS, defaults.obliqueConstraint.maxHints),
            preferContextual: parseBoolean(process.env.OBLIQUE_PREFER_CONTEXTUAL, defaults.obliqueConstraint.preferContextual),
        },
        metaAssociation: {
            defaultChaosIntensity: parseNumber(process.env.META_CHAOS_INTENSITY, defaults.metaAssociation.defaultChaosIntensity),
            minPriorOutputs: parseNumber(process.env.META_MIN_OUTPUTS, defaults.metaAssociation.minPriorOutputs),
            maxCollisionPoints: parseNumber(process.env.META_MAX_COLLISIONS, defaults.metaAssociation.maxCollisionPoints),
            weirdnessThreshold: parseNumber(process.env.META_WEIRDNESS_THRESHOLD, defaults.metaAssociation.weirdnessThreshold),
        },
        graph: {
            clusterWeightThreshold: parseNumber(process.env.GRAPH_CLUSTER_THRESHOLD, defaults.graph.clusterWeightThreshold),
            betweennessSampling: parseBoolean(process.env.GRAPH_BETWEENNESS_SAMPLING, defaults.graph.betweennessSampling),
            betweennessSampleSize: parseNumber(process.env.GRAPH_SAMPLE_SIZE, defaults.graph.betweennessSampleSize),
            maxShortestPathDepth: parseNumber(process.env.GRAPH_MAX_PATH_DEPTH, defaults.graph.maxShortestPathDepth),
            cacheEnabled: parseBoolean(process.env.GRAPH_CACHE_ENABLED, defaults.graph.cacheEnabled),
            cacheTTL: parseNumber(process.env.GRAPH_CACHE_TTL, defaults.graph.cacheTTL),
        },
        logging: {
            enabled: !parseBoolean(process.env.DISABLE_DREAM_LOGGING, !defaults.logging.enabled),
            level: process.env.LOG_LEVEL ||
                defaults.logging.level,
            colorized: parseBoolean(process.env.LOG_COLORIZED, defaults.logging.colorized),
            includeTimestamp: parseBoolean(process.env.LOG_TIMESTAMP, defaults.logging.includeTimestamp),
        },
    };
}
/**
 * Load configuration from a JSON file
 */
function loadFromFile(filePath, defaults) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf-8");
            const fileConfig = JSON.parse(content);
            return deepMerge(defaults, fileConfig);
        }
    }
    catch (error) {
        console.error(`Warning: Failed to load config from ${filePath}:`, error);
    }
    return defaults;
}
/**
 * Deep merge two objects
 */
function deepMerge(target, source) {
    const result = {
        semanticDrift: { ...target.semanticDrift },
        serendipityScan: { ...target.serendipityScan },
        bisociativeSynthesis: { ...target.bisociativeSynthesis },
        obliqueConstraint: { ...target.obliqueConstraint },
        metaAssociation: { ...target.metaAssociation },
        graph: { ...target.graph },
        logging: { ...target.logging },
    };
    // Type-safe merge for each section
    if (source.semanticDrift && typeof source.semanticDrift === "object") {
        Object.assign(result.semanticDrift, source.semanticDrift);
    }
    if (source.serendipityScan && typeof source.serendipityScan === "object") {
        Object.assign(result.serendipityScan, source.serendipityScan);
    }
    if (source.bisociativeSynthesis &&
        typeof source.bisociativeSynthesis === "object") {
        Object.assign(result.bisociativeSynthesis, source.bisociativeSynthesis);
    }
    if (source.obliqueConstraint &&
        typeof source.obliqueConstraint === "object") {
        Object.assign(result.obliqueConstraint, source.obliqueConstraint);
    }
    if (source.metaAssociation && typeof source.metaAssociation === "object") {
        Object.assign(result.metaAssociation, source.metaAssociation);
    }
    if (source.graph && typeof source.graph === "object") {
        Object.assign(result.graph, source.graph);
    }
    if (source.logging && typeof source.logging === "object") {
        Object.assign(result.logging, source.logging);
    }
    return result;
}
// Singleton config instance
let configInstance = null;
/**
 * Load and return the configuration
 * Priority: Environment variables > config file > defaults
 */
export function loadConfig(configFilePath) {
    if (configInstance)
        return configInstance;
    // Start with defaults
    let config = { ...DEFAULT_CONFIG };
    // Try to load from config file
    const filePath = configFilePath || path.join(process.cwd(), "dream-config.json");
    config = loadFromFile(filePath, config);
    // Override with environment variables
    config = loadFromEnv(config);
    configInstance = config;
    return config;
}
/**
 * Get current configuration (throws if not loaded)
 */
export function getConfig() {
    if (!configInstance) {
        return loadConfig();
    }
    return configInstance;
}
/**
 * Reset configuration (for testing)
 */
export function resetConfig() {
    configInstance = null;
}
/**
 * Get default configuration
 */
export function getDefaultConfig() {
    return { ...DEFAULT_CONFIG };
}
