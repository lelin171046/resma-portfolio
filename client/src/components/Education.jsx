import { motion } from 'framer-motion';
import { useScrollAnimation, useScrollAnimationVariants, useStaggerContainer, useStaggerItem } from '../hooks/useScrollAnimation';
import { FiBook, FiAward, FiCalendar } from 'react-icons/fi';

export default function Education({ data }) {
  const { ref, controls } = useScrollAnimation(0.1);
  const variants = useScrollAnimationVariants();
  const containerVariants = useStaggerContainer();
  const itemVariants = (index) => useStaggerItem(index * 0.1);

  if (!data?.length) return null;

  return (
    <section id="education" ref={ref} className="section bg-white dark:bg-gray-950">
      <div className="container-main">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle mx-auto">
            Academic qualifications and achievements
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {data.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial="hidden"
              animate="visible"
              variants={itemVariants(index)}
              className="card p-6 hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <FiBook className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end sm:items-end gap-2 text-right">
                  <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
                    {edu.year}
                  </span>
                  {edu.result && (
                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <FiAward className="w-4 h-4" />
                      <span>{edu.result}</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}