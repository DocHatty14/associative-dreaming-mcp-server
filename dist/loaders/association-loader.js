/**
 * Association Data Loader
 *
 * Loads association data from JSON files instead of hardcoded TypeScript.
 * Provides caching, validation, and deduplication.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { normalizeConcept, deduplicateAssociations } from '../utils/concept.js';
/**
 * Cache for loaded associations
 */
let associationCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
/**
 * Get the data directory path
 */
function getDataDirectory() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '..', 'data', 'associations');
}
/**
 * Load a single JSON domain file
 */
function loadDomainFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`Domain file not found: ${filePath}`);
            return null;
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        // Validate structure
        if (!data.associations || typeof data.associations !== 'object') {
            console.error(`Invalid domain file structure: ${filePath}`);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error(`Failed to load domain file ${filePath}:`, error);
        return null;
    }
}
/**
 * Load all domain files from the associations directory
 */
function loadAllDomains() {
    const associations = new Map();
    const dataDir = getDataDirectory();
    // Check if directory exists
    if (!fs.existsSync(dataDir)) {
        console.error(`Associations directory not found: ${dataDir}`);
        return associations;
    }
    // Load all JSON files
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const domainData = loadDomainFile(filePath);
        if (domainData) {
            // Merge associations with normalization and deduplication
            for (const [concept, assocs] of Object.entries(domainData.associations)) {
                const normalizedKey = normalizeConcept(concept);
                const existing = associations.get(normalizedKey) || [];
                const merged = [...existing, ...assocs];
                const deduplicated = deduplicateAssociations(merged);
                associations.set(normalizedKey, deduplicated);
            }
        }
    }
    return associations;
}
/**
 * Get all loaded associations (with caching)
 */
export function getAssociations() {
    const now = Date.now();
    // Return cached if valid
    if (associationCache && (now - cacheTimestamp) < CACHE_TTL) {
        return associationCache;
    }
    // Load and cache
    associationCache = loadAllDomains();
    cacheTimestamp = now;
    return associationCache;
}
/**
 * Get associations for a specific concept
 */
export function getAssociationsFor(concept) {
    const associations = getAssociations();
    const normalized = normalizeConcept(concept);
    return associations.get(normalized) || [];
}
/**
 * Check if a concept has any associations
 */
export function hasAssociations(concept) {
    const associations = getAssociations();
    const normalized = normalizeConcept(concept);
    return associations.has(normalized);
}
/**
 * Get all known concepts
 */
export function getAllConcepts() {
    const associations = getAssociations();
    return Array.from(associations.keys());
}
/**
 * Get association count
 */
export function getAssociationCount() {
    const associations = getAssociations();
    let totalAssociations = 0;
    for (const assocs of associations.values()) {
        totalAssociations += assocs.length;
    }
    return {
        concepts: associations.size,
        totalAssociations,
    };
}
/**
 * Clear the cache (for testing or reloading)
 */
export function clearAssociationCache() {
    associationCache = null;
    cacheTimestamp = 0;
}
/**
 * Merge custom associations with loaded ones
 */
export function mergeAssociations(base, custom) {
    const result = new Map(base);
    for (const [concept, assocs] of Object.entries(custom)) {
        const normalized = normalizeConcept(concept);
        const existing = result.get(normalized) || [];
        const merged = [...existing, ...assocs];
        const deduplicated = deduplicateAssociations(merged);
        result.set(normalized, deduplicated);
    }
    return result;
}
/**
 * Find associations within a distance range
 */
export function findByDistance(concept, minDistance, maxDistance) {
    const assocs = getAssociationsFor(concept);
    return assocs.filter(a => a.distance >= minDistance && a.distance <= maxDistance);
}
/**
 * Find cross-domain bridges (concepts that appear in multiple domains)
 */
export function findCrossDomainConcepts() {
    const conceptDomains = new Map();
    const dataDir = getDataDirectory();
    if (!fs.existsSync(dataDir))
        return [];
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const domainData = loadDomainFile(filePath);
        if (domainData) {
            const domainName = domainData.domain || file.replace('.json', '');
            for (const assocs of Object.values(domainData.associations)) {
                for (const assoc of assocs) {
                    const normalized = normalizeConcept(assoc.concept);
                    const domains = conceptDomains.get(normalized) || new Set();
                    domains.add(domainName);
                    conceptDomains.set(normalized, domains);
                }
            }
        }
    }
    // Return concepts that appear in 2+ domains
    return Array.from(conceptDomains.entries())
        .filter(([_, domains]) => domains.size >= 2)
        .map(([concept, _]) => concept);
}
