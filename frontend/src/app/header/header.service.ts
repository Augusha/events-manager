import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  currentPage = 'loading';

  setHeaderTitle(route: string) {
    this.currentPage = route;
  }

  getHeaderTitle() {
    return this.currentPage + '.title';
  }
}
