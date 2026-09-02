import { motion } from 'framer-motion';
import { useScrollAnimation, useScrollAnimationVariants, useStaggerContainer, useStaggerItem } from '../hooks/useScrollAnimation';
import { FiTarget, FiHeart, FiAward, FiUsers } from 'react-icons/fi';

const aboutItems = [
  { icon: FiTarget, title: 'Career Objective', description: 'To apply comprehensive nursing knowledge and clinical expertise as a Nursing Instructor, fostering student development while upholding the highest standards of nursing education and patient care.' },
  { icon: FiHeart, title: 'Patient-Centered Care', description: 'Committed to evidence-based practice and compassionate care delivery across diverse clinical settings including ICU, CCU, Pediatrics, and Emergency departments.' },
  { icon: FiAward, title: 'Academic Excellence', description: 'Consistent high achiever with GPA 5.00 in both SSC and HSC, and successful completion of BSc Nursing with strong clinical competency.' },
  { icon: FiUsers, title: 'Teaching Experience', description: '2 years as Admission Coaching Instructor and 2 years as Kids Spoken English Instructor, developing strong communication and mentoring skills.' }
];

export default function About({ data }) {
  const { ref, controls } = useScrollAnimation(0.1);
  const variants = useScrollAnimationVariants();
  const containerVariants = useStaggerContainer();
  const itemVariants = (index) => useStaggerItem(index * 0.1);

  return (
    <section id="about" ref={ref} className="section bg-white dark:bg-gray-950">
      <div className="container-main">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            {data?.aboutText || 'I am a dedicated Nursing Instructor with a strong academic background and diverse clinical experience. My passion lies in educating the next generation of nurses while maintaining excellence in patient care standards.'}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aboutItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate="visible"
              variants={itemVariants(index)}
              className="card p-6 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}