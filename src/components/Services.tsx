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

const services: Service[] = [
  {
    id: '1',
    title: 'Разработка веб-сайтов',
    description: 'Создание современных, адаптивных веб-сайтов с использованием React, Next.js и TypeScript',
    price: 'от 50,000 ₽',
    duration: '2-4 недели',
    features: [
      'Адаптивный дизайн',
      'SEO-оптимизация',
      'Интеграция с CMS',
      'Форма обратной связи',
      'Аналитика и метрики'
    ],
    category: 'frontend',
    icon: ''
  },
  {
    id: '2',
    title: 'Backend разработка',
    description: 'Разработка серверной части приложений на Node.js, Express и PostgreSQL',
    price: 'от 80,000 ₽',
    duration: '3-6 недель',
    features: [
      'REST API',
      'База данных',
      'Аутентификация',
      'Платежная интеграция',
      'Документация API'
    ],
    category: 'backend',
    icon: ''
  },
  {
    id: '3',
    title: 'Full Stack приложения',
    description: 'Полноценные веб-приложения с frontend и backend разработкой',
    price: 'от 150,000 ₽',
    duration: '4-8 недель',
    features: [
      'Полный цикл разработки',
      'Деплой на сервер',
      'SSL сертификат',
      'Резервное копирование',
      'Техническая поддержка'
    ],
    category: 'fullstack',
    icon: ''
  },
  {
    id: '4',
    title: 'E-commerce решения',
    description: 'Интернет-магазины и платформы электронной коммерции',
    price: 'от 200,000 ₽',
    duration: '6-10 недель',
    features: [
      'Каталог товаров',
      'Корзина и оплата',
      'Личный кабинет',
      'Система отзывов',
      'Интеграция с 1С'
    ],
    category: 'ecommerce',
    icon: ''
  },
  {
    id: '5',
    title: 'Техническая поддержка',
    description: 'Обслуживание и поддержка существующих веб-проектов',
    price: 'от 15,000 ₽/мес',
    duration: 'Постоянно',
    features: [
      'Мониторинг сайта',
      'Обновления безопасности',
      'Исправление ошибок',
      'Консультации',
      'Резервное копирование'
    ],
    category: 'support',
    icon: ''
  },
  {
    id: '6',
    title: 'Консультации',
    description: 'Технические консультации по разработке и архитектуре проектов',
    price: 'от 3,000 ₽/час',
    duration: 'По договоренности',
    features: [
      'Анализ требований',
      'Выбор технологий',
      'Архитектурные решения',
      'Code review',
      'Менторинг'
    ],
    category: 'consulting',
    icon: ''
  }
];

const categories = [
  { id: 'all', name: 'Все услуги' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'support', name: 'Поддержка' },
  { id: 'consulting', name: 'Консультации' }
];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <section className="py-12">
      {/* Заголовок секции */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Мои услуги
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Предлагаю полный спектр услуг по разработке веб-приложений и технической поддержке
        </p>
      </div>

             {/* Фильтр по категориям */}
       <div className="flex flex-wrap justify-center gap-3 mb-8">
         {categories.map((category) => (
           <button
             key={category.id}
             onClick={() => setSelectedCategory(category.id)}
             className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
               selectedCategory === category.id
                 ? 'bg-blue-600 text-white shadow-md'
                 : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
             }`}
           >
             {category.name}
           </button>
         ))}
       </div>

             {/* Список услуг */}
       {isLoading ? (
         <div className="text-center py-12">
           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
           <p className="mt-4 text-gray-600">Загрузка услуг...</p>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredServices.map((service) => (
                     <div
             key={service.id}
             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer h-full flex flex-col"
             onClick={() => setSelectedService(service)}
           >
                         {/* Заголовок услуги */}
             <div className="p-6 border-b border-gray-100">
               <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                 {service.title}
               </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 {service.description}
               </p>
             </div>

                                      {/* Цена и длительность */}
             <div className="p-6 bg-gray-50 mt-auto">
               <div className="flex justify-between items-start mb-4">
                 <div className="flex-1">
                   <p className="text-2xl font-bold text-blue-600">{service.price}</p>
                   <p className="text-sm text-gray-500">Срок: {service.duration}</p>
                 </div>
                 <div className="text-right ml-4">
                   <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                     {categories.find(c => c.id === service.category)?.name}
                   </span>
                 </div>
               </div>

               {/* Кнопка подробнее */}
               <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                 Подробнее
               </button>
             </div>
           </div>
         ))}
       </div>
       )}

      {/* Модальное окно с подробностями */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
                             {/* Заголовок модального окна */}
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <h3 className="text-2xl font-bold text-gray-900">{selectedService.title}</h3>
                   <p className="text-gray-600">{selectedService.description}</p>
                 </div>
                 <button
                   onClick={() => setSelectedService(null)}
                   className="text-gray-400 hover:text-gray-600 text-2xl"
                 >
                   ×
                 </button>
               </div>

              {/* Информация об услуге */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Стоимость</h4>
                  <p className="text-2xl font-bold text-blue-600">{selectedService.price}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Срок выполнения</h4>
                  <p className="text-lg font-medium text-green-600">{selectedService.duration}</p>
                </div>
              </div>

              {/* Что включено */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Что включено в услугу:</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Кнопки действий */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Заказать услугу
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Дополнительная информация */}
      <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Почему выбирают меня?
          </h3>
          <p className="text-gray-600">
            Опыт, качество и индивидуальный подход к каждому проекту
          </p>
        </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="text-center">
             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
             </div>
             <h4 className="font-semibold text-gray-900 mb-2">Быстрая разработка</h4>
             <p className="text-gray-600 text-sm">
               Использую современные технологии для ускорения процесса разработки
             </p>
           </div>

           <div className="text-center">
             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
               <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <h4 className="font-semibold text-gray-900 mb-2">Надежность</h4>
             <p className="text-gray-600 text-sm">
               Качественный код и тщательное тестирование каждого проекта
             </p>
           </div>

           <div className="text-center">
             <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
               <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
             </div>
             <h4 className="font-semibold text-gray-900 mb-2">Поддержка</h4>
             <p className="text-gray-600 text-sm">
               Постоянная связь и поддержка на всех этапах разработки
             </p>
           </div>
         </div>
      </div>
    </section>
  );
} 