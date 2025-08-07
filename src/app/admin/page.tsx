'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeData } from '@/types';
import AdminHeader from '@/components/admin/AdminHeader';
import PersonalInfoEditor from '@/components/admin/PersonalInfoEditor';
import SkillsEditor from '@/components/admin/SkillsEditor';
import ExperienceEditor from '@/components/admin/ExperienceEditor';
import ProjectsEditor from '@/components/admin/ProjectsEditor';
import FactsEditor from '@/components/admin/FactsEditor';
import ServicesEditor from '@/components/admin/ServicesEditor';

export default function AdminPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('personal');
  
  const router = useRouter();

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    loadResumeData();
  }, []);

  const loadResumeData = async () => {
    try {
      const response = await fetch('/api/resume');
      const result = await response.json();
      
      if (response.ok) {
        setResumeData(result);
      } else {
        console.error('Ошибка загрузки данных:', result.error);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!resumeData) return;
    
    setSaveStatus('saving');
    
    try {
      const response = await fetch('/api/resume', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      const result = await response.json();

      if (result.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Ошибка загрузки данных резюме</p>
          <button
            onClick={loadResumeData}
            className="btn-primary mt-4"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Личная информация', icon: '👤' },
    { id: 'skills', label: 'Навыки', icon: '💻' },
    { id: 'experience', label: 'Опыт работы', icon: '💼' },
    { id: 'projects', label: 'Проекты', icon: '🚀' },
    { id: 'facts', label: 'Факты', icon: '📊' },
    { id: 'services', label: 'Услуги', icon: '🛠️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        onSave={handleSave}
        onLogout={handleLogout}
        saveStatus={saveStatus}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Табы */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Контент табов */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'personal' && (
            <PersonalInfoEditor
              data={resumeData.personal}
              onChange={(personal) => setResumeData({ ...resumeData, personal })}
            />
          )}
          
          {activeTab === 'skills' && (
            <SkillsEditor
              skills={resumeData.skills}
              onChange={(skills) => setResumeData({ ...resumeData, skills })}
            />
          )}
          
          {activeTab === 'experience' && (
            <ExperienceEditor
              experience={resumeData.experience}
              onChange={(experience) => setResumeData({ ...resumeData, experience })}
            />
          )}
          
          {activeTab === 'projects' && (
            <ProjectsEditor
              projects={resumeData.projects}
              onChange={(projects) => setResumeData({ ...resumeData, projects })}
            />
          )}
          
          {activeTab === 'facts' && (
            <FactsEditor
              facts={resumeData.facts}
              onChange={(facts) => setResumeData({ ...resumeData, facts })}
            />
          )}
          
          {activeTab === 'services' && (
            <ServicesEditor />
          )}
        </div>
      </div>
    </div>
  );
} 