import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { loadEnvironment } from './config/environment.js';
import { ApiClient } from './api/client.js';
import { PagesService } from './services/editor/pages.service.js';
import { registerPageTools } from './tools/pages.tool.js';

async function main() {
  const env = loadEnvironment();
  const apiClient = new ApiClient(env.LOGSEQ_BASE_URL, env.LOGSEQ_API_TOKEN);
  const pagesService = new PagesService(apiClient);

  const server = new McpServer({
    name: 'jlogseq-mcp',
    version: '0.0.1',
  });

  registerPageTools(server, pagesService);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

await main().catch((err) => {
  console.error(err);
});
