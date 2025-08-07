'use client';

import { useState } from 'react';
import { Skill } from '@/types';
import { generateId } from '@/lib/data';

interface SkillsEditorProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export default function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);

  const addSkill = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      level: 3,
      category: 'frontend',
    };
    setEditingSkill(newSkill);
    setIsAdding(true);
  };

  const editSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setIsAdding(false);
  };

  const saveSkill = () => {
    if (!editingSkill || !editingSkill.name.trim()) return;

    if (isAdding) {
      onChange([...skills, editingSkill]);
    } else {
      const updatedSkills = skills.map(skill => 
        skill.id === editingSkill.id ? editingSkill : skill
      );
      onChange(updatedSkills);
    }

    setEditingSkill(null);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingSkill(null);
    setIsAdding(false);
  };

  const deleteSkill = (skillId: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== skillId);
    onChange(updatedSkills);
  };

  const updateEditingSkill = (field: keyof Skill, value: any) => {
    if (!editingSkill) return;
    setEditingSkill({ ...editingSkill, [field]: value });
  };

  const handleIconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editingSkill) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 2MB для иконок)
    if (file.size > 2 * 1024 * 1024) {
      alert('Размер файла не должен превышать 2MB');
      return;
    }

    setIsUploadingIcon(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        updateEditingSkill('icon', result.url);
      } else {
        alert('Ошибка загрузки иконки: ' + result.error);
      }
    } catch (error) {
      console.error('Ошибка загрузки иконки:', error);
      alert('Ошибка загрузки иконки');
    } finally {
      setIsUploadingIcon(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Навыки</h2>
        <button onClick={addSkill} className="btn-primary">
          Добавить навык
        </button>
      </div>

      {/* Форма редактирования */}
      {editingSkill && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            {isAdding ? 'Добавить навык' : 'Редактировать навык'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название
                </label>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) => updateEditingSkill('name', e.target.value)}
                  className="input-field"
                  placeholder="Название навыка"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категория
                </label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => updateEditingSkill('category', e.target.value as Skill['category'])}
                  className="input-field"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="devops">DevOps</option>
                  <option value="database">Базы данных</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Уровень (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editingSkill.level}
                  onChange={(e) => updateEditingSkill('level', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Загрузка иконки */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Иконка
                </label>
                
                <div className="flex items-center space-x-4">
                  {/* Предварительный просмотр */}
                  {editingSkill.icon && (
                    <div className="relative">
                      <img
                        src={editingSkill.icon}
                        alt="Иконка навыка"
                        className="w-12 h-12 object-cover rounded border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <button
                        onClick={() => updateEditingSkill('icon', '')}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  {/* Кнопка загрузки */}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconUpload}
                      className="hidden"
                      id="icon-upload"
                      disabled={isUploadingIcon}
                    />
                    <label
                      htmlFor="icon-upload"
                      className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer ${
                        isUploadingIcon ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isUploadingIcon ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                          Загрузка...
                        </>
                      ) : (
                        'Загрузить иконку'
                      )}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Максимальный размер: 2MB
                    </p>
                  </div>
                </div>
                
                {/* URL иконки (для ручного ввода) */}
                <div className="mt-2">
                  <input
                    type="url"
                    value={editingSkill.icon || ''}
                    onChange={(e) => updateEditingSkill('icon', e.target.value)}
                    className="input-field text-sm"
                    placeholder="URL иконки или эмодзи (например: 🚀)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <button
              onClick={saveSkill}
              disabled={!editingSkill.name.trim()}
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

      {/* Список навыков */}
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  {skill.icon && (
                    <img
                      src={skill.icon}
                      alt="Иконка"
                      className="w-6 h-6 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <h3 className="font-medium text-gray-900">{skill.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {skill.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    Уровень: {skill.level}/5
                  </span>
                </div>
                
                {/* Прогресс-бар */}
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => editSkill(skill)}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Навыки не добавлены</p>
            <button onClick={addSkill} className="btn-primary mt-2">
              Добавить первый навык
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 