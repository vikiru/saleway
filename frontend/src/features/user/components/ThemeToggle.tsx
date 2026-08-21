'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/features/user/hooks/useTheme';
import { Button } from '@/shared/ui/button';

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button aria-label="Toggle theme" className="relative" onClick={toggleTheme} size="icon" variant="ghost">
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
