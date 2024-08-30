'use client';

import { useParams } from 'next/navigation';

export default function OptionPage() {
  const params = useParams();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{JSON.stringify(params)}</h2>
    </div>
  );
}
