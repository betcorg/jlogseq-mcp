import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import z from "zod";


const server = new McpServer({
  name: 'jlogseq-mcp',
  version: '0.0.1'
});