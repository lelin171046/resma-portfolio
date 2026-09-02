import { motion } from 'framer-motion';
import { useScrollAnimation, useScrollAnimationVariants, useStaggerContainer, useStaggerItem } from '../hooks/useScrollAnimation';
import { FiGlobe, FiCheckCircle } from 'react-icons/fi';

export default function Languages({ data }) {
  const { ref, controls } = useScrollAnimation(0.1);
  const variants = useScrollAnimationVariants();
  const containerVariants = useStaggerContainer();
  const itemVariants = (index) => useStaggerItem(index * 0.1);

  if (!data?.length) return null;

  return (
    <section id="languages" ref={ref} className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-main">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-title">Languages</h2>
          <p className="section-subtitle mx-auto">
            Language proficiencies
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid sm:grid-cols-2 max-w-md mx-auto gap-4"
        >
          {data.map((lang, index) => (
            <motion.div
              key={lang._id}
              initial="hidden"
              animate="visible"
              variants={itemVariants(index)}
              className="card p-6 text-center hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{lang.name}</h3>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                <FiCheckCircle className="w-3 h-3" />
                {lang.proficiency}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}