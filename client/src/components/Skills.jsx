import { motion } from 'framer-motion';
import { useScrollAnimation, useScrollAnimationVariants, useStaggerContainer, useStaggerItem } from '../hooks/useScrollAnimation';
import { FiActivity, FiCpu, FiHeart, FiDatabase } from 'react-icons/fi';

export default function Skills({ data }) {
  const { ref, controls } = useScrollAnimation(0.1);
  const variants = useScrollAnimationVariants();
  const containerVariants = useStaggerContainer();
  const itemVariants = (index) => useStaggerItem(index * 0.1);

  if (!data?.length) return null;

  const clinicalSkills = data.filter(s => s.category === 'clinical');
  const itSkills = data.filter(s => s.category === 'it');

  return (
    <section id="skills" ref={ref} className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-main">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle mx-auto">
            Clinical expertise and technical proficiencies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <FiActivity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-900 dark:text-white">Clinical Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {clinicalSkills.map((skill, index) => (
                <motion.span
                  key={skill._id}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants(index)}
                  className="badge-clinical"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                <FiCpu className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-900 dark:text-white">IT Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {itSkills.map((skill, index) => (
                <motion.span
                  key={skill._id}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants(index)}
                  className="badge-it"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}