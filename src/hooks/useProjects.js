import { useState } from 'react';

const defaultProjects = [
  {
    id: '1',
    title: 'Ada.com',
    description: 'Aplikasi hotel dan traveling komprehensif dengan fitur pemesanan kamar, reservasi pesawat, rencana perjalanan, dan pembayaran aman.',
    tags: ['React.js', 'Node.js', 'Vercel'],
    category: 'web',
    image: '✈️',
    github: 'https://github.com/Argiiii/ada.com',
    live: 'https://adaacom.vercel.app/',
  },
  {
    id: '2',
    title: 'Smart Saving App',
    description: 'Smart Saving App merupakan aplikasi manajemen keuangan pribadi berbasis digital yang dirancang untuk membantu pengguna mengelola, merencanakan, dan meningkatkan kebiasan secara cerdas dengan dukungan teknologi kecerdasan buatan AI.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    category: 'web',
    image: '📋',
    github: 'https://github.com/Argiiii/smart.app',
    live: 'https://smart-saving-app.vercel.app/',
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
    title: 'E-commerce ShopFlex',
    description: 'Platform e-commerce modern yang dirancang untuk memberikan pengalaman belanja online yang fleksibel, cerdas, dan personal bagi pengguna.',
    tags: ['Python', 'OpenAI API', 'FastAPI', 'React'],
    category: 'ai',
    image: '🤖',
    github: 'https://github.com/Argiiii/ecommerce',
    live: 'https://e-commerce-shopflex.vercel.app',
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
  const [projects, setProjects] = useState(defaultProjects);
  const [isLoading] = useState(false);
  const [error] = useState(null);

  const addProject = async (project) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = async (id, updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
    );
    return { id, ...updatedProject };
  };

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const getProject = (id) => {
    return projects.find((p) => p.id === id);
  };

  return {
    projects,
    isLoading,
    error,
    addProject,
    updateProject,
    deleteProject,
    getProject,
  };
}