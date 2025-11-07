import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full glass-effect hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
