import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Исправленный путь к файлу данных
const servicesFilePath = path.join(__dirname, '../../../../data/services.json');

// Функция для загрузки услуг из файла
async function loadServices() {
  try {
    const data = await fs.readFile(servicesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// DELETE - удаление услуги по ID (отключено для Vercel)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(
    { error: 'Изменение данных отключено на этом хостинге. Используйте локальную среду для редактирования.' },
    { status: 403 }
  );
} 