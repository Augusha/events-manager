import {inject, Injectable, OnInit} from '@angular/core';
import {TranslateService, TranslateModule} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  defaultLang = localStorage.getItem('language') || 'ua';
  isUkrainian = this.defaultLang === 'ua';

  constructor( private translateService: TranslateService) { }

  autoLanguage() {
    this.translateService.setDefaultLang(this.defaultLang);
    this.translateService.use(this.defaultLang);
  }

  changeLanguage() {
    this.defaultLang = this.isUkrainian ? 'ua' : 'en';
    this.translateService.use(this.defaultLang);
    localStorage.setItem('language', this.defaultLang);
  }
}
