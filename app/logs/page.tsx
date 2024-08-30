'use client';

import { useFetchLogs } from '@/components/hooks/useFetchLogs';
import { Logtable } from '@/components/Logtable';
import { Button } from '@/components/ui/button';
import { LogResponse } from '@/types/api-response-body';
import { useCallback, useEffect, useState } from 'react';

const Page = () => {
  const { data, loading, error, fetchLogs } = useFetchLogs();
  const pageHandler = useCallback(
    (type: 'next' | 'prev') => {
      if (!data) return;
      const newPage = type === 'next' ? data.current_page + 1 : data.current_page - 1;
      if (newPage > 0 && newPage <= data.total_page) {
        fetchLogs(newPage);
      }
    },
    [data, fetchLogs]
  );
  if (!data || loading) return 'Loading....';
  return (
    <main className="min-h-screen container mx-auto pt-8">
      <Logtable apiResults={data.results}>
        <div className="flex gap-6 mx-auto items-center justify-center mt-6">
          <Button
            disabled={data.current_page === 1}
            variant={'outline'}
            onClick={() => pageHandler('prev')}
          >
            Prev
          </Button>
          <Button
            disabled={data.current_page === data.total_page}
            variant={'outline'}
            onClick={() => pageHandler('next')}
          >
            Next
          </Button>
        </div>
      </Logtable>
    </main>
  );
};

export default Page;
