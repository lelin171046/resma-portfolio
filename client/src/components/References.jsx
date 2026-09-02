import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollAnimation, useScrollAnimationVariants, useStaggerContainer, useStaggerItem } from '../hooks/useScrollAnimation';
import { FiUser, FiPhone, FiMail, FiHome, FiEye, FiEyeOff } from 'react-icons/fi';

export default function References({ data }) {
  const { ref, controls } = useScrollAnimation(0.1);
  const variants = useScrollAnimationVariants();
  const containerVariants = useStaggerContainer();
  const itemVariants = (index) => useStaggerItem(index * 0.1);
  const [showDetails, setShowDetails] = useState({});

  if (!data?.length) return null;

  const publicRefs = data.filter(r => r.isPublic);
  const privateRefs = data.filter(r => !r.isPublic);

  const toggleDetails = (id) => {
    setShowDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="references" ref={ref} className="section bg-white dark:bg-gray-950">
      <div className="container-main">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-title">References</h2>
          <p className="section-subtitle mx-auto">
            Professional references available upon request
          </p>
        </motion.div>

        {publicRefs.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 max-w-3xl mx-auto mb-12"
          >
            {publicRefs.map((ref, index) => (
              <motion.div
                key={ref._id}
                initial="hidden"
                animate="visible"
                variants={itemVariants(index)}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <FiUser className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{ref.name}</h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{ref.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{ref.institution}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                      {ref.phone && (
                        <a href={`tel:${ref.phone}`} className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          <FiPhone className="w-4 h-4" />
                          {ref.phone}
                        </a>
                      )}
                      {ref.email && (
                        <a href={`mailto:${ref.email}`} className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          <FiMail className="w-4 h-4" />
                          {ref.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {privateRefs.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="max-w-3xl mx-auto"
          >
            <div className="card p-6 text-center bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
              <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <FiUser className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Additional References</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {privateRefs.length} additional reference{privateRefs.length > 1 ? 's are' : ' is'} available upon request.
              </p>
              <button
                onClick={() => {
                  privateRefs.forEach(r => setShowDetails(prev => ({ ...prev, [r._id]: true })));
                }}
                className="btn-primary"
              >
                Show All References
              </button>
            </div>
            
            {privateRefs.map((ref, index) => (
              <motion.div
                key={ref._id}
                initial="hidden"
                animate={showDetails[ref._id] ? "visible" : "hidden"}
                variants={itemVariants(index)}
                className="card p-6 mt-4 animate-slide-down"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0">
                      <FiUser className="w-7 h-7 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{ref.name}</h3>
                      <p className="text-accent-600 dark:text-accent-400 font-medium">{ref.title}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{ref.institution}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDetails(ref._id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label={showDetails[ref._id] ? 'Hide details' : 'Show details'}
                  >
                    {showDetails[ref._id] ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                {showDetails[ref._id] && (
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {ref.phone && (
                      <a href={`tel:${ref.phone}`} className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <FiPhone className="w-4 h-4" />
                        {ref.phone}
                      </a>
                    )}
                    {ref.email && (
                      <a href={`mailto:${ref.email}`} className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <FiMail className="w-4 h-4" />
                        {ref.email}
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No references added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}