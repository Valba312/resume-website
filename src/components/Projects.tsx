import { Project } from '@/types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="card mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Проекты</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <div className="flex gap-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Демо
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
            
            {/* Технологии */}
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white text-gray-600 text-xs rounded border"
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