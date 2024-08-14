import {Component, OnInit} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ThemeToggleService} from "./theme-toggle.service";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageService} from "./language.service";
import {HeaderService} from "../header/header.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatCheckbox,
    MatSlideToggle,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(
    public themeToggleService: ThemeToggleService,
    public languageService: LanguageService,
    private headerService: HeaderService
  ) {
    this.headerService.setHeaderTitle('settings')
  }
}
