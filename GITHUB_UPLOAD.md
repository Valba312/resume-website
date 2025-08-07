# 🚀 Инструкция по загрузке на GitHub

## ✅ Проект оптимизирован для GitHub

Проект был оптимизирован и теперь содержит только **73 файла** вместо тысяч.

### 🗑️ Что было удалено:
- `node_modules/` - зависимости (будут установлены автоматически)
- `.next/` - сборка Next.js (генерируется автоматически)
- `package-lock.json` - будет пересоздан при `npm install`
- Загруженные изображения в `public/uploads/`

### 📁 Что осталось (важные файлы):
- `src/` - весь исходный код
- `package.json` - зависимости проекта
- Конфигурационные файлы
- `.gitignore` - правильно настроен

## 🚀 Шаги для загрузки на GitHub:

### 1. Инициализируйте Git (если еще не сделано)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Создайте репозиторий на GitHub
- Зайдите на github.com
- Нажмите "New repository"
- Назовите репозиторий (например: `resume-website`)
- НЕ добавляйте README, .gitignore или лицензию

### 3. Загрузите код
```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

### 4. После загрузки установите зависимости
```bash
npm install
```

### 5. Создайте .env.local
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$rQZ8K9mN2pL1vX3yB4cD5eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aA7bB8cC9dD0eE1fF2gG3hH4iI5jJ6kK7lL8mM9nN0oO1pP2qQ3rR4sS5tT6uU7vV8wW9xX0yY1zZ
JWT_SECRET=your-secret-key-change-in-production
```

### 6. Запустите проект
```bash
npm run dev
```

## ✅ Готово!
Теперь ваш проект успешно загружен на GitHub и готов к работе!
