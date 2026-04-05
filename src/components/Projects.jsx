import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Plus, 
  Edit2, 
  Trash2, 
  Code2, 
  Smartphone, 
  Brain,
  Github,
  FolderOpen,
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useLanguage } from '../i18n/LanguageContext';
import Modal from './common/Modal';
import ProjectForm from './common/ProjectForm';

export default function Projects() {
  const { t, language } = useLanguage();
  const { projects, addProject, updateProject, deleteProject, isLoading } = useProjects();
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: t('projects.all'), icon: FolderOpen },
    { id: 'web', name: t('projects.web'), icon: Code2 },
    { id: 'mobile', name: t('projects.mobile'), icon: Smartphone },
    { id: 'ai', name: t('projects.ai'), icon: Brain },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (project) => {
    setDeleteConfirm(project);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteProject(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  return (
    <section id="projects" className="py-12 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="gradient-text">{language === 'id' ? 'Proyek Saya' : 'My Projects'}</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Collection of projects I have worked on with various technologies and different complexities.'
              : 'Kumpulan proyek yang telah saya kerjakan dengan berbagai teknologi dan kompleksitas yang berbeda.'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeFilter === category.id
                  ? 'gradient-bg text-white'
                  : 'glass text-slate-300 hover:bg-slate-700'
              }`}
            >
              <category.icon size={18} />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 gradient-bg px-6 py-3 rounded-full text-white font-medium flex items-center gap-2 mx-auto"
        >
          <Plus size={20} />
          {t('projects.addProject')}
        </motion.button>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FolderOpen size={64} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">{t('projects.noProject')}</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass rounded-2xl overflow-hidden group relative"
                >
                  <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      onClick={() => handleEdit(project)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-600 rounded-full text-white shadow-lg"
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(project)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-red-600 rounded-full text-white shadow-lg"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>

                  <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl relative overflow-hidden">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10"
                    >
                      {project.image}
                    </motion.span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full capitalize">
                        {project.category === 'ai' ? 'AI/ML' : project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 leading-relaxed text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs text-slate-500 mr-1">{language === 'id' ? 'Teknologi:' : 'Tech:'}</span>
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-slate-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3 pt-3 border-t border-slate-700/50">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-xs"
                        >
                          <Github size={14} />
                          <span className="truncate">{project.github.replace('https://github.com/', '')}</span>
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 gradient-bg rounded-lg text-white text-xs font-medium"
                        >
                          <ExternalLink size={14} />
                          <span className="truncate">{project.live.replace('https://', '').replace('http://', '')}</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        title={editingProject 
          ? (language === 'en' ? 'Edit Project' : 'Edit Proyek')
          : (language === 'en' ? 'Add New Project' : 'Tambah Proyek Baru')
        }
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingProject(null);
          }}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title={language === 'en' ? 'Delete Project' : 'Hapus Proyek'}
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
            <Trash2 size={32} className="text-red-500" />
          </div>
          <p className="text-slate-300 mb-2">
            {language === 'en' 
              ? `Are you sure you want to delete project "${deleteConfirm?.title}"?`
              : `Apakah Anda yakin ingin menghapus proyek "${deleteConfirm?.title}"?`
            }
          </p>
          <p className="text-slate-500 text-sm mb-6">
            {language === 'en' ? 'This action cannot be undone.' : 'Tindakan ini tidak dapat dibatalkan.'}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 px-6 py-3 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {language === 'en' ? 'Cancel' : 'Batal'}
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 px-6 py-3 bg-red-600 rounded-xl text-white font-medium hover:bg-red-700 transition-colors"
            >
              {language === 'en' ? 'Delete' : 'Hapus'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
