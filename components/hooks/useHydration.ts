import { useEffect, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return { hydrated };
};
