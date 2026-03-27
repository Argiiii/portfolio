const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}

export const statsAPI = {
  getAll: () => fetchAPI('/api/stats'),
  create: (stat) => fetchAPI('/api/stats', {
    method: 'POST',
    body: JSON.stringify(stat),
  }),
  update: (id, stat) => fetchAPI(`/api/stats/${id}`, {
    method: 'PUT',
    body: JSON.stringify(stat),
  }),
  delete: (id) => fetchAPI(`/api/stats/${id}`, {
    method: 'DELETE',
  }),
};

export const projectsAPI = {
  getAll: () => fetchAPI('/api/projects'),
  create: (project) => fetchAPI('/api/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  }),
  update: (id, project) => fetchAPI(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  }),
  delete: (id) => fetchAPI(`/api/projects/${id}`, {
    method: 'DELETE',
  }),
};