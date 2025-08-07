'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  category: string;
  icon: string;
}

const categories = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'support', name: 'Поддержка' },
  { id: 'consulting', name: 'Консультации' }
];

export default function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Загружаем услуги при монтировании компонента
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
    }
  };

  const saveService = async (service: Service) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        await loadServices();
        setIsModalOpen(false);
        setEditingService(null);
      } else {
        alert('Ошибка сохранения услуги');
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения услуги');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту услугу?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadServices();
      } else {
        alert('Ошибка удаления услуги');
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка удаления услуги');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    saveService(editingService);
  };

  const addNewService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: '',
      description: '',
      price: '',
      duration: '',
      features: [''],
      category: 'frontend',
      icon: ''
    };
    setEditingService(newService);
    setIsModalOpen(true);
  };

  const editService = (service: Service) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingService) return;
    const newFeatures = [...editingService.features];
    newFeatures[index] = value;
    setEditingService({ ...editingService, features: newFeatures });
  };

  const addFeature = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: [...editingService.features, '']
    });
  };

  const removeFeature = (index: number) => {
    if (!editingService || editingService.features.length <= 1) return;
    const newFeatures = editingService.features.filter((_, i) => i !== index);
    setEditingService({ ...editingService, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Управление услугами</h2>
        <button
          onClick={addNewService}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Добавить услугу
        </button>
      </div>

      {/* Список услуг */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-4 border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">{service.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => editService(service)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{service.description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-blue-600 font-medium">{service.price}</span>
              <span className="text-gray-500">{service.duration}</span>
            </div>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {categories.find(c => c.id === service.category)?.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно редактирования */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingService.id ? 'Редактировать услугу' : 'Добавить услугу'}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Название услуги */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название услуги
                  </label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Описание */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание
                  </label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>

                {/* Цена и срок */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Цена
                    </label>
                    <input
                      type="text"
                      value={editingService.price}
                      onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="от 50,000 ₽"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Срок выполнения
                    </label>
                    <input
                      type="text"
                      value={editingService.duration}
                      onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="2-4 недели"
                      required
                    />
                  </div>
                </div>

                {/* Категория */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Категория
                  </label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Что включено */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Что включено в услугу
                  </label>
                  <div className="space-y-2">
                    {editingService.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Описание включенной функции"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                          disabled={editingService.features.length <= 1}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Добавить функцию
                    </button>
                  </div>
                </div>

                {/* Кнопки */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Сохранение...' : 'Сохранить'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingService(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 