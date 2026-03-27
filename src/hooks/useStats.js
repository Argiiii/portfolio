import { useState, useEffect, useCallback } from 'react';
import { statsAPI } from '../api';

const defaultStats = [
  { id: '1', icon: '💼', value: '5+', label: 'Tahun Pengalaman', label_en: 'Years of Experience' },
  { id: '2', icon: '🎯', value: '50+', label: 'Proyek Selesai', label_en: 'Projects Completed' },
  { id: '3', icon: '🏆', value: '10+', label: 'Sertifikasi', label_en: 'Certifications' },
  { id: '4', icon: '⭐', value: '100%', label: 'Kepuasan Klien', label_en: 'Client Satisfaction' },
];

export function useStats() {
  const [stats, setStats] = useState(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await statsAPI.getAll();
      if (data && data.length > 0) {
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const addStat = async (stat) => {
    try {
      const newStat = await statsAPI.create(stat);
      setStats((prev) => [newStat, ...prev]);
      return newStat;
    } catch (err) {
      console.error('Failed to add stat:', err);
      throw err;
    }
  };

  const updateStat = async (id, updatedStat) => {
    try {
      const updated = await statsAPI.update(id, updatedStat);
      setStats((prev) =>
        prev.map((s) => (s.id === id ? updated : s))
      );
      return updated;
    } catch (err) {
      console.error('Failed to update stat:', err);
      throw err;
    }
  };

  const deleteStat = async (id) => {
    try {
      await statsAPI.delete(id);
      setStats((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete stat:', err);
      throw err;
    }
  };

  const reorderStats = (fromIndex, toIndex) => {
    setStats((prev) => {
      const newStats = [...prev];
      const [removed] = newStats.splice(fromIndex, 1);
      newStats.splice(toIndex, 0, removed);
      return newStats;
    });
  };

  return {
    stats,
    isLoading,
    error,
    addStat,
    updateStat,
    deleteStat,
    reorderStats,
    refresh: loadStats,
  };
}