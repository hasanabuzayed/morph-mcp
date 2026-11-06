/**
 * Canonical MCP tool names.
 *
 * Both the server (index.ts) and tests import from here so
 * the set of advertised tools stays in sync.
 */
export declare const TOOL_NAMES: {
    readonly EDIT_FILE: "edit_file";
    readonly CODEBASE_SEARCH: "codebase_search";
    readonly GITHUB_CODEBASE_SEARCH: "github_codebase_search";
};
export type ToolName = (typeof TOOL_NAMES)[keyof typeof TOOL_NAMES];
export declare const ALL_TOOL_NAMES: readonly ToolName[];
export declare const KNOWN_TOOL_NAMES: Set<string>;
/**
 * Tool names from older releases (≤0.8.113) that configs in the wild still use.
 * Both ENABLED_TOOLS and DISABLED_TOOLS accept them.
 */
export declare const LEGACY_TOOL_ALIASES: Readonly<Record<string, ToolName>>;
export interface ToolFilter {
    /** Tools the server must not advertise or run. */
    disabled: Set<string>;
    /** Names in either variable that match no tool, after alias resolution. */
    unknown: string[];
}
/**
 * Resolve which tools are off from the two env variables.
 *
 * `ENABLED_TOOLS` is an allow-list (`all` means every tool). `DISABLED_TOOLS`
 * is a deny-list. When both are set, a tool is on only if it is allowed and
 * not denied. Neither set → everything on. ENABLED_TOOLS existed in
 * 0.8.22–0.8.113, was dropped in 0.8.114 and replaced by DISABLED_TOOLS in
 * 0.8.125; honoring both keeps older configs working.
 */
export declare function resolveToolFilter(env: {
    ENABLED_TOOLS?: string;
    DISABLED_TOOLS?: string;
}): ToolFilter;
