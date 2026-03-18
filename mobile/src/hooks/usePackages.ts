import { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import { Package } from '../types';

export function usePackages(destinationSlug?: string) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const params = destinationSlug ? { destination: destinationSlug } : {};
      const { data } = await api.get('/packages', { params });
      setPackages(data.data);
    } catch (error) {
      console.warn('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  }, [destinationSlug]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { packages, loading, refetch: fetch };
}

export function usePackageById(id: string) {
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/packages/${id}`)
      .then((res) => setPkg(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return { pkg, loading };
}
