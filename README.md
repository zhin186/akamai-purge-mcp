# akamai-purge-mcp
# Install
```shell
npm install
```

# Build
```shell
npm run build
```

# Dev Run Test
```shell
npm run dev
```

# Claude Desktop MCP Config
```json
{
  "mcpServers": {
    "akamai": {
      "command": "node",
      "args": [
        "D:/akamai-mcp-server/dist/index.js"
      ]
    }
  }
}
```
# AI Call Example

```txt
Purge Akamai cache for these URLs:
- https://example.com/a.js
- https://example.com/b.css
```
