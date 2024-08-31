import { ITEMS_PER_PAGE } from '@/config';
import { MergedDfRecord } from '@/types/process-data';

export function createPaginator(items: MergedDfRecord[], pageSize = ITEMS_PER_PAGE) {
  return {
    getPage: (page: number) => {
      const start = page * pageSize;
      const end = start + pageSize;
      return items.slice(start, end);
    },
    pageCount: Math.ceil(items.length / pageSize),
  };
}
