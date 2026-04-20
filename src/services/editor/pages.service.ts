import {
  BlockEntity,
  BlockPageName,
  EntityID,
  PageEntity,
  PageIdentity,
} from '@logseq/libs/dist/LSPlugin.user.js';
import { ApiClient } from '../../api/client.js';
import { MODULES } from '../../constants/modules.enum.js';

export class PagesService {
  private readonly modulePrefix: string = MODULES.EDITOR;

  constructor(private readonly apiClient: ApiClient) {}

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L765
   */
  async createJournalPage(date: string | Date) {
    return this.apiClient.callLogseqAPI<PageEntity | null>(
      `${this.modulePrefix}.createJournalPage`,
      [date]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L753
   */
  async createPage(
    pageName: string,
    properties: Record<string, any>,
    opts: Partial<{
      redirect: boolean;
      createFirstBlock: boolean;
      customUUID: string;
      format: BlockEntity['format'];
      journal: boolean;
    }>
  ) {
    return this.apiClient.callLogseqAPI<PageEntity | null>(
      `${this.modulePrefix}.createPage`,
      [pageName, properties, opts]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L769
   */
  async deletePage(pageName: string) {
    return this.apiClient.callLogseqAPI<void>(
      `${this.modulePrefix}.deletePage`,
      [pageName]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L641
   */
  async getCurrentPage() {
    return this.apiClient.callLogseqAPI<PageEntity | BlockEntity | null>(
      `${this.modulePrefix}.getCurrentPage`
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L658
   */
  async getCurrentPageBlocksTree() {
    return this.apiClient.callLogseqAPI<BlockEntity[]>(
      `${this.modulePrefix}.getCurrentPageBlocksTree`
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L748
   */
  async getPage(
    srcPage: PageIdentity | EntityID,
    opts: Partial<{ includeChildren: boolean }>
  ) {
    return await this.apiClient.callLogseqAPI<PageEntity | null>(
      `${this.modulePrefix}.getPage`,
      [srcPage, opts]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L773
   */
  async getAllPages(repo: string) {
    return await this.apiClient.callLogseqAPI<PageEntity[] | null>(
      `${this.modulePrefix}.getAllPages`,
      [repo]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L665
   */
  async getPageBlocksTree(srcPage: PageIdentity) {
    return await this.apiClient.callLogseqAPI<BlockEntity[] | null>(
      `${this.modulePrefix}.getPageBlocksTree`,
      [srcPage]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L665
   */
  async getPageLinkedReferences(srcPage: PageIdentity) {
    return await this.apiClient.callLogseqAPI<
      [page: PageEntity, blocks: BlockEntity[]][] | null
    >(`${this.modulePrefix}.getPageLinkedReferences`, [srcPage]);
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L853
   */
  async getPageProperties(page: PageIdentity | EntityID) {
    return await this.apiClient.callLogseqAPI<Record<string, any> | null>(
      `${this.modulePrefix}.getPageProperties`,
      [page]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L679
   */
  async getPagesFromNamespace(namespace: BlockPageName) {
    return await this.apiClient.callLogseqAPI<PageEntity[]>(
      `${this.modulePrefix}.getPagesFromNamespace`,
      [namespace]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L687
   */
  async getPagesTreeFromNamespace(namespace: BlockPageName) {
    return await this.apiClient.callLogseqAPI<PageEntity[]>(
      `${this.modulePrefix}.getPagesTreeFromNamespace`,
      [namespace]
    );
  }

  /**
   * https://github.com/logseq/logseq/blob/d1bbb5ad16384e93fb76d1b6f0f3c98010d9c68c/libs/src/LSPlugin.ts#L771
   */
  async renamePage(oldName: string, newName: string) {
    return await this.apiClient.callLogseqAPI<void>(
      `${this.modulePrefix}.renamePage`,
      [oldName, newName]
    );
  }
}
