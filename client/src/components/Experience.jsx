import { motion } from 'framer-motion';
import { useScrollAnimation, useScrollAnimationVariants, useStaggerContainer, useStaggerItem } from '../hooks/useScrollAnimation';
import { FiBriefcase, FiCalendar, FiMapPin, FiHome } from 'react-icons/fi';

export default function Experience({ data }) {
  const { ref, controls } = useScrollAnimation(0.1);
  const variants = useScrollAnimationVariants();
  const containerVariants = useStaggerContainer();
  const itemVariants = (index) => useStaggerItem(index * 0.1);

  if (!data?.length) return null;

  return (
    <section id="experience" ref={ref} className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-main">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle mx-auto">
            My journey through clinical practice, teaching, and educational roles
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-accent-400 hidden lg:block" />
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12"
          >
            {data.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial="hidden"
                animate="visible"
                variants={itemVariants(index)}
                className="relative lg:pl-20"
              >
                <div className="absolute left-0 top-4 lg:left-4 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 shadow-lg z-10" />
                
                <motion.div
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="card p-6 lg:p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-xl text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">{exp.organization}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 lg:ml-8 lg:shrink-0">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {exp.startDate} {exp.current ? '– Present' : `– ${exp.endDate}`}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <FiMapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {exp.current && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
                      <FiHome className="w-3 h-3 mr-1" />
                      Current Position
                    </span>
                  )}
                  
                  {exp.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}