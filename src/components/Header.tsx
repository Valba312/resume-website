'use client';

import { Contact } from '@/types';
import Image from 'next/image';

interface HeaderProps {
  name: string;
  title: string;
  photo: string;
  about: string;
  contacts: Contact[];
}

export default function Header({ name, title, photo, about, contacts }: HeaderProps) {
  const getContactIcon = (type: Contact['type']) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'phone':
        return '📞';
      case 'linkedin':
        return '💼';
      case 'github':
        return '🐙';
      case 'telegram':
        return '📱';
      default:
        return '🔗';
    }
  };

  const getContactUrl = (contact: Contact) => {
    switch (contact.type) {
      case 'email':
        return `mailto:${contact.value}`;
      case 'phone':
        return `tel:${contact.value}`;
      case 'linkedin':
        return `https://${contact.value}`;
      case 'github':
        return `https://${contact.value}`;
      case 'telegram':
        return `https://t.me/${contact.value.replace('@', '')}`;
      default:
        return contact.value;
    }
  };

  return (
    <header className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Фото */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <Image
              src={photo}
              alt={name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback для ошибки загрузки изображения
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.textContent = name.charAt(0).toUpperCase();
              }}
            />
            <div className="w-full h-full bg-primary-500 text-white text-4xl font-bold flex items-center justify-center hidden">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Информация */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
          <h2 className="text-xl text-primary-600 font-semibold mb-4">{title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{about}</p>

          {/* Контакты */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={getContactUrl(contact)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <span className="text-lg">{getContactIcon(contact.type)}</span>
                <span className="text-sm font-medium">{contact.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 