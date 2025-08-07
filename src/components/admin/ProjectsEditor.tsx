'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { generateId } from '@/lib/data';

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export default function ProjectsEditor({ projects, onChange }: ProjectsEditorProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      title: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
    };
    setEditingProject(newProject);
    setIsAdding(true);
  };

  const editProject = (project: Project) => {
    setEditingProject(project);
    setIsAdding(false);
  };

  const saveProject = () => {
    if (!editingProject || !editingProject.title.trim() || !editingProject.description.trim()) return;

    if (isAdding) {
      onChange([...projects, editingProject]);
    } else {
      const updatedProjects = projects.map(project => 
        project.id === editingProject.id ? editingProject : project
      );
      onChange(updatedProjects);
    }

    setEditingProject(null);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setIsAdding(false);
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    onChange(updatedProjects);
  };

  const updateEditingProject = (field: keyof Project, value: any) => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, [field]: value });
  };

  const addTechnology = () => {
    if (!editingProject) return;
    const tech = prompt('Введите название технологии:');
    if (tech && tech.trim()) {
      updateEditingProject('technologies', [...editingProject.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (index: number) => {
    if (!editingProject) return;
    const newTechs = editingProject.technologies.filter((_, i) => i !== index);
    updateEditingProject('technologies', newTechs);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Проекты</h2>
        <button onClick={addProject} className="btn-primary">
          Добавить проект
        </button>
      </div>

      {/* Форма редактирования */}
      {editingProject && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            {isAdding ? 'Добавить проект' : 'Редактировать проект'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название проекта
              </label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => updateEditingProject('title', e.target.value)}
                className="input-field"
                placeholder="Название проекта"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ссылка на демо
              </label>
              <input
                type="url"
                value={editingProject.link || ''}
                onChange={(e) => updateEditingProject('link', e.target.value)}
                className="input-field"
                placeholder="https://demo.example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ссылка на GitHub
              </label>
              <input
                type="url"
                value={editingProject.github || ''}
                onChange={(e) => updateEditingProject('github', e.target.value)}
                className="input-field"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              value={editingProject.description}
              onChange={(e) => updateEditingProject('description', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Опишите проект..."
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
              {editingProject.technologies.map((tech, index) => (
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
              onClick={saveProject}
              disabled={!editingProject.title.trim() || !editingProject.description.trim()}
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

      {/* Список проектов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => editProject(project)}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">{project.description}</p>
            
            {(project.link || project.github) && (
              <div className="flex gap-2 mb-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Демо
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-700 text-sm"
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
            
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
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
        ))}
        
        {projects.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>Проекты не добавлены</p>
            <button onClick={addProject} className="btn-primary mt-2">
              Добавить первый проект
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 