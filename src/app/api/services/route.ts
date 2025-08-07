import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const servicesFilePath = path.join(__dirname, '../../../../data/services.json');

// Функция для загрузки услуг из файла
async function loadServices() {
  try {
    const data = await fs.readFile(servicesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Если файл не существует, возвращаем пустой массив
    return [];
  }
}

// Функция для сохранения услуг в файл
async function saveServices(services: any[]) {
  await fs.writeFile(servicesFilePath, JSON.stringify(services, null, 2));
}

// GET - получение всех услуг
export async function GET() {
  try {
    const services = await loadServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Ошибка загрузки услуг:', error);
    return NextResponse.json({ error: 'Ошибка загрузки услуг' }, { status: 500 });
  }
}

// POST - добавление услуги (отключено для Vercel)
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Изменение данных отключено на этом хостинге. Используйте локальную среду для редактирования.' },
    { status: 403 }
  );
} 