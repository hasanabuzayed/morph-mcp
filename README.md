# Morph MCP

Supercharge your coding agent. One MCP with two specialized tools for faster edits and smarter retrieval.

> **Prefer the `morph` CLI + skills.** Same Fast Apply and WarpGrep, no tool schemas in every prompt, works in any agent with a shell:
> `curl -fsSL https://www.morphllm.com/install.sh | bash && morph install`. This MCP server stays published for hosts that need MCP.

> **Using OpenCode?** Install the [OpenCode plugin](https://github.com/morphllm/opencode-morph-plugin) instead of this MCP server. It ships the same Fast Apply + WarpGrep tools **plus** automatic context compaction and tool routing that the MCP protocol cannot provide.

## Which integration should I use?

| Harness | Use | Tools |
|---------|-----|-------|
| **OpenCode** | [`@morphllm/opencode-morph-plugin`](https://github.com/morphllm/opencode-morph-plugin) | Fast Apply + WarpGrep + GitHub search + **compaction** + tool routing |
| Cursor, Claude Code, VS Code, Windsurf, Zed, any MCP host | **this server** (`@morphllm/morphmcp`) | Fast Apply + WarpGrep + GitHub search |

Conversation **compaction is only available through the OpenCode plugin**. The MCP protocol gives a server no access to the host's conversation history, so compaction can't be exposed as an MCP tool — use the plugin if you want it.

## Tools

| Tool | What it does |
|------|-------------|
| `edit_file` | Apply code changes at 10,500+ tokens/sec with 98% accuracy |
| `codebase_search` | Natural-language code exploration sub-agent backed by WarpGrep under the hood |
| `github_codebase_search` | Search any public GitHub repo by URL or `owner/repo` shorthand |

All three tools are exposed by default. Narrow the set with `ENABLED_TOOLS` or `DISABLED_TOOLS` (see Configuration).

## Quick Start

### Claude Code

```bash
claude mcp add morph-mcp -e MORPH_API_KEY=sk-xxx -- npx -y @morphllm/morphmcp
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "morph-mcp": {
      "command": "npx",
      "args": ["-y", "@morphllm/morphmcp"],
      "env": {
        "MORPH_API_KEY": "sk-xxx"
      }
    }
  }
}
```

### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "mcp": {
    "servers": {
      "morph-mcp": {
        "command": "npx",
        "args": ["-y", "@morphllm/morphmcp"],
        "env": {
          "MORPH_API_KEY": "sk-xxx"
        }
      }
    }
  }
}
```

## How the Tools Work

### edit_file

Applies code edits using Morph's Fast Apply model. The agent sends partial code with `// ... existing code ...` placeholders, and Fast Apply merges it into the full file.

```
Input:
  path: "src/api.ts"
  code_edit: |
    export async function fetchData(endpoint: string) {
      // ... existing code ...
      const response = await fetch(endpoint, { 
        headers,
        timeout: 5000  // added timeout
      });
      // ... existing code ...
    }
  instruction: "Add 5 second timeout to fetch call"

Output: Git-style unified diff showing exactly what changed
```

### codebase_search

`codebase_search` is the MCP-facing wrapper around WarpGrep. Ask a natural-language question about what you want to understand and it will use WarpGrep under the hood to locate relevant files and line ranges. It does not accept regex or symbol-only queries.

Good: `Where does auth get handled, what are the different oauth methods supported?`
Bad: `auth()`

```
Input:
  search_string: "Where does auth get handled, what are the different oauth methods supported?"
  repo_path: "/Users/me/project"
  search_type: "default"  # optional: "default" or "node_modules"

Output: List of files with specific line ranges + actual code content
```

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `MORPH_API_KEY` | Your API key from [morphllm.com](https://morphllm.com) | Required |
| `MORPH_API_URL` | Override Morph API base URL for custom proxies | `https://api.morphllm.com` |
| `MORPH_WARP_GREP_TIMEOUT` | Timeout for warp grep model calls in ms | `30000` |
| `ENABLED_TOOLS` | Comma-separated allow-list of tools to expose, or `all` | all tools |
| `DISABLED_TOOLS` | Comma-separated deny-list of tools to hide | none |

Search only, no `edit_file`:

```json
"env": { "MORPH_API_KEY": "sk-...", "ENABLED_TOOLS": "codebase_search,github_codebase_search" }
```

`DISABLED_TOOLS=edit_file` is equivalent. When both are set a tool is on only if allowed and not denied. The pre-0.8.124 names `warpgrep_codebase_search` and `warpgrep_github_search` still work.

## Get an API Key

1. Sign up at [morphllm.com](https://morphllm.com)
2. Go to dashboard → API Keys
3. Keys start with `sk-` or `morph-`

## Troubleshooting

**`npm error code ETARGET ... No matching version found for ...`**

This happens when `npx` resolves against a stale local registry cache — most often with `npx --prefer-offline`, which intentionally avoids refreshing metadata. The examples above no longer use `--prefer-offline` for this reason. If you still hit it:

```bash
npm cache clean --force      # then retry: npx -y @morphllm/morphmcp
# or run it with bun, which fetches fresh metadata:
bunx @morphllm/morphmcp
```

## Links

- [Documentation](https://docs.morphllm.com)
- [MCP Quickstart](https://docs.morphllm.com/mcpquickstart)
- [OpenCode plugin](https://github.com/morphllm/opencode-morph-plugin)

## License

MIT

<!-- Published with npm Trusted Publishing -->
