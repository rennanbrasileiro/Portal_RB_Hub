import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { Toast } from '@/react-app/hooks/useToast';
import { useTheme } from '@/react-app/contexts/ThemeContext';

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  const { isDark } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastNotification
          key={toast.id}
          toast={toast}
          onClose={onClose}
          isDark={isDark}
        />
      ))}
    </div>
  );
}

interface ToastNotificationProps {
  toast: Toast;
  onClose: (id: string) => void;
  isDark: boolean;
}

function ToastNotification({ toast, onClose, isDark }: ToastNotificationProps) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return isDark
          ? 'bg-green-500/20 border-green-500/30 text-green-400'
          : 'bg-green-50 border-green-200 text-green-700';
      case 'error':
        return isDark
          ? 'bg-red-500/20 border-red-500/30 text-red-400'
          : 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return isDark
          ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
          : 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'info':
        return isDark
          ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
          : 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-4 rounded-xl border-2 shadow-lg backdrop-blur-sm animate-slide-up min-w-80 ${
        getColors()
      }`}
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <p className="flex-1 font-medium text-sm">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
