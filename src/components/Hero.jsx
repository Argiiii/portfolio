import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center relative overflow-hidden'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20' />

      <motion.div
        className='absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse-glow'
        style={{ top: '10%', left: '5%' }}
      />
      <motion.div
        className='absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse-glow'
        style={{ animationDelay: '1.5s' }}
      />

      <div className='max-w-7xl mx-auto px-6 lg:px-16 py-32 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-blue-400 font-medium mb-4"
            >
              {t('hero.greeting')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">Argi Chanaffi, S.Kom.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-400 leading-relaxed mb-8"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='flex flex-wrap gap-4 mb-8'
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-bg px-8 py-3 rounded-full text-white font-medium flex items-center gap-2"
              >
                {t('hero.viewProjects')} <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-slate-600 px-8 py-3 rounded-full text-white font-medium hover:border-blue-500 transition-colors"
              >
                {t('hero.contactMe')}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='flex gap-6'
            >
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href='#'
                  whileHover={{ y: -5, color: '#60a5fa' }}
                  className='text-slate-400 transition-colors'
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative'
          >
            <div className='relative w-72 h-72 mx-auto lg:w-96 lg:h-96'>
              <motion.div
                className='absolute inset-0 rounded-full gradient-bg opacity-20'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className='absolute inset-4 rounded-full bg-slate-800 flex items-center justify-center'
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className='w-2 h-2 bg-blue-500 rounded-full absolute top-4' />
                <div className='w-2 h-2 bg-purple-500 rounded-full absolute bottom-4' />
                <div className='w-2 h-2 bg-cyan-500 rounded-full absolute left-4' />
                <div className='w-2 h-2 bg-pink-500 rounded-full absolute right-4' />
              </motion.div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='text-6xl font-bold gradient-text'>👨‍💻</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='absolute bottom-10 left-1/2 -translate-x-1/2'
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2'
          >
            <div className='w-1 h-2 bg-blue-500 rounded-full' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
