import {Injectable, OnInit, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService implements OnInit {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  isDarkTheme = localStorage.getItem('dark-theme') === 'true';
  isAdaptiveTheme = localStorage.getItem('adaptive-theme') === 'true';

  ngOnInit() {
    this.autoThemeSet();
  }

  autoThemeSet() {
    if (this.isDarkTheme) {
      this.setDarkTheme();
    } else {
      if (this.isAdaptiveTheme) {
        const date = new Date();
        const hours = date.getHours();
        if (hours >= 6 && hours <= 18) {
          this.setLightTheme();
        } else {
          this.setDarkTheme();
        }
      } else {
        this.setLightTheme();
      }
    }
  }

  onThemeToggleChange() {
    if (!this.isAdaptiveTheme) {
      localStorage.setItem('dark-theme', this.isDarkTheme.toString());
      localStorage.setItem('adaptive-theme', this.isAdaptiveTheme.toString());
      if (this.isDarkTheme) {
        this.setDarkTheme();
      } else {
        this.setLightTheme();
      }
    }
  }

  onAdaptiveToggleChange() {
    this.isDarkTheme = false;
    localStorage.setItem('adaptive-theme', this.isAdaptiveTheme.toString());
    localStorage.setItem('dark-theme', this.isDarkTheme.toString());
    this.autoThemeSet();
  }

  private setDarkTheme() {
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    document.body.setAttribute('data-theme', 'dark');
  }

  private setLightTheme() {
    this.renderer.addClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    document.body.setAttribute('data-theme', 'light');
  }
}
