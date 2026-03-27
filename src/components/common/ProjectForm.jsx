import { useState } from 'react';
import { motion } from 'framer-motion';

const categoryOptions = [
  { id: 'web', name: 'Web App' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'ai', name: 'AI/ML' },
];

const emojiOptions = ['🛒', '📋', '🎨', '🏦', '🤖', '💪', '🚀', '📱', '💻', '🌐', '🔧', '📊'];

export default function ProjectForm({ project, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(() => {
    if (project) {
      return {
        title: project.title || '',
        description: project.description || '',
        category: project.category || 'web',
        image: project.image || '🚀',
        tags: project.tags?.join(', ') || '',
        github: project.github || '',
        live: project.live || '',
      };
    }
    return {
      title: '',
      description: '',
      category: 'web',
      image: '🚀',
      tags: '',
      github: '',
      live: '',
    };
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Judul wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (!formData.tags.trim()) newErrors.tags = 'Technologies wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const tags = formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
      onSubmit({
        ...formData,
        tags,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Judul Proyek *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nama proyek"
            className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors ${
              errors.title ? 'border-red-500' : 'border-slate-700'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Kategori
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            {categoryOptions.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Deskripsi *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Deskripsi proyek..."
          className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none ${
            errors.description ? 'border-red-500' : 'border-slate-700'
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Icon/Emoji
        </label>
        <div className="flex flex-wrap gap-2 p-3 bg-slate-800 border border-slate-700 rounded-xl">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, image: emoji }))}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                formData.image === emoji
                  ? 'bg-blue-600 ring-2 ring-blue-400'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Technologies *
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="React.js, Node.js, MongoDB (pisahkan dengan koma)"
          className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors ${
            errors.tags ? 'border-red-500' : 'border-slate-700'
          }`}
        />
        {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Link GitHub
          </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Link Live Demo
          </label>
          <input
            type="url"
            name="live"
            value={formData.live}
            onChange={handleChange}
            placeholder="https://demo.com"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
        >
          Batal
        </button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 gradient-bg px-6 py-3 rounded-xl text-white font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Menyimpan...' : project ? 'Perbarui Proyek' : 'Tambah Proyek'}
        </motion.button>
      </div>
    </form>
  );
}
