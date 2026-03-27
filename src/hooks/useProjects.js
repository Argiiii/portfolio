import { useState, useEffect } from 'react';

const STORAGE_KEY = 'portfolio_projects';

const defaultProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'web',
    image: '🛒',
    github: 'https://github.com',
    live: 'https://demo.com',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Aplikasi manajemen tugas dengan fitur drag-and-drop, kolaborasi tim, dan notifikasi real-time.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    category: 'web',
    image: '📋',
    github: 'https://github.com',
    live: 'https://demo.com',
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Website portofolio responsif dengan animasi modern dan design yang elegan.',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'web',
    image: '🎨',
    github: 'https://github.com',
    live: 'https://demo.com',
  },
  {
    id: '4',
    title: 'Mobile Banking App',
    description: 'Aplikasi banking mobile dengan fitur transfer, tagihan, dan investasi.',
    tags: ['React Native', 'Firebase', 'Redux'],
    category: 'mobile',
    image: '🏦',
    github: 'https://github.com',
    live: 'https://demo.com',
  },
  {
    id: '5',
    title: 'AI Chat Application',
    description: 'Aplikasi chat dengan integrasi AI untuk assistance dan automated responses.',
    tags: ['Python', 'OpenAI API', 'FastAPI', 'React'],
    category: 'ai',
    image: '🤖',
    github: 'https://github.com',
    live: 'https://demo.com',
  },
  {
    id: '6',
    title: 'Fitness Tracker',
    description: 'Aplikasi pelacak kebugaran dengan fitur workout plans dan progress tracking.',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    category: 'mobile',
    image: '💪',
    github: 'https://github.com',
    live: 'https://demo.com',
  },
];

export function useProjects() {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultProjects;
      }
    }
    return defaultProjects;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id, updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const getProject = (id) => {
    return projects.find((p) => p.id === id);
  };

  return {
    projects,
    isLoading,
    addProject,
    updateProject,
    deleteProject,
    getProject,
  };
}
