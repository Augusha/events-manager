import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {AddUserModalComponent} from "./add-user-modal/add-user-modal.component";
import {UsersDataService} from "../users-data.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {EditUserModalComponent} from "./edit-user-modal/edit-user-modal.component";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCellDef,
    MatCell,
    NgIf,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatPaginator,
    TranslateModule,
    NgForOf
  ],
  templateUrl: './all-users.component.html',
  styleUrls: ['../../dashboard/total-cards/total-cards.component.scss', './all-users.component.css']
})
export class AllUsersComponent implements AfterViewInit {

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'position', 'role'];

  dataSource = this.usersDataService.usersSource;

  constructor(
    private dialog: MatDialog,
    private usersDataService: UsersDataService,
    private authService: AuthService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isUserAdmin(): boolean {
    return this.authService.isAdminRole();
  }

  openAddDialog(): void {
    if (this.isUserAdmin()) {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '800px',
      panelClass: 'bg-blue'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchUsers();
    });
    } else {
      this.authService.snackbarMessage('You do not have permission to edit users');
    }

  }

  openEditDialog(data: any): void {
    if (this.isUserAdmin()) {
      const dialogRef = this.dialog.open(EditUserModalComponent, {
        width: '800px',
        panelClass: 'bg-blue',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        this.fetchUsers();
      });
    } else {
      this.authService.snackbarMessage('You do not have permission to edit users');
    }
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0; // Reset pagination to the first page
      this.fetchUsers();
    });

    this.paginator.page.subscribe(() => {
      this.fetchUsers();
    });

    this.fetchUsers();
  }

  fetchUsers() {
    this.usersDataService.getUsers(this.paginator.pageIndex + 1, this.paginator.pageSize, this.sort.active, this.sort.direction)
      .subscribe({
        next: (response: any) => {
          this.dataSource.data = response.items;
          this.paginator.length = response.meta.totalItems;
          this.paginator.pageIndex = response.meta.currentPage - 1;
          this.paginator.pageSize = response.meta.itemsPerPage;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
