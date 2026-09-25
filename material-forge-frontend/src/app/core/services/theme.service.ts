import { Injectable, signal, effect, inject, DOCUMENT } from '@angular/core';
import { ThemeMode, ThemeConfig } from '../models/theme.model';
import { THEME_KEY } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly themeMode = signal<ThemeMode>(this.loadSavedTheme());
  readonly isDark = signal<boolean>(this.loadSavedTheme() === 'dark');

  constructor() {
    effect(() => {
      this.applyTheme(this.themeMode());
    });
  }

  toggleTheme(): void {
    const next: ThemeMode = this.themeMode() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(mode: ThemeMode): void {
    this.themeMode.set(mode);
    this.isDark.set(mode === 'dark');
    localStorage.setItem(THEME_KEY, mode);
  }

  private applyTheme(mode: ThemeMode): void {
    const body = this.document.body;
    if (mode === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  private loadSavedTheme(): ThemeMode {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    return saved === 'dark' ? 'dark' : 'light';
  }
}
