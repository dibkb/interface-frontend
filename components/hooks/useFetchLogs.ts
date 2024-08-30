import { LogResponse } from '@/types/api-response-body';
import { useCallback, useEffect, useState } from 'react';

const API_URL = 'http://localhost:8000/logs';

export const useFetchLogs = (initialPage = 1) => {
  const [data, setData] = useState<LogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch logs');
      const json: LogResponse = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs(initialPage);
  }, [fetchLogs, initialPage]);

  return { data, loading, error, fetchLogs };
};
