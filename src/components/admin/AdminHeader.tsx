interface AdminHeaderProps {
  onSave: () => void;
  onLogout: () => void;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
}

export default function AdminHeader({ onSave, onLogout, saveStatus }: AdminHeaderProps) {
  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Сохранение...';
      case 'success':
        return 'Сохранено!';
      case 'error':
        return 'Ошибка!';
      default:
        return 'Сохранить';
    }
  };

  const getSaveButtonClass = () => {
    switch (saveStatus) {
      case 'saving':
        return 'btn-primary opacity-75 cursor-not-allowed';
      case 'success':
        return 'btn-primary bg-green-600 hover:bg-green-700';
      case 'error':
        return 'btn-primary bg-red-600 hover:bg-red-700';
      default:
        return 'btn-primary';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
            <span className="text-sm text-gray-500">Управление резюме</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onSave}
              disabled={saveStatus === 'saving'}
              className={getSaveButtonClass()}
            >
              {getSaveButtonText()}
            </button>
            
            <button
              onClick={onLogout}
              className="btn-secondary"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 