import { loadResumeDataServer } from '@/lib/server-data';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Services from '@/components/Services';

export default async function ServicesPage() {
  // Загружаем данные резюме на серверной стороне
  const resumeData = await loadResumeDataServer();

  return (
    <div className="min-h-screen">
      {/* Градиентный фон для навигации и заголовка */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Навигация */}
          <Navigation />
          
          {/* Заголовок с информацией о человеке */}
          <Header
            name={resumeData.personal.name}
            title={resumeData.personal.title}
            photo={resumeData.personal.photo}
            about={resumeData.personal.about}
            contacts={resumeData.personal.contacts}
          />
        </div>
      </div>

      {/* Секция услуг с белым фоном */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Services />
        </div>
      </div>

      {/* Футер */}
      <footer className="bg-gray-900 text-white text-center py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <p>© 2024 {resumeData.personal.name}. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
} 