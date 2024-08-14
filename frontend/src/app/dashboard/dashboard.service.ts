import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DashboardService {
  constructor(private http: HttpClient) {}

  getCards() {
    return this.http.get('http://localhost:3000/total-cards/get');
  }

  getEventsStatistics() {
    return this.http.get('http://localhost:3000/active-events/get');
  }
}
