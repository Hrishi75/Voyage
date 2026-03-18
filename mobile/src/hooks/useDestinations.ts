import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import { Destination } from '../types';

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/destinations');
      setDestinations(data.data);
    } catch (error) {
      console.warn('Failed to fetch destinations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { destinations, loading, refetch: fetch };
}

export function useDestinationBySlug(slug: string) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/destinations/${slug}`)
      .then((res) => setDestination(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return { destination, loading };
}
