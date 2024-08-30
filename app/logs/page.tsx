'use client';

import { useCallback, useEffect, useState } from 'react';

const Page = () => {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState();
  useEffect(() => {
    fetchLogs().then((res) => setResults(res));
  }, []);
  const nextPageHandler = useCallback(async () => {
    const results = await fetchLogs(page - 1);
    setResults(results);
    setPage((prev) => prev - 1);
  }, [page]);
  return <main className="min-h-screen container mx-auto ">{JSON.stringify(results)}</main>;
};

async function fetchLogs(page = 1) {
  try {
    const results = await fetch(`http://localhost:8000/logs?page=${page}`);
    const json = results.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
export default Page;
