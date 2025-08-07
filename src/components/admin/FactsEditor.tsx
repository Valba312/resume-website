'use client';

import { useState } from 'react';
import { Fact } from '@/types';
import { generateId } from '@/lib/data';

interface FactsEditorProps {
  facts: Fact[];
  onChange: (facts: Fact[]) => void;
}

export default function FactsEditor({ facts, onChange }: FactsEditorProps) {
  const [editingFact, setEditingFact] = useState<Fact | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addFact = () => {
    const newFact: Fact = {
      id: generateId(),
      title: '',
      description: '',
      icon: '',
      category: 'achievement',
    };
    setEditingFact(newFact);
    setIsAdding(true);
  };

  const editFact = (fact: Fact) => {
    setEditingFact(fact);
    setIsAdding(false);
  };

  const saveFact = () => {
    if (!editingFact || !editingFact.title.trim() || !editingFact.description.trim()) return;

    if (isAdding) {
      onChange([...facts, editingFact]);
    } else {
      const updatedFacts = facts.map(fact => 
        fact.id === editingFact.id ? editingFact : fact
      );
      onChange(updatedFacts);
    }

    setEditingFact(null);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingFact(null);
    setIsAdding(false);
  };

  const deleteFact = (factId: string) => {
    const updatedFacts = facts.filter(fact => fact.id !== factId);
    onChange(updatedFacts);
  };

  const updateEditingFact = (field: keyof Fact, value: any) => {
    if (!editingFact) return;
    setEditingFact({ ...editingFact, [field]: value });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Факты и достижения</h2>
        <button onClick={addFact} className="btn-primary">
          Добавить факт
        </button>
      </div>

      {/* Форма редактирования */}
      {editingFact && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            {isAdding ? 'Добавить факт' : 'Редактировать факт'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок
              </label>
              <input
                type="text"
                value={editingFact.title}
                onChange={(e) => updateEditingFact('title', e.target.value)}
                className="input-field"
                placeholder="Краткий заголовок"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Категория
              </label>
              <select
                value={editingFact.category}
                onChange={(e) => updateEditingFact('category', e.target.value as Fact['category'])}
                className="input-field"
              >
                <option value="achievement">Достижение</option>
                <option value="skill">Навык</option>
                <option value="project">Проект</option>
                <option value="education">Образование</option>
                <option value="certificate">Сертификат</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Иконка (эмодзи)
              </label>
              <input
                type="text"
                value={editingFact.icon || ''}
                onChange={(e) => updateEditingFact('icon', e.target.value)}
                className="input-field"
                placeholder="🎯"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              value={editingFact.description}
              onChange={(e) => updateEditingFact('description', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Подробное описание факта..."
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={saveFact}
              disabled={!editingFact.title.trim() || !editingFact.description.trim()}
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

      {/* Список фактов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facts.map((fact) => (
          <div key={fact.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {fact.icon && <span className="text-2xl">{fact.icon}</span>}
                <h3 className="font-medium text-gray-900">{fact.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {fact.category}
                </span>
                <button
                  onClick={() => editFact(fact)}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteFact(fact.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm">{fact.description}</p>
          </div>
        ))}
        
        {facts.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>Факты не добавлены</p>
            <button onClick={addFact} className="btn-primary mt-2">
              Добавить первый факт
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 