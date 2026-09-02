import { useState, useEffect, useCallback } from 'react';
import { publicApi, adminApi } from '../utils/api';

export function usePublicData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await publicApi.getAll();
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useAdminData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminApi.getDashboard();
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (profileData) => {
    const res = await adminApi.updateProfile(profileData);
    setData(prev => ({ ...prev, profile: res.data }));
    return res.data;
  };

  const createItem = async (type, itemData) => {
    const methodMap = {
      experience: adminApi.createExperience,
      training: adminApi.createTraining,
      skill: adminApi.createSkill,
      education: adminApi.createEducation,
      language: adminApi.createLanguage,
      reference: adminApi.createReference,
      socialLink: adminApi.createSocialLink
    };
    const res = await methodMap[type](itemData);
    setData(prev => ({
      ...prev,
      [type + (type === 'socialLink' ? 's' : type === 'skill' ? 's' : 's')]: [...(prev[type + (type === 'socialLink' ? 's' : type === 'skill' ? 's' : 's')] || []), res.data]
    }));
    return res.data;
  };

  const updateItem = async (type, id, itemData) => {
    const methodMap = {
      experience: adminApi.updateExperience,
      training: adminApi.updateTraining,
      skill: adminApi.updateSkill,
      education: adminApi.updateEducation,
      language: adminApi.updateLanguage,
      reference: adminApi.updateReference,
      socialLink: adminApi.updateSocialLink
    };
    const res = await methodMap[type](id, itemData);
    setData(prev => ({
      ...prev,
      [type + (type === 'socialLink' ? 's' : type === 'skill' ? 's' : 's')]: (prev[type + (type === 'socialLink' ? 's' : type === 'skill' ? 's' : 's')] || []).map(item => item._id === id ? res.data : item)
    }));
    return res.data;
  };

  const deleteItem = async (type, id) => {
    const methodMap = {
      experience: adminApi.deleteExperience,
      training: adminApi.deleteTraining,
      skill: adminApi.deleteSkill,
      education: adminApi.deleteEducation,
      language: adminApi.deleteLanguage,
      reference: adminApi.deleteReference,
      socialLink: adminApi.deleteSocialLink
    };
    await methodMap[type](id);
    setData(prev => ({
      ...prev,
      [type + (type === 'socialLink' ? 's' : type === 'skill' ? 's' : 's')]: (prev[type + (type === 'socialLink' ? 's' : type === 'skill' ? 's' : 's')] || []).filter(item => item._id !== id)
    }));
  };

  const reorderItems = async (collection, items) => {
    await adminApi.reorder(collection, items);
    setData(prev => ({
      ...prev,
      [collection]: items.map((item, index) => ({ ...item, order: index }))
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await adminApi.uploadImage(formData);
    return res.data;
  };

  const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const res = await adminApi.uploadResume(formData);
    return res.data;
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateProfile,
    createItem,
    updateItem,
    deleteItem,
    reorderItems,
    uploadImage,
    uploadResume
  };
}