'use client';

import { useState } from 'react';
import { Experience } from '@/types';
import { generateId } from '@/lib/data';

interface ExperienceEditorProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export default function ExperienceEditor({ experience, onChange }: ExperienceEditorProps) {
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: [],
    };
    setEditingExp(newExp);
    setIsAdding(true);
  };

  const editExperience = (exp: Experience) => {
    setEditingExp(exp);
    setIsAdding(false);
  };

  const saveExperience = () => {
    if (!editingExp || !editingExp.company.trim() || !editingExp.position.trim()) return;

    if (isAdding) {
      onChange([...experience, editingExp]);
    } else {
      const updatedExp = experience.map(exp => 
        exp.id === editingExp.id ? editingExp : exp
      );
      onChange(updatedExp);
    }

    setEditingExp(null);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingExp(null);
    setIsAdding(false);
  };

  const deleteExperience = (expId: string) => {
    const updatedExp = experience.filter(exp => exp.id !== expId);
    onChange(updatedExp);
  };

  const updateEditingExp = (field: keyof Experience, value: any) => {
    if (!editingExp) return;
    setEditingExp({ ...editingExp, [field]: value });
  };

  const addTechnology = () => {
    if (!editingExp) return;
    const tech = prompt('Введите название технологии:');
    if (tech && tech.trim()) {
      updateEditingExp('technologies', [...editingExp.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (index: number) => {
    if (!editingExp) return;
    const newTechs = editingExp.technologies.filter((_, i) => i !== index);
    updateEditingExp('technologies', newTechs);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Опыт работы</h2>
        <button onClick={addExperience} className="btn-primary">
          Добавить опыт
        </button>
      </div>

      {/* Форма редактирования */}
      {editingExp && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            {isAdding ? 'Добавить опыт работы' : 'Редактировать опыт работы'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Компания
              </label>
              <input
                type="text"
                value={editingExp.company}
                onChange={(e) => updateEditingExp('company', e.target.value)}
                className="input-field"
                placeholder="Название компании"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Должность
              </label>
              <input
                type="text"
                value={editingExp.position}
                onChange={(e) => updateEditingExp('position', e.target.value)}
                className="input-field"
                placeholder="Название должности"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата начала (YYYY-MM)
              </label>
              <input
                type="text"
                value={editingExp.startDate}
                onChange={(e) => updateEditingExp('startDate', e.target.value)}
                className="input-field"
                placeholder="2020-01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата окончания (YYYY-MM, оставьте пустым если по настоящее время)
              </label>
              <input
                type="text"
                value={editingExp.endDate || ''}
                onChange={(e) => updateEditingExp('endDate', e.target.value)}
                className="input-field"
                placeholder="2023-12"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              value={editingExp.description}
              onChange={(e) => updateEditingExp('description', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Опишите ваши обязанности и достижения..."
            />
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Технологии
              </label>
              <button
                type="button"
                onClick={addTechnology}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Добавить технологию
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editingExp.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {tech}
                  <button
                    onClick={() => removeTechnology(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={saveExperience}
              disabled={!editingExp.company.trim() || !editingExp.position.trim()}
              className="btn-primary"
            >
              Сохранить
            </button>
            <button onClick={cancelEdit} className="btn-secondary">
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Список опыта */}
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-primary-600 font-medium">{exp.company}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.startDate} - {exp.endDate || 'По настоящее время'}
                </p>
                <p className="text-gray-700 mb-2">{exp.description}</p>
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => editExperience(exp)}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Опыт работы не добавлен</p>
            <button onClick={addExperience} className="btn-primary mt-2">
              Добавить первый опыт работы
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 