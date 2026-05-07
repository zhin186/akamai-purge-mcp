import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { invalidateUrls } from "./tools/fast-purge.js";
import { logger } from "./utils/logger.js";
const server = new Server({
    name: "akamai-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "invalidate_akamai_url",
            description: "Invalidate Akamai CDN cache URLs",
            inputSchema: {
                type: "object",
                properties: {
                    urls: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                        description: "List of URLs to invalidate",
                    },
                },
                required: ["urls"],
            },
        },
    ],
}));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name !== "invalidate_akamai_url") {
        throw new Error("Unknown tool");
    }
    logger.info("Purge request received", {
        args,
    });
    const result = await invalidateUrls(args);
    logger.info("Purge success", {
        result,
    });
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
});
const transport = new StdioServerTransport();
await server.connect(transport);
logger.info("Akamai MCP Server started");
