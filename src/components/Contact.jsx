import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = language === 'en' ? 'Name is required' : 'Nama wajib diisi';
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Invalid email format' : 'Email tidak valid';
    }
    if (!formData.subject.trim()) newErrors.subject = language === 'en' ? 'Subject is required' : 'Subjek wajib diisi';
    if (!formData.message.trim()) newErrors.message = language === 'en' ? 'Message is required' : 'Pesan wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setStatus(null);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'argich034@gmail.com',
      };

      emailjs
        .send(
          'service_7pl1bih',
          'template_k7h81gi',
          templateParams,
          'GacV_1zdXIPDZCRxq'
        )
        .then(() => {
            setStatus({ type: 'success', message: t('contact.success') });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
          },
          () => {
            setStatus({ type: 'error', message: t('contact.error') });
            setIsSubmitting(false);
          }
        );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <section id="contact" className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{language === 'id' ? 'Hubungi Saya' : 'Contact Me'}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t('contact.contactInfo')}</h3>
            <div className="space-y-6 mb-8">
              {[
                { icon: Mail, label: t('contact.email'), value: 'argich034@gmail.com' },
                { icon: Phone, label: t('contact.phone'), value: '+62 851 5772 8073' },
                { icon: MapPin, label: t('contact.location'), value: 'Jakarta, Indonesia' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center">
                    <item.icon className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{item.label}</p>
                    <p className="text-lg font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h4 className="text-lg font-semibold mb-4">{t('contact.social')}</h4>
            <div className="flex gap-4">
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  status.type === 'success'
                    ? 'bg-green-600/20 text-green-400'
                    : 'bg-red-600/20 text-red-400'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                {status.message}
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder={t('contact.namePlaceholder')}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.subject')}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-slate-700'
                  }`}
                  placeholder={t('contact.subjectPlaceholder')}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-slate-700'
                  }`}
                  placeholder={t('contact.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full gradient-bg py-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    {t('contact.sending')}
                  </span>
                ) : (
                  <>
                    <Send size={20} />
                    {t('contact.send')}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
