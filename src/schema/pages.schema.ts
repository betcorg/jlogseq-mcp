import z from 'zod';

export const CreateJournalPageSchema = z.object({
  date: z.string(),
});

export const CreatePageSchema = z.object({
  pageName: z.string().describe('Name of the page to create'),
  properties: z.record(z.any()).optional().describe('Page properties'),
  opts: z
    .object({
      redirect: z.boolean().optional(),
      createFirstBlock: z.boolean().optional(),
      customUUID: z.string().optional(),
      format: z.enum(['markdown', 'org']).optional(),
      journal: z.boolean().optional(),
    })
    .optional()
    .describe('Creation options'),
});

export const DeletePageSchema = z.object({
  pageName: z.string().describe('Name of the page to delete'),
});

export const GetCurrentPageSchema = z.object({});

export const GetCurrentPageBlocksTreeSchema = z.object({});

export const GetPageSchema = z.object({
  srcPage: z.string().describe('Page name (string) or entity ID (number)'),
  opts: z
    .object({
      includeChildren: z.boolean().optional(),
    })
    .optional()
    .describe('Query options'),
});

export const GetAllPagesSchema = z.object({
  repo: z.string().describe('Repository name'),
});

export const GetPageBlocksTreeSchema = z.object({
  srcPage: z.string().describe('Page name or UUID'),
});

export const GetPageLinkedReferencesSchema = z.object({
  srcPage: z.string().describe('Page name or UUID'),
});

export const GetPagePropertiesSchema = z.object({
  page: z
    .union([z.string(), z.number()])
    .describe('Page name, UUID (string), or entity ID (number)'),
});

export const GetPagesFromNamespaceSchema = z.object({
  namespace: z.string().describe('Namespace prefix'),
});

export const GetPagesTreeFromNamespaceSchema = z.object({
  namespace: z.string().describe('Namespace prefix'),
});

export const RenamePageSchema = z.object({
  oldName: z.string().describe('Current page name'),
  newName: z.string().describe('New page name'),
});
