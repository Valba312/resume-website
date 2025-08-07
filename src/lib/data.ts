import { ResumeData } from '@/types';

// Функция для загрузки данных резюме через API
export async function loadResumeData(): Promise<ResumeData> {
  try {
    const response = await fetch('/api/resume', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to load resume data');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки данных резюме:', error);
    // Возвращаем пустые данные по умолчанию
    return {
      personal: {
        name: '',
        title: '',
        photo: '',
        about: '',
        contacts: []
      },
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certificates: [],
      facts: []
    };
  }
}

// Функция для сохранения данных резюме через API
export async function saveResumeData(data: ResumeData): Promise<void> {
  try {
    const response = await fetch('/api/resume', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save resume data');
    }
  } catch (error) {
    console.error('Ошибка сохранения данных резюме:', error);
    throw error;
  }
}

// Функция для генерации уникального ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Функция для форматирования даты
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long'
  });
}

// Функция для получения диапазона дат
export function getDateRange(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  if (!endDate) {
    return `${start} - настоящее время`;
  }
  const end = formatDate(endDate);
  return `${start} - ${end}`;
} 