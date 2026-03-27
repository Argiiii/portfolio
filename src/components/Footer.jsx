import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer className='py-12 bg-slate-900/80 border-t border-slate-800'>
      <div className='max-w-7xl mx-auto px-6 lg:px-16'>
        <div className='grid md:grid-cols-3 gap-8 mb-8'>
          <div>
            <motion.a
              href='#home'
              className='text-2xl font-bold gradient-text inline-block mb-4'
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.a>
            <p className='text-slate-400 leading-relaxed'>
              {language === 'en'
                ? 'Creating innovative and impactful digital solutions through technology.'
                : 'Membuat solusi digital yang inovatif dan berdampak positif melalui teknologi.'
              }
            </p>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-4'>{t('footer.navigation')}</h4>
            <ul className='space-y-2'>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-slate-400 hover:text-white transition-colors'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-4'>{t('footer.follow')}</h4>
            <div className='flex gap-4'>
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href='#'
                  whileHover={{ y: -5, scale: 1.1 }}
                  className='w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors'
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-slate-400 text-sm'>
            © {currentYear} Argi Chanaffi. All rights reserved.
          </p>
          <p className='text-slate-400 text-sm flex items-center gap-1'>
            {t('footer.madeWith')} <Heart size={14} className='text-red-500' /> {t('footer.using')}
          </p>
        </div>
      </div>
    </footer>
  );
}
