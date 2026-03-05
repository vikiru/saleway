'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/lib/components/ui/button';
import { useTheme } from '@/lib/hooks/useTheme';

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button aria-label="Toggle theme" className="relative" onClick={toggleTheme} size="icon" variant="ghost">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
