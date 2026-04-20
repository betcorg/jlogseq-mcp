import z from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { PagesService } from '../services/editor/pages.service.js';
import {
  // CreateJournalPageSchema,
  CreatePageSchema,
  DeletePageSchema,
  GetAllPagesSchema,
  GetCurrentPageBlocksTreeSchema,
  GetCurrentPageSchema,
  GetPageBlocksTreeSchema,
  // GetPageLinkedReferencesSchema,
  // GetPagePropertiesSchema,
  GetPageSchema,
  GetPagesFromNamespaceSchema,
  GetPagesTreeFromNamespaceSchema,
  RenamePageSchema,
} from '../schema/pages.schema.js';
import { Utils } from '../shared/utils.js';

export function registerPageTools(
  server: McpServer,
  pagesService: PagesService
) {
  /**
   * Not supported in Logseq HTTP API
   */
  // server.registerTool(
  //   'create_journal_page',
  //   {
  //     title: 'Create Journal Page',
  //     description: 'Create a new journal page in Logseq',
  //     inputSchema: CreateJournalPageSchema,
  //   },
  //   async (params: z.infer<typeof CreateJournalPageSchema>) => {
  //     const { date } = params;
  //     return Utils.formatToolResponse(
  //       await pagesService.createJournalPage(date)
  //     );
  //   }
  // );

  server.registerTool(
    'create_page',
    {
      title: 'Create Page',
      description: 'Create a new page in Logseq',
      inputSchema: CreatePageSchema,
    },
    async (params: z.infer<typeof CreatePageSchema>) => {
      const { pageName, properties, opts } = params;
      return Utils.formatToolResponse(
        await pagesService.createPage(pageName, properties || {}, opts || {})
      );
    }
  );

  server.registerTool(
    'delete_page',
    {
      title: 'Delete Page',
      description: 'Delete a page from Logseq by name',
      inputSchema: DeletePageSchema,
    },
    async (params: z.infer<typeof DeletePageSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.deletePage(params.pageName)
      );
    }
  );

  server.registerTool(
    'get_current_page',
    {
      title: 'Get Current Page',
      description: 'Get the currently open page in Logseq',
      inputSchema: GetCurrentPageSchema,
    },
    async (_params: z.infer<typeof GetCurrentPageSchema>) => {
      return Utils.formatToolResponse(await pagesService.getCurrentPage());
    }
  );

  server.registerTool(
    'get_current_page_blocks_tree',
    {
      title: 'Get Current Page Blocks Tree',
      description: 'Get the blocks tree of the currently open page in Logseq',
      inputSchema: GetCurrentPageBlocksTreeSchema,
    },
    async (_params: z.infer<typeof GetCurrentPageBlocksTreeSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.getCurrentPageBlocksTree()
      );
    }
  );

  server.registerTool(
    'get_page',
    {
      title: 'Get Page',
      description: 'Get a Logseq page by name or entity ID',
      inputSchema: GetPageSchema,
    },
    async (params: z.infer<typeof GetPageSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.getPage(params.srcPage, params.opts || {})
      );
    }
  );

  server.registerTool(
    'get_all_pages',
    {
      title: 'Get All Pages',
      description: 'Get all pages in a Logseq repository',
      inputSchema: GetAllPagesSchema,
    },
    async (params: z.infer<typeof GetAllPagesSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.getAllPages(params.repo)
      );
    }
  );

  server.registerTool(
    'get_page_blocks_tree',
    {
      title: 'Get Page Blocks Tree',
      description: 'Get the blocks tree of a Logseq page by name or UUID',
      inputSchema: GetPageBlocksTreeSchema,
    },
    async (params: z.infer<typeof GetPageBlocksTreeSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.getPageBlocksTree(params.srcPage)
      );
    }
  );

  /**
   * Not supported in Logseq HTTP API
   */
  // server.registerTool(
  //   'get_page_linked_references',
  //   {
  //     title: 'Get Page Linked References',
  //     description:
  //       'Get all pages and blocks that reference a given Logseq page',
  //     inputSchema: GetPageLinkedReferencesSchema,
  //   },
  //   async (params: z.infer<typeof GetPageLinkedReferencesSchema>) => {
  //     return Utils.formatToolResponse(
  //       await pagesService.getPageLinkedReferences(params.srcPage)
  //     );
  //   }
  // );

  /**
   * Not supported in Logseq HTTP API
   */
  // server.registerTool(
  //   'get_page_properties',
  //   {
  //     title: 'Get Page Properties',
  //     description: 'Get the properties of a Logseq page',
  //     inputSchema: GetPagePropertiesSchema,
  //   },
  //   async (params: z.infer<typeof GetPagePropertiesSchema>) => {
  //     return Utils.formatToolResponse(
  //       await pagesService.getPageProperties(params.page)
  //     );
  //   }
  // );

  server.registerTool(
    'get_pages_from_namespace',
    {
      title: 'Get Pages From Namespace',
      description: 'Get all pages under a given Logseq namespace',
      inputSchema: GetPagesFromNamespaceSchema,
    },
    async (params: z.infer<typeof GetPagesFromNamespaceSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.getPagesFromNamespace(params.namespace)
      );
    }
  );

  server.registerTool(
    'get_pages_tree_from_namespace',
    {
      title: 'Get Pages Tree From Namespace',
      description: 'Get the pages tree under a given Logseq namespace',
      inputSchema: GetPagesTreeFromNamespaceSchema,
    },
    async (params: z.infer<typeof GetPagesTreeFromNamespaceSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.getPagesTreeFromNamespace(params.namespace)
      );
    }
  );

  server.registerTool(
    'rename_page',
    {
      title: 'Rename Page',
      description: 'Rename a Logseq page',
      inputSchema: RenamePageSchema,
    },
    async (params: z.infer<typeof RenamePageSchema>) => {
      return Utils.formatToolResponse(
        await pagesService.renamePage(params.oldName, params.newName)
      );
    }
  );
}
