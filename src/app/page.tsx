import { loadResumeDataServer } from '@/lib/server-data';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Facts from '@/components/Facts';
import SectionDivider from '@/components/SectionDivider';

export default async function HomePage() {
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

      {/* Секция навыков с белым фоном */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skills skills={resumeData.skills} />
        </div>
      </div>

      {/* Разделитель */}
      <SectionDivider />

      {/* Секция опыта работы с градиентным фоном */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Experience experience={resumeData.experience} />
        </div>
      </div>

      {/* Разделитель */}
      <SectionDivider />

      {/* Секция проектов с белым фоном */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Projects projects={resumeData.projects} />
        </div>
      </div>

      {/* Разделитель */}
      <SectionDivider />

      {/* Секция фактов с градиентным фоном */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Facts facts={resumeData.facts} />
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