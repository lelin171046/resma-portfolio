import { useState, useEffect } from 'react';
import { useAdminData } from '../../hooks/useData';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit, FiTrash2, FiArrowUp, FiArrowDown, FiImage, FiFileText, FiEye, FiMail, FiCheck, FiClock, FiUser, FiBriefcase, FiAward, FiActivity, FiBook, FiGlobe, FiUsers, FiLink, FiMessageSquare } from 'react-icons/fi';

const sectionConfig = {
  experience: { label: 'Experience', icon: FiBriefcase, fields: ['title', 'organization', 'location', 'startDate', 'endDate', 'current', 'description'] },
  training: { label: 'Training', icon: FiAward, fields: ['title', 'duration'] },
  skill: { label: 'Skill', icon: FiActivity, fields: ['name', 'category'] },
  education: { label: 'Education', icon: FiBook, fields: ['degree', 'institution', 'year', 'result'] },
  language: { label: 'Language', icon: FiGlobe, fields: ['name', 'proficiency'] },
  reference: { label: 'Reference', icon: FiUsers, fields: ['name', 'title', 'institution', 'phone', 'email', 'isPublic'] },
  socialLink: { label: 'Social Link', icon: FiLink, fields: ['platform', 'url', 'icon'] }
};

export default function AdminDashboard() {
  const { data, loading, error, updateProfile, createItem, updateItem, deleteItem, reorderItems, uploadImage, uploadResume, refetch } = useAdminData();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [dragItem, setDragItem] = useState(null);

  useEffect(() => {
    if (data) {
      setFormData(data.profile || {});
    }
  }, [data]);

  const handleCreate = (section) => {
    setEditingItem(null);
    const config = sectionConfig[section];
    const initialData = {};
    config.fields.forEach(field => {
      if (field === 'category') initialData[field] = 'clinical';
      else if (field === 'current') initialData[field] = false;
      else if (field === 'isPublic') initialData[field] = false;
      else initialData[field] = '';
    });
    setFormData(initialData);
    setActiveSection(section);
    setShowModal(true);
  };

  const handleEdit = (section, item) => {
    setEditingItem(item);
    setFormData(item);
    setActiveSection(section);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (activeSection === 'profile') {
        await updateProfile(formData);
        toast.success('Profile updated successfully');
      } else if (editingItem) {
        await updateItem(activeSection, editingItem._id, formData);
        toast.success(`${sectionConfig[activeSection].label} updated`);
      } else {
        await createItem(activeSection, formData);
        toast.success(`${sectionConfig[activeSection].label} created`);
      }
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      toast.error('Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (section, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(section, id);
        toast.success('Deleted successfully');
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleDragStart = (item) => setDragItem(item);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = async (section, targetItem) => {
    if (dragItem && dragItem._id !== targetItem._id) {
      const items = data[section + (section === 'socialLink' ? 's' : section === 'skill' ? 's' : 's')] || [];
      const newItems = [...items];
      const fromIndex = newItems.findIndex(i => i._id === dragItem._id);
      const toIndex = newItems.findIndex(i => i._id === targetItem._id);
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      await reorderItems(section, newItems);
    }
    setDragItem(null);
  };

  const handleFileUpload = async (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (type === 'image') {
        const res = await uploadImage(file);
        setFormData(prev => ({ ...prev, photoUrl: res.url }));
      } else {
        const res = await uploadResume(file);
        setFormData(prev => ({ ...prev, resumeUrl: res.url }));
      }
      toast.success('Uploaded successfully');
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const sections = [
    { key: 'profile', label: 'Profile', icon: FiUser },
    { key: 'experience', label: 'Experience', icon: FiBriefcase },
    { key: 'training', label: 'Training', icon: FiAward },
    { key: 'skills', label: 'Skills', icon: FiStethoscope },
    { key: 'education', label: 'Education', icon: FiGraduationCap },
    { key: 'languages', label: 'Languages', icon: FiGlobe },
    { key: 'references', label: 'References', icon: FiUsers },
    { key: 'socialLinks', label: 'Social Links', icon: FiLink },
    { key: 'messages', label: 'Messages', icon: FiMessageSquare }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your portfolio content</p>
        </div>
        <button
          onClick={() => handleCreate('profile')}
          className="btn-primary"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Edit Profile
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card p-6 hover:shadow-lg cursor-pointer"
            onClick={() => setActiveSection(section.key)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{section.label}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {section.key === 'messages' 
                ? `${data?.messages?.length || 0} messages`
                : section.key === 'profile'
                ? 'Profile settings'
                : `${data?.[section.key]?.length || 0} items`}
            </p>
          </motion.div>
        ))}
      </div>

      {activeSection !== 'dashboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveSection('dashboard')}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-white">
                  {sections.find(s => s.key === activeSection)?.label || activeSection}
                </h2>
              </div>
            </div>
            {activeSection !== 'messages' && activeSection !== 'profile' && (
              <button onClick={() => handleCreate(activeSection.replace('s', ''))} className="btn-primary">
                <FiPlus className="w-5 h-5 mr-2" />
                Add New
              </button>
            )}
          </div>

          <div className="p-6">
            {activeSection === 'profile' && (
              <ProfileForm data={data?.profile} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleFileUpload={handleFileUpload} submitting={submitting} />
            )}

            {activeSection === 'experience' && (
              <ListView
                items={data?.experience || []}
                fields={['title', 'organization', 'location', 'startDate', 'endDate', 'current']}
                renderItem={(item) => (
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.organization} • {item.startDate} {item.current ? '– Present' : `– ${item.endDate}`}</p>
                  </div>
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
                section="experience"
                dragItem={dragItem}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            )}

            {activeSection === 'training' && (
              <ListView
                items={data?.training || []}
                fields={['title', 'duration']}
                renderItem={(item) => (
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.duration}</p>
                  </div>
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
                section="training"
                dragItem={dragItem}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            )}

            {activeSection === 'skills' && (
              <ListView
                items={data?.skills || []}
                fields={['name', 'category']}
                renderItem={(item) => (
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.name}</p>
                    <span className={`badge ${item.category === 'clinical' ? 'badge-clinical' : 'badge-it'}`}>{item.category}</span>
                  </div>
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
                section="skill"
                dragItem={dragItem}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            )}

            {activeSection === 'education' && (
              <ListView
                items={data?.education || []}
                fields={['degree', 'institution', 'year', 'result']}
                renderItem={(item) => (
                  <div>
                    <p className="font-medium">{item.degree}</p>
                    <p className="text-sm text-gray-500">{item.institution} • {item.year} {item.result ? `• ${item.result}` : ''}</p>
                  </div>
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
                section="education"
                dragItem={dragItem}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            )}

            {activeSection === 'languages' && (
              <ListView
                items={data?.languages || []}
                fields={['name', 'proficiency']}
                renderItem={(item) => (
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.proficiency}</p>
                  </div>
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
                section="language"
              />
            )}

            {activeSection === 'references' && (
              <ListView
                items={data?.references || []}
                fields={['name', 'title', 'institution', 'phone', 'email', 'isPublic']}
                renderItem={(item) => (
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.title}, {item.institution}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge ${item.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {item.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
                section="reference"
                dragItem={dragItem}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            )}

            {activeSection === 'socialLinks' && (
              <ListView
                items={data?.socialLinks || []}
                fields={['platform', 'url', 'icon']}
                renderItem={(item) => (
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {item.icon.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-medium">{item.platform}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{item.url}</p>
                    </div>
                  </div>
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
                section="socialLink"
                dragItem={dragItem}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            )}

            {activeSection === 'messages' && (
              <MessageList messages={data?.messages || []} />
            )}
          </div>
        </motion.div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingItem(null); }}
        title={editingItem ? `Edit ${sectionConfig[activeSection]?.label || 'Item'}` : `Add ${sectionConfig[activeSection]?.label || 'Item'}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeSection === 'profile' ? (
            <ProfileFormFields formData={formData} setFormData={setFormData} handleFileUpload={handleFileUpload} />
          ) : (
            sectionConfig[activeSection]?.fields.map(field => (
              <FormField key={field} field={field} formData={formData} setFormData={setFormData} />
            ))
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => { setShowModal(false); setEditingItem(null); }} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function ProfileForm({ data, formData, setFormData, handleSubmit, handleFileUpload, submitting }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField field="name" formData={formData} setFormData={setFormData} label="Full Name" />
        <FormField field="title" formData={formData} setFormData={setFormData} label="Professional Title" />
      </div>
      <FormField field="tagline" formData={formData} setFormData={setFormData} label="Tagline" as="textarea" rows={3} />
      <FormField field="aboutText" formData={formData} setFormData={setFormData} label="About Text" as="textarea" rows={4} />
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="label">Profile Photo</label>
          <div className="flex items-center gap-4">
            {formData.photoUrl && (
              <img src={formData.photoUrl} alt="Profile" className="w-20 h-20 rounded-xl object-cover" />
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload('image', e)} className="input" />
          </div>
        </div>
        <div>
          <label className="label">Resume PDF</label>
          <div className="flex items-center gap-4">
            {formData.resumeUrl && (
              <a href={formData.resumeUrl} target="_blank" className="text-primary-600 hover:underline">Current Resume</a>
            )}
            <input type="file" accept=".pdf" onChange={(e) => handleFileUpload('resume', e)} className="input" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}

function ProfileFormFields({ formData, setFormData, handleFileUpload }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField field="name" formData={formData} setFormData={setFormData} label="Full Name" />
        <FormField field="title" formData={formData} setFormData={setFormData} label="Professional Title" />
      </div>
      <FormField field="tagline" formData={formData} setFormData={setFormData} label="Tagline" as="textarea" rows={3} />
      <FormField field="aboutText" formData={formData} setFormData={setFormData} label="About Text" as="textarea" rows={4} />
      <div>
        <label className="label">Profile Photo URL</label>
        <input value={formData.photoUrl || ''} onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} className="input" placeholder="Cloudinary image URL" />
      </div>
      <div>
        <label className="label">Resume PDF URL</label>
        <input value={formData.resumeUrl || ''} onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })} className="input" placeholder="Cloudinary PDF URL" />
      </div>
    </>
  );
}

function FormField({ field, formData, setFormData, label, as = 'input', rows }) {
  const fieldLabels = {
    title: 'Title', organization: 'Organization', location: 'Location',
    startDate: 'Start Date', endDate: 'End Date', current: 'Current Position',
    description: 'Description', duration: 'Duration', name: 'Name',
    category: 'Category', degree: 'Degree', institution: 'Institution',
    year: 'Year', result: 'Result/GPA', proficiency: 'Proficiency',
    phone: 'Phone', email: 'Email', isPublic: 'Public', platform: 'Platform',
    url: 'URL', icon: 'Icon Name'
  };

  if (field === 'category') {
    return (
      <div>
        <label className="label">{fieldLabels[field] || field}</label>
        <select value={formData[field] || 'clinical'} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} className="input">
          <option value="clinical">Clinical</option>
          <option value="it">IT</option>
        </select>
      </div>
    );
  }

  if (field === 'current' || field === 'isPublic') {
    return (
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData[field] || false}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span>{fieldLabels[field] || field}</span>
        </label>
      </div>
    );
  }

  return (
    <div>
      <label className="label">{fieldLabels[field] || field}</label>
      {as === 'textarea' ? (
        <textarea value={formData[field] || ''} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} rows={rows || 3} className="input" />
      ) : (
        <input value={formData[field] || ''} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} className="input" />
      )}
    </div>
  );
}

function ListView({ items, fields, renderItem, onEdit, onDelete, section, dragItem, onDragStart, onDragOver, onDrop }) {
  if (!items.length) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-8">No items yet. Click "Add New" to create one.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-4 rounded-lg border transition-colors ${dragItem?._id === item._id ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-primary-300'}`}
          draggable
          onDragStart={() => onDragStart(item)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(section, item)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">{renderItem(item)}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => onEdit(section, item)} className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors" title="Edit">
                <FiEdit className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(section, item._id)} className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MessageList({ messages }) {
  if (!messages.length) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-8">No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map(msg => (
        <motion.div
          key={msg._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border ${msg.read ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' : 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{msg.name}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{msg.email}</span>
                {!msg.read && <span className="badge bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">New</span>}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}