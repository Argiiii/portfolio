import { useState } from 'react';
import { motion } from 'framer-motion';

const emojiOptions = ['💼', '🎯', '🏆', '⭐', '🚀', '👥', '📈', '💻', '🌟', '🎨', '⚡', '🔧'];

export default function StatForm({ stat, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(() => {
    if (stat) {
      return {
        icon: stat.icon || '💼',
        value: stat.value || '',
        label: stat.label || '',
      };
    }
    return {
      icon: '💼',
      value: '',
      label: '',
    };
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.value.trim()) newErrors.value = 'Nilai wajib diisi';
    if (!formData.label.trim()) newErrors.label = 'Label wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
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
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Icon
        </label>
        <div className="flex flex-wrap gap-2 p-3 bg-slate-800 border border-slate-700 rounded-xl">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, icon: emoji }))}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                formData.icon === emoji
                  ? 'bg-blue-600 ring-2 ring-blue-400'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nilai *
          </label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="5+"
            className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors ${
              errors.value ? 'border-red-500' : 'border-slate-700'
            }`}
          />
          {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Label *
          </label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Tahun Pengalaman"
            className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors ${
              errors.label ? 'border-red-500' : 'border-slate-700'
            }`}
          />
          {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
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
          {isSubmitting ? 'Menyimpan...' : stat ? 'Perbarui' : 'Tambah'}
        </motion.button>
      </div>
    </form>
  );
}
