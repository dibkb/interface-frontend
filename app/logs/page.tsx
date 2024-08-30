'use client';

import { useFetchLogs } from '@/components/hooks/useFetchLogs';
import { Logtable } from '@/components/Logtable';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!data) return null;

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
