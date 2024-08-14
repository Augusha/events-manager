import {computed, Injectable, signal} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor( public router: Router ) {
    this.updateMinWidth(window.innerWidth);
    this.updateMinMenuBtnWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      this.updateMinWidth(window.innerWidth);
      this.updateMinMenuBtnWidth(window.innerWidth);
    });
  }

  private _minWidth = "90px";
  private _maxWidth = "250px";

  private _minMenuBtnWidth = "90px";

  get minWidth(): string {
    return this._minWidth;
  }

  get maxWidth(): string {
    return this._maxWidth;
  }

  get minMenuBtnWidth(): string {
    return this._minMenuBtnWidth;
  }

  private updateMinWidth(windowWidth: number): void {
    this._minWidth = windowWidth < 800 ? "0" : "90px";
  }

  private updateMinMenuBtnWidth(windowWidth: number): void {
    this._minMenuBtnWidth = windowWidth < 450 ? "70px" : "90px";
  }

  private _collapsed = false;

  get collapsed(): boolean {
    return this._collapsed;
  }

  set collapsed(value: boolean) {
    this._collapsed = value;
  }

  sidenavWidth(): string {
    return this._collapsed ? this.maxWidth : this.minWidth;
  }

  menuButtonWidth(): string {
    return this._collapsed ? this.maxWidth : this.minMenuBtnWidth;
  }

  sidenavColor(): string {
    return this._collapsed ? 'var(--menu-open-color)' : 'var(--menu-closed-color)';
  }

  sidenavShadowSize(): string {
    return this._collapsed ? '100%' : '0';
  }

  sidenavShadowColor(): string {
    return this._collapsed ? 'rgba(37, 37, 37, 0.63)' : 'transparent';
  }

  sidenavTextColor(): string {
    return this._collapsed ? 'var(--primary-font-color)' : '#ffffff';
  }
}
