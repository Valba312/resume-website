'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Резюме' },
    { href: '/services', label: 'Услуги' }
  ];

  return (
    <nav className="bg-white shadow-lg rounded-xl p-2 mb-6">
      <div className="flex justify-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              pathname === item.href
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
} 