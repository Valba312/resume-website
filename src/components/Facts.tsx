import { Fact } from '@/types';

interface FactsProps {
  facts: Fact[];
}

export default function Facts({ facts }: FactsProps) {
  const getCategoryName = (category: Fact['category']) => {
    switch (category) {
      case 'achievement':
        return 'Достижения';
      case 'skill':
        return 'Навыки';
      case 'project':
        return 'Проекты';
      case 'education':
        return 'Образование';
      case 'certificate':
        return 'Сертификаты';
      default:
        return category;
    }
  };

  // Группируем факты по категориям
  const factsByCategory = facts.reduce((acc, fact) => {
    if (!acc[fact.category]) {
      acc[fact.category] = [];
    }
    acc[fact.category].push(fact);
    return acc;
  }, {} as Record<string, Fact[]>);

  return (
    <section className="card mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Факты и достижения</h2>
      
      <div className="space-y-6">
        {Object.entries(factsByCategory).map(([category, categoryFacts]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {getCategoryName(category as Fact['category'])}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryFacts.map((fact) => (
                <div key={fact.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-start gap-3">
                    {fact.icon && (
                      <span className="text-2xl flex-shrink-0">{fact.icon}</span>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{fact.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{fact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 