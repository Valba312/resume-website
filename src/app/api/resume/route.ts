import { NextRequest, NextResponse } from 'next/server';
import { ResumeData } from '@/types';
import fs from 'fs';
import path from 'path';

// Исправленный путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, '../../../../data/resume.json');

// Функция для загрузки данных из файла
async function loadDataFromFile(): Promise<ResumeData> {
  try {
    const data = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка загрузки данных из файла:', error);
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

// Функция для сохранения данных в файл
async function saveDataToFile(data: ResumeData): Promise<void> {
  try {
    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Ошибка сохранения данных в файл:', error);
    throw error;
  }
}

// GET - получение данных резюме
export async function GET() {
  try {
    const data = await loadDataFromFile();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка GET /api/resume:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// PUT - обновление данных резюме (отключено для Vercel)
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { error: 'Изменение данных отключено на этом хостинге. Используйте локальную среду для редактирования.' },
    { status: 403 }
  );
} 