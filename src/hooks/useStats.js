import { useState, useEffect } from 'react';

const STORAGE_KEY = 'portfolio_stats';

const defaultStats = [
  { id: '1', icon: '💼', value: '5+', label: 'Tahun Pengalaman' },
  { id: '2', icon: '🎯', value: '50+', label: 'Proyek Selesai' },
  { id: '3', icon: '🏆', value: '10+', label: 'Sertifikasi' },
  { id: '4', icon: '⭐', value: '100%', label: 'Kepuasan Klien' },
];

export function useStats() {
  const [stats, setStats] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultStats;
      }
    }
    return defaultStats;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const addStat = (stat) => {
    const newStat = {
      ...stat,
      id: Date.now().toString(),
    };
    setStats((prev) => [...prev, newStat]);
    return newStat;
  };

  const updateStat = (id, updatedStat) => {
    setStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedStat } : s))
    );
  };

  const deleteStat = (id) => {
    setStats((prev) => prev.filter((s) => s.id !== id));
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
    addStat,
    updateStat,
    deleteStat,
    reorderStats,
  };
}
