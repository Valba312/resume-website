import { ResumeData } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(__dirname, '../../data/resume.json');

// Функция для загрузки данных резюме на серверной стороне
export async function loadResumeDataServer(): Promise<ResumeData> {
  try {
    const data = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
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