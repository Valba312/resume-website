import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware called for:', request.nextUrl.pathname);
  
  // Защищаем только админ-роуты, кроме /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Проверяем наличие JWT токена в cookies
    const token = request.cookies.get('admin_token')?.value;
    
    console.log('Token present:', !!token);
    
    if (!token) {
      console.log('Redirecting to login');
      // Если нет токена, перенаправляем на страницу входа
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    console.log('Token found, allowing access');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 