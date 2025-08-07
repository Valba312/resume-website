import { Experience as ExperienceType } from '@/types';
import { getDateRange } from '@/lib/data';

interface ExperienceProps {
  experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Опыт работы</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Профессиональный опыт и достижения в различных компаниях
        </p>
      </div>
      
      <div className="space-y-8">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{exp.position}</h3>
                <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
              </div>
              <div className="text-sm text-gray-600 mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full">
                {getDateRange(exp.startDate, exp.endDate)}
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
            
            {/* Технологии */}
            {exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 