import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiMail, FiPhone, FiMapPin, FiLinkedin, FiFacebook, FiInstagram, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useScrollAnimation, useScrollAnimationVariants } from '../hooks/useScrollAnimation';

export default function Hero({ data }) {
  const { ref, controls, inView } = useScrollAnimation(0.1);
  const variants = useScrollAnimationVariants();

  const downloadResume = () => {
    if (data?.resumeUrl) {
      const link = document.createElement('a');
      link.href = data.resumeUrl;
      link.download = 'Resma_Sultana_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const viewResume = () => {
    if (data?.resumeUrl) {
      window.open(data.resumeUrl, '_blank');
    }
  };

  const socialLinks = [
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FiInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FiMessageSquare, url: 'https://wa.me/8801839290152', label: 'WhatsApp' },
  ];

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230d9488%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      <div className="container-main relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              className="space-y-6"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.5 } }}
                className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium"
              >
                Nursing Instructor
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight"
              >
                Resma Sultana
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } }}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0"
              >
                {data?.tagline || 'Compassionate and motivated BSc Nursing graduate with strong clinical training and hands-on internship experience.'}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={downloadResume}
                  disabled={!data?.resumeUrl}
                  className="btn-primary group"
                >
                  <FiDownload className="w-5 h-5 mr-2" />
                  Download Resume
                </button>
                <button
                  onClick={viewResume}
                  disabled={!data?.resumeUrl}
                  className="btn-secondary group"
                >
                  <FiFileText className="w-5 h-5 mr-2" />
                  View Resume
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400"
              >
                <a href="tel:+8801839290152" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FiPhone className="w-4 h-4" />
                  <span>01839290152</span>
                </a>
                <a href="mailto:sultanaresma93@gmail.com" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FiMail className="w-4 h-4" />
                  <span>sultanaresma93@gmail.com</span>
                </a>
                <span className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4" />
                  <span>Rampura, Dhaka</span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }}
                className="flex justify-center lg:justify-start gap-4"
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="relative"
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-800 shadow-2xl">
                {data?.photoUrl ? (
                  <img
                    src={data.photoUrl}
                    alt="Resma Sultana - Nursing Instructor"
                    className="w-full h-auto object-cover aspect-square"
                  />
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                    <FiUser className="w-24 h-24 text-white/50" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-4 border-primary-200 dark:border-primary-800 flex items-center justify-center shadow-lg">
                <FiFileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.8 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400 dark:text-gray-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}