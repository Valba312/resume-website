import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Простые учетные данные
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Login attempt:', body);
    
    // Простая проверка логина и пароля
    if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
      console.log('Login successful');
      
      // Создаем JWT токен
      const token = jwt.sign(
        { username: body.username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Создаем ответ с установкой cookie
      const response = NextResponse.json({
        success: true,
        message: 'Успешная авторизация',
        user: { username: body.username, role: 'admin' }
      });
      
      // Устанавливаем cookie с токеном
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: false, // для локальной разработки
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 часа
      });
      
      return response;
    } else {
      console.log('Login failed - invalid credentials');
      return NextResponse.json(
        { success: false, error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 