import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLayout, FiUser, FiSettings, FiLogOut, FiHome, FiBriefcase, FiAward, FiActivity, FiBook, FiGlobe, FiUsers, FiMessageSquare, FiLink, FiImage, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const adminNavItems = [
  { path: '/admin', label: 'Dashboard', icon: FiHome },
  { path: '/admin/profile', label: 'Profile', icon: FiUser },
  { path: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { path: '/admin/training', label: 'Training', icon: FiAward },
  { path: '/admin/skills', label: 'Skills', icon: FiActivity },
  { path: '/admin/education', label: 'Education', icon: FiBook },
  { path: '/admin/languages', label: 'Languages', icon: FiGlobe },
  { path: '/admin/references', label: 'References', icon: FiUsers },
  { path: '/admin/social-links', label: 'Social Links', icon: FiLink },
  { path: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
  { path: '/admin/media', label: 'Media', icon: FiImage },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="font-display font-bold text-xl text-primary-700 dark:text-primary-300">Admin Panel</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Resma Sultana Portfolio</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
            {adminNavItems.map(item => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: adminNavItems.indexOf(item) * 0.05 }}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Logged in as {admin?.email}
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col lg:pl-64">
        <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="font-display font-bold text-xl text-primary-700 dark:text-primary-300">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiLayout className="w-6 h-6" />}
            </button>
          </div>
        </header>

        <main className="flex-1 pt-16 lg:pt-0 p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}