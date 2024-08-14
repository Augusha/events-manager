import {Injectable} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {environment} from "../../environments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(
    private http: HttpClient
  ) {}

  dataOwnersSource = new MatTableDataSource([
    {
      name: 'Jerry Mattei',
      orderDate: '19 May, 2021',
      phone: '251-661-5362',
      location: 'New York',
      registered: 'tables.yes'
    },
    {
      name: 'Elianora Vasilov',
      orderDate: '18 May, 2021',
      phone: '171-534-1262',
      location: 'Ontario',
      registered: 'tables.no'
    },
    {name: 'Alvis Daen', orderDate: '17 May, 2021', phone: '974-661-5110', location: 'Milan', registered: 'tables.yes'},
    {
      name: 'Lissa Shipsey',
      orderDate: '23 Apr, 2021',
      phone: '541-661-3042',
      location: 'San Francisco',
      registered: 'tables.yes'
    },
    {name: 'John Doe', orderDate: '15 Jun, 2021', phone: '123-456-7890', location: 'Chicago', registered: 'tables.yes'},
    {
      name: 'Jane Smith',
      orderDate: '30 Jun, 2021',
      phone: '987-654-3210',
      location: 'Los Angeles',
      registered: 'tables.no'
    },
    {
      name: 'Michael Johnson',
      orderDate: '10 Jul, 2021',
      phone: '555-123-4567',
      location: 'Houston',
      registered: 'tables.yes'
    },
    {
      name: 'Emily Brown',
      orderDate: '5 Aug, 2021',
      phone: '222-333-4444',
      location: 'Seattle',
      registered: 'tables.yes'
    },
    {
      name: 'William Taylor',
      orderDate: '20 Aug, 2021',
      phone: '777-888-9999',
      location: 'Boston',
      registered: 'tables.no'
    },
    {
      name: 'Sophia Martinez',
      orderDate: '1 Sep, 2021',
      phone: '444-555-6666',
      location: 'Miami',
      registered: 'tables.yes'
    },
    {
      name: 'Matthew Anderson',
      orderDate: '12 Sep, 2021',
      phone: '666-777-8888',
      location: 'Denver',
      registered: 'tables.yes'
    },
    {
      name: 'Olivia Wilson',
      orderDate: '25 Sep, 2021',
      phone: '333-222-1111',
      location: 'Phoenix',
      registered: 'tables.no'
    },
    {
      name: 'Daniel Garcia',
      orderDate: '8 Oct, 2021',
      phone: '888-999-0000',
      location: 'Dallas',
      registered: 'tables.yes'
    },
    {
      name: 'Isabella Lopez',
      orderDate: '15 Oct, 2021',
      phone: '111-222-3333',
      location: 'Atlanta',
      registered: 'tables.no'
    },
    {
      name: 'Alexander Moore',
      orderDate: '28 Oct, 2021',
      phone: '555-666-7777',
      location: 'Detroit',
      registered: 'tables.yes'
    }
  ]);

  usersSource = new MatTableDataSource([]);

  getUsers(page: number = 1, limit: number = 5, sortField: string = '', sortOrder: string = '') {
    const url = `${environment.apiUrl}/users?page=${page}&?limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`;
    return this.http.get(url);
  }

  updateUser(user: any) {
    if (!user || !user.userId) {
      console.error('User data is incomplete or missing.');
      return;
    }

    this.http.post(`${environment.apiUrl}/users/update-user`, user)
      .subscribe({
        next: (res: any) => {
          console.log('Update successful');
        },
        error: (error) => {
          console.error('Update failed', error);
        }
      });
  }

  deleteUser(userId: any) {
    const id = { userId: userId };
    this.http.post(`${environment.apiUrl}/users/delete-user`, id)
      .subscribe({
        next: (res: any) => {
          console.log('Delete successful', res);
        },
        error: (error) => {
          console.error('Delete failed', error);
        }
      });
  }

  addUser(user: any) {
    this.http.post(`${environment.apiUrl}/users/create`, user)
      .subscribe({
        next: (res: any) => {
          console.log('User added successfully');
        },
        error: (error) => {
          console.error('User add failed', error);
        }
      });
  }

  getImageById(imageId: number) {
    return this.http.get(`${environment.apiUrl}/images/get?id=${imageId}`, { responseType: 'text' });
  }
}
