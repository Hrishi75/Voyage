import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import { Destination, Package } from '../types';

export function useFeatured() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [destRes, pkgRes] = await Promise.all([
        api.get('/destinations/featured'),
        api.get('/packages/featured'),
      ]);
      setDestinations(destRes.data.data);
      setPackages(pkgRes.data.data);
    } catch (error) {
      console.warn('Failed to fetch featured data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { destinations, packages, loading, refetch: fetch };
}
