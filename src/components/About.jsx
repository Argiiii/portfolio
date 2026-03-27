import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useStats } from '../hooks/useStats';
import { useLanguage } from '../i18n/LanguageContext';
import Modal from './common/Modal';
import StatForm from './common/StatForm';

const technologies = [
  'React.js',
  'Node.js',
  'TypeScript',
  'JavaScript',
  'Python',
  'Tailwind CSS',
  'MongoDB',
  'PostgreSQL',
  'Git',
  'Docker',
];

export default function About() {
  const { t, language } = useLanguage();
  const { stats, addStat, updateStat, deleteStat } = useStats();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setEditingStat(null);
    setIsModalOpen(true);
  };

  const handleEdit = (stat) => {
    setEditingStat(stat);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (editingStat) {
      updateStat(editingStat.id, formData);
    } else {
      addStat(formData);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    setEditingStat(null);
  };

  const handleDelete = (stat) => {
    setDeleteConfirm(stat);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteStat(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const yearsExperience =
    stats.find(
      (s) => s.label === 'Tahun Pengalaman' || s.label === 'Years of Experience'
    )?.value || '2+';

  const story1Params = {
    id: `Saya memulai perjalanan di dunia pemrograman sejak duduk di bangku kuliah, where I discovered my passion for building web applications. Selama ${yearsExperience} tahun terakhir, saya telah bekerja dengan berbagai klien dari startup hingga perusahaan besar.`,
    en: `I started my journey in programming during college, where I discovered my passion for building web applications. Over the past ${yearsExperience} years, I have worked with various clients from startups to large companies.`,
  };

  return (
    <section id='about' className='py-32 bg-slate-900/50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            <span className='gradient-text'>
              {language === 'id' ? 'Tentang Saya' : 'About Me'}
            </span>
          </h2>
          <p className='text-slate-400 text-lg max-w-2xl mx-auto'>
            {language === 'id'
              ? 'Saya adalah developer yang passionate dalam menciptakan solusi digital yang inovatif dan berdampak positif.'
              : 'I am a passionate developer creating innovative and impactful digital solutions.'}
          </p>
        </motion.div>

        <div className='flex justify-end mb-6'>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='gradient-bg px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2'
          >
            <Plus size={16} />
            {t('about.addStat')}
          </motion.button>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          <AnimatePresence mode='popLayout'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className='glass p-6 rounded-2xl text-center group relative'
              >
                <div className='absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button
                    onClick={() => handleEdit(stat)}
                    className='p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors'
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(stat)}
                    className='p-1.5 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors'
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <motion.div
                  className='w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center text-2xl'
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.p
                  className='text-4xl font-bold gradient-text mb-2'
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className='text-slate-400'>{stat.label}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='glass rounded-2xl p-8 lg:p-12'
        >
          <h3 className='text-2xl font-semibold mb-6'>{t('about.story')}</h3>
          <div className='grid lg:grid-cols-2 gap-8'>
            <div className='space-y-4 text-slate-300 leading-loose'>
              <p>{language === 'id' ? story1Params.id : story1Params.en}</p>
              <p>{t('about.story2')}</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>
                {t('about.technologies')}
              </h4>
              <div className='flex flex-wrap gap-3'>
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className='px-4 py-2 bg-slate-800 rounded-full text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition-colors cursor-default'
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStat(null);
        }}
        title={
          editingStat
            ? language === 'id'
              ? 'Edit Statistic'
              : 'Edit Statistic'
            : language === 'id'
              ? 'Tambah Statistic Baru'
              : 'Add New Statistic'
        }
        size='sm'
      >
        <StatForm
          stat={editingStat}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingStat(null);
          }}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title={language === 'id' ? 'Hapus Statistic' : 'Delete Statistic'}
        size='sm'
      >
        <div className='text-center'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center'>
            <Trash2 size={32} className='text-red-500' />
          </div>
          <p className='text-slate-300 mb-2'>
            {language === 'id'
              ? `Apakah Anda yakin ingin menghapus statistic "${deleteConfirm?.label}"?`
              : `Are you sure you want to delete statistic "${deleteConfirm?.label}"?`}
          </p>
          <p className='text-slate-500 text-sm mb-6'>
            {language === 'id'
              ? 'Tindakan ini tidak dapat dibatalkan.'
              : 'This action cannot be undone.'}
          </p>
          <div className='flex gap-4'>
            <button
              onClick={() => setDeleteConfirm(null)}
              className='flex-1 px-6 py-3 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors'
            >
              {language === 'id' ? 'Batal' : 'Cancel'}
            </button>
            <button
              onClick={confirmDelete}
              className='flex-1 px-6 py-3 bg-red-600 rounded-xl text-white font-medium hover:bg-red-700 transition-colors'
            >
              {language === 'id' ? 'Hapus' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
