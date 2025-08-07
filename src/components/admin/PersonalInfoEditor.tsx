'use client';

import { useState } from 'react';
import { Contact } from '@/types';
import { generateId } from '@/lib/data';

interface PersonalInfo {
  name: string;
  title: string;
  photo: string;
  about: string;
  contacts: Contact[];
}

interface PersonalInfoEditorProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoEditor({ data, onChange }: PersonalInfoEditorProps) {
  const [formData, setFormData] = useState(data);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingContactIcon, setIsUploadingContactIcon] = useState<number | null>(null);

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const newContacts = [...formData.contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    
    const newData = { ...formData, contacts: newContacts };
    setFormData(newData);
    onChange(newData);
  };

  const addContact = () => {
    const newContact: Contact = {
      type: 'email',
      value: '',
      label: '',
    };
    
    const newData = { ...formData, contacts: [...formData.contacts, newContact] };
    setFormData(newData);
    onChange(newData);
  };

  const removeContact = (index: number) => {
    const newContacts = formData.contacts.filter((_, i) => i !== index);
    const newData = { ...formData, contacts: newContacts };
    setFormData(newData);
    onChange(newData);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        handleInputChange('photo', result.url);
      } else {
        alert('Ошибка загрузки файла: ' + result.error);
      }
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      alert('Ошибка загрузки файла');
    } finally {
      setIsUploading(false);
    }
  };

  const handleContactIconUpload = async (event: React.ChangeEvent<HTMLInputElement>, contactIndex: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 1MB для иконок контактов)
    if (file.size > 1 * 1024 * 1024) {
      alert('Размер файла не должен превышать 1MB');
      return;
    }

    setIsUploadingContactIcon(contactIndex);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        handleContactChange(contactIndex, 'icon', result.url);
      } else {
        alert('Ошибка загрузки иконки: ' + result.error);
      }
    } catch (error) {
      console.error('Ошибка загрузки иконки:', error);
      alert('Ошибка загрузки иконки');
    } finally {
      setIsUploadingContactIcon(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Личная информация</h2>
      
      <div className="space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="input-field"
              placeholder="Введите ваше имя"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Должность
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="input-field"
              placeholder="Введите должность"
            />
          </div>
        </div>

        {/* Загрузка фотографии */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фото
          </label>
          
          <div className="flex items-center space-x-4">
            {/* Предварительный просмотр */}
            {formData.photo && (
              <div className="relative">
                <img
                  src={formData.photo}
                  alt="Фото профиля"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <button
                  onClick={() => handleInputChange('photo', '')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
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
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="photo-upload"
                className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                    Загрузка...
                  </>
                ) : (
                  'Загрузить фото'
                )}
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Поддерживаются форматы: JPG, PNG, GIF. Максимальный размер: 5MB
              </p>
            </div>
          </div>
          
          {/* URL фотографии (для ручного ввода) */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL фотографии (опционально)
            </label>
            <input
              type="url"
              value={formData.photo}
              onChange={(e) => handleInputChange('photo', e.target.value)}
              className="input-field"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            О себе
          </label>
          <textarea
            value={formData.about}
            onChange={(e) => handleInputChange('about', e.target.value)}
            className="input-field"
            rows={4}
            placeholder="Расскажите о себе..."
          />
        </div>

        {/* Контакты */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Контакты</h3>
            <button
              onClick={addContact}
              className="btn-primary text-sm"
            >
              Добавить контакт
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.contacts.map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Контакт {index + 1}</h4>
                  <button
                    onClick={() => removeContact(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Удалить
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Тип
                      </label>
                      <select
                        value={contact.type}
                        onChange={(e) => handleContactChange(index, 'type', e.target.value as Contact['type'])}
                        className="input-field"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Телефон</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="github">GitHub</option>
                        <option value="telegram">Telegram</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Значение
                      </label>
                      <input
                        type="text"
                        value={contact.value}
                        onChange={(e) => handleContactChange(index, 'value', e.target.value)}
                        className="input-field"
                        placeholder="Введите значение"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Отображаемое название
                      </label>
                      <input
                        type="text"
                        value={contact.label}
                        onChange={(e) => handleContactChange(index, 'label', e.target.value)}
                        className="input-field"
                        placeholder="Введите название"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Загрузка иконки контакта */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Иконка
                      </label>
                      
                      <div className="flex items-center space-x-4">
                        {/* Предварительный просмотр */}
                        {contact.icon && (
                          <div className="relative">
                            <img
                              src={contact.icon}
                              alt="Иконка контакта"
                              className="w-10 h-10 object-cover rounded border border-gray-200"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <button
                              onClick={() => handleContactChange(index, 'icon', '')}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
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
                            onChange={(e) => handleContactIconUpload(e, index)}
                            className="hidden"
                            id={`contact-icon-upload-${index}`}
                            disabled={isUploadingContactIcon === index}
                          />
                          <label
                            htmlFor={`contact-icon-upload-${index}`}
                            className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer ${
                              isUploadingContactIcon === index ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {isUploadingContactIcon === index ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                                Загрузка...
                              </>
                            ) : (
                              'Загрузить иконку'
                            )}
                          </label>
                          <p className="text-xs text-gray-500 mt-1">
                            Максимальный размер: 1MB
                          </p>
                        </div>
                      </div>
                      
                      {/* URL иконки (для ручного ввода) */}
                      <div className="mt-2">
                        <input
                          type="url"
                          value={contact.icon || ''}
                          onChange={(e) => handleContactChange(index, 'icon', e.target.value)}
                          className="input-field text-sm"
                          placeholder="URL иконки или эмодзи"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 