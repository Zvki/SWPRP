import {DOCUMENT, inject, Injectable} from '@angular/core';

const DARK_MODE_KEY = 'darkMode'

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private readonly document = inject(DOCUMENT);
  private isDarkMode: boolean = false;

  constructor() {
    this.isDarkMode = this.loadFromLocalStorage();
    this.applyTheme();
  }

  public setDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveToLocalStorage()
  }

  private applyTheme(): void {
    if(this.isDarkMode) {
      this.htmlBodyElement.classList.add('dark');
    } else {
      this.htmlBodyElement.classList.remove('dark');
    }
  }

  private get htmlBodyElement(): HTMLBodyElement {
    return this.document.getElementsByTagName('body')[0];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(this.isDarkMode));
  }

  private loadFromLocalStorage(): boolean {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored ? JSON.parse(stored) : false;
  }
}
