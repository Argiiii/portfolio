import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const skillCategories = {
  frontend: {
    name: 'Frontend',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Next.js', level: 80 },
    ],
  },
  backend: {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Express.js', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 80 },
      { name: 'REST API', level: 90 },
    ],
  },
  tools: {
    name: 'Alat & Lainnya',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Figma', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 75 },
    ],
  },
  soft: {
    name: 'Soft Skills',
    skills: [
      { name: 'Komunikasi', level: 90 },
      { name: 'Tim Work', level: 95 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Adaptasi', level: 90 },
      { name: 'Kreativitas', level: 85 },
      { name: 'Manajemen Waktu', level: 80 },
    ],
  },
};

const skillCategoriesEn = {
  frontend: {
    name: 'Frontend',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Next.js', level: 80 },
    ],
  },
  backend: {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Express.js', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 80 },
      { name: 'REST API', level: 90 },
    ],
  },
  tools: {
    name: 'Tools & Others',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Figma', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 75 },
    ],
  },
  soft: {
    name: 'Soft Skills',
    skills: [
      { name: 'Communication', level: 90 },
      { name: 'Team Work', level: 95 },
      { name: 'Problem Solving', level: 85 },
      { name: 'Adaptation', level: 90 },
      { name: 'Creativity', level: 85 },
      { name: 'Time Management', level: 80 },
    ],
  },
};

export default function Skills() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('frontend');
  const categories = language === 'en' ? skillCategoriesEn : skillCategories;

  return (
    <section id="skills" className="py-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="gradient-text">{language === 'id' ? 'Keterampilan Saya' : 'My Skills'}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Technical skills and soft skills I developed throughout my career journey.'
              : 'Keterampilan teknis dan soft skills yang saya kembangkan selama perjalanan karir saya.'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {Object.entries(categories).map(([key, category]) => (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === key
                  ? 'gradient-bg text-white'
                  : 'glass text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories[activeTab].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-medium">{skill.name}</span>
                <span className="text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full gradient-bg rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
