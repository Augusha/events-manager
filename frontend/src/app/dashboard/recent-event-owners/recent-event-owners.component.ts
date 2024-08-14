import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginator} from "@angular/material/paginator";
import {UsersDataService} from "../../users/users-data.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-recent-event-owners',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatHeaderRowDef,
        TranslateModule,
        MatPaginator,
        MatSort,
        MatSortHeader,
        NgForOf,
        NgIf
    ],
  templateUrl: './recent-event-owners.component.html',
  styleUrls: ['./recent-event-owners.component.css', "../total-cards/total-cards.component.scss"]
})

export class RecentEventOwnersComponent implements AfterViewInit  {

  constructor( private usersDataService: UsersDataService ) {
  }
  displayedColumns: string[] = ['name', 'orderDate', 'phone', 'location', 'registered'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.usersDataService.dataOwnersSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get dataSource() {
    return this.usersDataService.dataOwnersSource;
  }
}
