import { FiLinkedin, FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin, FiGithub } from 'react-icons/fi';

const socialLinks = [
  { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FiFacebook, url: 'https://facebook.com', label: 'Facebook' },
  { icon: FiInstagram, url: 'https://instagram.com', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-semibold text-xl text-gray-900 dark:text-white mb-4">Resma Sultana</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nursing Instructor dedicated to excellence in nursing education and patient care.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {['About', 'Experience', 'Training', 'Skills', 'Education', 'Contact'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <address className="not-italic space-y-2 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FiPhone className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a href="tel:+8801839290152" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">01839290152</a>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a href="mailto:sultanaresma93@gmail.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">sultanaresma93@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <span>Rampura, Dhaka, Bangladesh</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Resma Sultana. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
}